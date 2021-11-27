<template>
  <!--Container-->
  <v-container fluid style="overflow: auto; padding: 6vh">
    <v-card class="mx-auto" width="100%">
      <v-card-title>
        <span class="text-h6">Equipes</span>
      </v-card-title>

      <div class="div-btn">
        <v-card-actions>
          <v-btn
            color="success"
            background="primary"
            @click="modalEspecialidadeAtivo = !modalEspecialidadeAtivo"
          >
            Criar Especialidade
          </v-btn>
        </v-card-actions>

        <v-card-actions>
          <v-btn color="success" background="primary" @click="abreModal(0)">
            Criar Equipe
          </v-btn>
        </v-card-actions>
        <modalEspecialidade v-model="modalEspecialidadeAtivo">
        </modalEspecialidade>
        <modalEquipe v-model="modalAtivo" v-bind:equipeId="equipeId">
        </modalEquipe>
      </div>
      <v-card-text class="text-h5">
        <template>
          <v-data-table
            :headers="headers"
            :items="equipes"
            :items-per-page="-1"
            :loading="tabelaCarregando"
            :disable-sort="true"
            :footer-props="{
              'disable-items-per-page': true,
              'disable-pagination': true
            }"
            class="equipe-table"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon color="success" class="mr-2" @click="abreModal(item.id)">
                mdi-square-edit-outline
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
          <v-pagination
            v-model="tabelaPaginaAtual"
            :length="tabelaPaginas"
            @input="listaEquipes"
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
import modalEquipe from "@/components/equipe/modal.vue";
import modalEspecialidade from "@/components/especialidade/modal.vue";

export default {
  components: {
    modalEquipe,
    modalEspecialidade,
  },

  data() {
    return {
      headers: [
        { text: "Nome", value: "nome" },
        { text: "Especialidade", value: "Especialidade.identificacao" },
        { text: "Ação", value: "actions", sortable: false },
      ],
      equipes: [
        {
          id: "",
          nome: "",
          especialidade_id: "",
          Especialidade: {
            id: "",
            identificacao: "",
          },
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
    };
  },
  watch: {
    modalAtivo: function (modalAtivo) {
      modalAtivo ? false : this.listaEquipes();
    },
  },
  mounted() {
    this.listaEquipes();
  },
  methods: {
    listaEquipes() {
      this.$axios
        .$get(`/equipe?pagina=${this.tabelaPaginaAtual}`)
        .then((response) => {
          this.equipes = response.dados;
          this.tabelaPaginas = response.paginas
          this.totalItems = response.total
        })
        .catch((error) => {
          console.log(error);
        });
    },

    abreModal(id) {
      if (id) {
        this.modalAtivo = !this.modalAtivo;
        this.equipeId = id;
      } else {
        this.modalAtivo = !this.modalAtivo;
        this.equipeId = 0;
      }
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
.equipe-table .v-data-footer{
  display: none;
}
</style>
