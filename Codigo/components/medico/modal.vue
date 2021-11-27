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
                Avaliar Médico
              </v-card-title>
              <v-card-text>
                <v-select
                  :items="items"
                  label="Status"
                  hide-details="auto"
                  v-model="retorno.status"
                  :rules="[(v) => !!v || 'Status Obrigatório']"
                >
                </v-select>
                <v-textarea
                  hide-details="auto"
                  :clearable="true"
                  label="Observações"
                  v-model="retorno.comentario"
                  :rules="[(v) => !!v || 'Observações obrigatórias']"
                />
              </v-card-text>
            </v-form>
          </v-col>
        </v-row>
        <v-row class="mx-auto">
          <v-col>
            <v-file-input
              accept="image/*"
              label="Assinatura"
              v-model="arquivos.assinatura"
              :rules="[
                (v) =>
                  !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',
              ]"
            />
          </v-col>
          <v-col>
            <v-file-input
              accept="image/*"
              label="Arquivo Adicional"
              v-model="arquivos.adicional"
              :rules="[
                (v) =>
                  !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',
              ]"
            />
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
export default {
  data: () => ({
    items: ["Aprovado", "Revisão", "Negado"],
    valid: true,
    dialog: false,
    retorno: {
      status: null,
      comentario: null,
    },
    arquivos: {
      assinatura: null,
      adicional: null,
    },
  }),
  methods: {
    submitAvaliacao() {
      if (this.$refs.formAvalia.validate()) {
        let info = JSON.parse(JSON.stringify(this.retorno));
        console.log(info,this.arquivos)
      }
    },
  },
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
