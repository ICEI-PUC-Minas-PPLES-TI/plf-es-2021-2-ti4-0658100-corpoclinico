<template>
  <!--Container-->
  <v-container fluid style="overflow: auto; padding: 6vh">
    <v-card class="mx-auto" width="100%">
      <v-card-title>
        <span class="text-h6">Médicos</span>
      </v-card-title>

      <v-card-text class="text-h5">
        <v-row>
          <v-col :md="6" :sm="12" :xl="6" cols="12">
            <v-text-field v-model="pesquisa.nome" label="Nome" />
          </v-col>
          <v-col :md="6" :sm="12" :xl="6" cols="12">
            <v-select
              v-model="pesquisa.status"
              label="Status"
              :items="status"
              item-text="text"
              item-value="value"
              clearable
            />
          </v-col>
        </v-row>

        <v-row class="mb-2">
          <v-col :md="12" :sm="12" :xl="12" cols="12">
            <div class="text-center">
              <v-btn color="primary" background="primary" @click="listaMedicos">
                Pesquisar
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-tabs v-model="tabValue" @change="listaMedicos">
              <v-tab>Todos os Médicos</v-tab>
              <v-tab>Minhas Avaliações</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        <template>
          <v-data-table
            :headers="headers"
            :items="medicos"
            :items-per-page="-1"
            :loading="tabelaCarregando"
            :disable-sort="true"
            :footer-props="{
              'disable-items-per-page': true,
              'disable-pagination': true
            }"
            class="medico-table"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon color="success" class="mr-2" @click="fazNada(item.id)">
                {{ tabValue == '0'? 'mdi-eye-outline': 'mdi-star-outline'}}
                
              </v-icon>
            </template>
          </v-data-table>
          <v-pagination
            v-model="tabelaPaginaAtual"
            :length="tabelaPaginas"
            @input="listaMedicos"
          />
        </template>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="toast" shaped>
      {{ toastMensagem }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="toast = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Nome", value: "usuario.nome" },
        { text: "Email", value: "usuario.email" },
        { text: "Telefone", value: "celular" },
        { text: "Status", value: "status" },
        { text: "Data da candidatura", value: "data_criado" },
        { text: "Ação", value: "actions", sortable: false },
      ],
      medicos: [],

      pesquisa: {
        nome: "",
        status: "",
      },

      teste: "",

      status: [
        {
          text: "Aprovado",
          value: "A",
        },
        {
          text: "Pendente",
          value: "P",
        },
        {
          text: "Reprovado",
          value: "R",
        },
      ],

      equipeId: 0,
      toast: false,
      toastMensagem: "",
      modalAtivo: false,
      modalEspecialidadeAtivo: false,
      tabelaPaginaAtual: 1,
      tabelaPaginas: 1,
      totalItems: 1,
      tabelaCarregando: false,
      tabValue: 0
    };
  },
  mounted() {
    this.listaMedicos();
  },
  methods: {
    listaMedicos() {
      this.tabelaCarregando = true
      if(!this.pesquisa?.status){
        this.pesquisa.status = '';
      }

      let revisa = ''
      if(this.tabValue == 1)
        revisa = '&paraRevisar=true'

      let urlParams = new URLSearchParams(this.pesquisa).toString();
      this.$axios
        .$get(`/medico?pagina=${this.tabelaPaginaAtual}&` + urlParams+revisa)
        .then((response) => {
          if (response.dados) {
            response.dados.forEach((medico) => {
              medico.data_criado = this.formataData(medico.candidatura[0].data_criado) 
              medico.status = ""
              medico.candidatura.forEach((candidatura) => {
                const denied = candidatura.retornos.filter((f) => {
                  return f.status == 'R'
                })
                if(denied.length > 0)
                  medico.status += "Reprovado "
                else {
                  const pending = candidatura.retornos.filter((f) => {
                    return f.status == 'P'
                  })
                  if(pending.length > 0)
                    medico.status += "Pendente "
                  else
                    medico.status += "Aprovado "
                  
                }
              })
            });
          }
          this.medicos = response.dados;
          this.tabelaPaginas = response.paginas
          this.totalItems = response.total
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.tabelaCarregando = false
        });
    },

    fazNada(id) {
      window.location.href="/medico/avaliar?id="+id;
    },

    abreToast(mensagem) {
      this.toastMensagem = mensagem;
      this.toast = true;
    },
    formataData(data) {
      if (!data) return null;
      const [year, month, day] = data.split("-");
      return `${day}/${month}/${year}`;
    },

    formataStatus(status) {
      if (status == "A") {
        return "Aprovado";
      } else if (status == "R") {
        return "Reprovado";
      } else {
        return "Pendente";
      }
    }
  },
};
</script>

<style>
.div-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.candidatura-modal-input-date
  input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
.medico-table .v-data-footer{
  display: none;
}
</style>
