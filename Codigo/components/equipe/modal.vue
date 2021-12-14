<template>
  <div class="text-center">
    <v-dialog
      v-model="value"
      scrollable
      max-width="500px"
      transition="dialog-bottom-transition"
      class="equipe-modal"
      @click:outside="$emit('input', false)"
      @keydown.esc="$emit('input', false)"
    >
      <v-card>
        <v-card-title class="text-h5 equipe-modal-title">
          <h4>
            <span> {{ titulo }} </span>
          </h4>
          <v-btn icon @click="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluids>
            <v-form ref="formEquipe" v-model="valid" lazy-validation>
              <!-- Nome -->
              <v-row class="mx-auto">
                <v-col :md="12" :sm="12" :xl="12" cols="12">
                  <v-text-field
                    v-model="equipe.nome"
                    hide-details="auto"
                    :clearable="true"
                    label="Nome"
                    :rules="[
                      (v) => !!v || 'Nome é obrigatório',
                      (v) =>
                        (v && v.length <= 120) || 'Maximo de 120 caracteres',
                    ]"
                  />
                </v-col>
              </v-row>

              <!-- Especialidade -->
              <v-row class="mx-auto mb-3">
                <v-col :md="12" :sm="12" :xl="12" cols="12">
                  <v-autocomplete
                    v-model="equipe.especialidade_id"
                    :items="especialidades"
                    hide-details="auto"
                    :rules="[(v) => !!v || 'Especialidade é obrigatório']"
                    :clearable="true"
                    label="Especialidade"
                    item-text="identificacao"
                    item-value="id"
                  />
                </v-col>
              </v-row>
              <!-- Botão de criar -->
              <v-row class="mx-auto" justify="space-between">
                <v-col class="text-center">
                  <v-btn
                    color="secondary"
                    block
                    large
                    @click="$emit('input', false)"
                  >
                    Cancelar
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn color="primary" block large @click="submit">
                    Gravar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="toast" shaped>
      {{ toastMensagem }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="toast = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
const Swal = require('sweetalert2')
export default {
  name: "modal",
  props: ["value", "equipeId"],
  data() {
    return {
      valid: true,
      titulo: "Nova Equipe",

      equipe: {
        id: "",
        nome: "",
        especialidade_id: "",
      },

      especialidades: [
        {
          id: "",
          identificacao: "",
        },
      ],

      toastMensagem: "",
      toast: false,
    };
  },
  watch: {
    value: function(val){
      this.listaEspecialidades();
    },
    equipeId: function (equipeId) {
      if (equipeId) {
        this.edit(equipeId);
        this.titulo = "Editar Equipe";
      } else {
        this.limpaDados();
        this.titulo = "Nova Equipe";
      }
    },
  },
  mounted() {
    this.listaEspecialidades();
  },
  methods: {
    submit() {
      if (this.equipe.id > 0) {
        this.update(this.equipe.id);
      } else {
        if (this.$refs.formEquipe.validate()) {
          let equipe = JSON.parse(JSON.stringify(this.equipe));
          this.$axios
            .$post("/equipe", equipe)
            .then((response) => {
              this.limpaDados();
              Swal.fire({
                title: 'Equipe Cadastrada!',
                icon: 'success',
                confirmButtonText: 'OK'
              })
              this.$emit("input", false); // Fecha modal
              this.$emit("listaEquipes");
            })
            .catch((error) => {
              Swal.fire({
                title: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
              })
            });
        }
      }
    },

    edit(id) {
      this.$axios
        .$get("/equipe/" + id)
        .then((response) => {
          this.equipe = response;
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        });
    },

    update(id) {
      if (this.$refs.formEquipe.validate() && id) {
        let equipe = JSON.parse(JSON.stringify(this.equipe));

        this.$axios
          .$put("/equipe/" + id, equipe)
          .then((response) => {
            this.limpaDados();
            Swal.fire({
              title: 'Equipe Atualizada!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            this.$emit("input", false); // Fecha modal
          })
          .catch((error) => {
            Swal.fire({
              title: error.response.data.message,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          });
      }
    },

    abreToast(mensagem) {
      this.toastMensagem = mensagem;
      this.toast = true;
    },

    limpaDados() {
      this.equipe = {
        id: "",
        nome: "",
        especialidade_id: "",
      };

      this.$refs.formEquipe.reset();
    },

    listaEspecialidades() {
      this.$axios
        .$get("/especialidade")
        .then((response) => {
          this.especialidades = response.dados;
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        });
    },
  },
};
</script>

<style>
.equipe-modal-title {
  margin-left: 0px;
}

.equipe-modal-title h4 {
  width: calc(100% - 37px);
  text-align: left;
  border-bottom: 1px solid #b7b7b7;
  line-height: 0.1em;
  margin: 20px 0 20px;
}

.equipe-modal-title h4 span {
  background: #fff;
  padding: 0 10px;
}
</style>
