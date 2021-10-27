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
              v-model="teste"
              label="Status"
              :items="status"
              item-text="text"
              item-value="value"
              disabled
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col :md="6" :sm="12" :xl="12" cols="12">
            <v-menu
              v-model="menuDataCandidatura"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="pesquisa.dt_inicio"
                  hide-details="auto"
                  label="Data da candidatura inicio"
                  append-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker v-model="pesquisa.dt_inicio"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col :md="6" :sm="12" :xl="12" cols="12">
            <v-menu
              v-model="menuDataCandidaturaFim"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="pesquisa.dt_fim"
                  hide-details="auto"
                  label="Data da candidatura fim"
                  append-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker v-model="pesquisa.dt_fim"></v-date-picker>
            </v-menu>
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
        <template>
          <v-data-table :headers="headers" :items="medicos" :items-per-page="5">
            <template v-slot:item.actions="{ item }">
              <v-icon color="success" class="mr-2" @click="fazNada()">
                mdi-square-edit-outline
              </v-icon>
            </template>
          </v-data-table>
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
  layout: "cmedico",
  // components: {
  //   modalEquipe,
  //   modalEspecialidade,
  // },

  data() {
    return {
      headers: [
        { text: "Nome", value: "usuario.nome" },
        { text: "Email", value: "usuario.email" },
        { text: "Telefone", value: "celular" },
        { text: "Status", value: "retorno.status" },
        { text: "Data da candidatura", value: "candidatura.data_criado" },
        { text: "Ação", value: "actions", sortable: false },
      ],
      medicos: [
        {
          id: "",
          celular: "",

          candidatura: {
            id: "",
            data_criado: "",
          },

          usuario: {
            id: "",
            nome: "",
            email: "",
          },

          retorno: {
            id: "",
            status: "",
          },
        },
      ],

      pesquisa: {
        nome: "",
        //status: "",
        dt_inicio: "",
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
      menuDataCandidatura: false,
      toast: false,
      toastMensagem: "",
      modalAtivo: false,
      modalEspecialidadeAtivo: false,
    };
  },
  mounted() {
    this.listaMedicos();
  },
  methods: {
    listaMedicos() {
      //this.pesquisa.dt_fim = this.pesquisa.dt_inicio;
      let urlParams = new URLSearchParams(this.pesquisa).toString();
      //nome=Jose&dt_inicio=2021-10-20&dt_fim=2021-10-21
      this.$axios
        .$get("/medico?" + urlParams)
        .then((response) => {
          if (response.dados) {
            response.dados.forEach((medico) => {
              medico.candidatura.data_criado = this.formataData(
                medico.candidatura.data_criado
              );
              if (medico.retorno) {
                medico.retorno.status = this.formataStatus(
                  medico.retorno.status
                );
              } else {
                medico.retorno = { status: "Pendente" };
              }
            });
          }
          this.medicos = response.dados;
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    fazNada() {
      console.log("não to pronto ainda");
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
    },
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
</style>
