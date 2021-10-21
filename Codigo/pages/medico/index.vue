<template>
  <!--Container-->
  <v-container fluid style="overflow: auto; padding: 6vh">
    <v-card class="mx-auto" width="100%">
      <v-card-title>
        <span class="text-h6">Médicos</span>
      </v-card-title>

      <v-card-text class="text-h5">
        <v-row>
          <v-col :md="3" :sm="12" :xl="12" cols="12">
            <v-text-field v-model="pesquisa.nome" label="Nome" />
          </v-col>
          <v-col :md="3" :sm="12" :xl="12" cols="12">
            <v-select
              v-model="pesquisa.status"
              label="Status"
              :items="status"
              item-text="text"
              item-value="value"
            />
          </v-col>
          <v-col :md="3" :sm="12" :xl="12" cols="12">
            <v-text-field
              v-model="pesquisa.dataCandidatura"
              label="Data da candidatura"
            />
          </v-col>
          <v-col :md="3" :sm="12" :xl="12" cols="12">
            <v-btn color="primary" background="primary"> Pesquisar </v-btn>
          </v-col>
        </v-row>
        <template>
          <v-data-table :headers="headers" :items="medicos" :items-per-page="5">
            <template v-slot:item.actions="{ item }">
              <v-icon color="success" class="mr-2" disabled>
                mdi-square-edit-outline
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
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
        { text: "Data da candidatura", value: "dt_inscricao_crm" },
        { text: "Ação", value: "actions", sortable: false },
      ],
      medicos: [
        {
          id: "",
          celular: "31 97518234",
          dt_inscricao_crm: "06/06/6666",

          usuario: {
            id: "",
            nome: "Robsu",
            email: "teste@email.com",
          },

          retorno: {
            id: "",
            status: "Aprovado",
          },
        },
      ],

      pesquisa: {
        nome: "",
        status: "",
        dataCandidatura: "",
      },

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
    };
  },
  watch: {
    // modalAtivo: function (modalAtivo) {
    //   modalAtivo ? false : this.listaMedicos();
    // },
  },
  mounted() {
    this.listaMedicos();
  },
  methods: {
    listaMedicos() {
      // this.$axios
      //   .$get("/equipe")
      //   .then((response) => {
      //     this.equipes = response.dados;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },

    abreToast(mensagem) {
      this.toastMensagem = mensagem;
      this.toast = true;
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
</style>
