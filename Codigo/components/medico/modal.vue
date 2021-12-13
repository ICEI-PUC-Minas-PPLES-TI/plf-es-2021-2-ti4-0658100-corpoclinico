<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    class="unidade-modal"
    width="600px"
    @click:outside="$emit('input', false)"
    @keydown.esc="$emit('input', false)"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="blue" slot="activator" v-bind="attrs" v-on="on">
        Avaliar
      </v-btn>
    </template>
    <v-card class="px-4 py-4">
      <v-container fluids>
        <v-row class="mx-auto">
          <v-col :md="12" :sm="12" :xl="12" cols="12">
            <v-form ref="formAvalia" v-model="valid" lazy-validation>
              <v-card-title class="text-h5 unidade-modal-title">
                Status Atual: {{this.selecionado}}
              </v-card-title>
              <v-card-text>
                <v-select
                  :items="items"
                  label="Status"
                  hide-details="auto"
                  v-model="retorno.status"
                  :rules="[v => !!v || 'Status Obrigatório']"
                >
                </v-select>
                <v-textarea
                  hide-details="auto"
                  :clearable="true"
                  label="Observações"
                  v-model="retorno.comentario"
                  :disabled = "retorno.status == 'Aprovado' "
                  :rules="'retorno.status'== 'Reprovado' ? [v => !!v || 'Comentário é obrigatório'] : []"
                />
              </v-card-text>
            </v-form>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row class="mx-auto text-center mt-2">
            <v-col>
              <v-btn
                color="grey"
                background="primary"
                width="100%"
                @click="dialog = false"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                color="blue"
                background="primary"
                slot="activator"
                @click="submitAvaliacao"
              >
                Avaliar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
const Swal = require('sweetalert2')
export default {
  data: () => ({
    items: ["Aprovado","Recusado"],
    selecionado:"",
    valid: true,
    dialog: false,
    medico: [],
    retorno: {
      status: null,
      comentario: null
    },
    arquivos: {
      assinatura: null,
      adicional: null
    }
  }),
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("id");
    this.listaMedico(myParam);
  },
  methods: {
    submitAvaliacao() {
      if (this.$refs.formAvalia.validate()) {
        let retornos = this.medico.candidatura.retornos;
        let letra = this.retorno.status.substring(0, 1);
        retornos[0].status = letra;
        retornos[0].comentario = this.retorno.comentario;
        if(letra=="A"){
          retornos[0].comentario = "";
        }
        let retorno = JSON.parse(JSON.stringify(retornos[0]));
        let idRetorno = retorno.id;
        this.$axios
          .$put("/retorno/" + idRetorno, retorno)
          .then(response => {
            this.retornoPagina();
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              title: error.response.data.message,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          });
      }
    },
    listaMedico(id) {
      this.$axios
        .$get("/medico/" + id)
        .then(response => {
          this.medico = response;
          let retonroSelecionado = this.medico.candidatura.retornos[this.medico.candidatura.retornos.length-1].status
          if(retonroSelecionado=="A"){
            this.selecionado=this.items[0]
          }else if(retonroSelecionado=="R"){
            this.selecionado=this.items[1]
          }
        })
        .catch(error => {
          Swal.fire({
            title: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
          setTimeout((window.location.href = "/medico"), 2000);
        });
    },
    retornoPagina() {
      window.location.href = "/medico";
    }
  }
};
</script>

<style>
.unidade-modal-title {
  margin-left: 0px;
}

.unidade-modal-title h4 {
  width: calc(100% - 37px);
  text-align: left;
  border-bottom: 1px solid #b7b7b7;
  line-height: 0.1em;
  margin: 20px 0 20px;
}

.unidade-modal-title h4 span {
  background: #fff;
  padding: 0 10px;
}
</style>
