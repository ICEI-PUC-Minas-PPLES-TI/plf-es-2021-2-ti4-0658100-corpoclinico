<template>
<div class="text-center">
    <v-dialog v-model="value" scrollable max-width="500px" transition="dialog-bottom-transition" class="especialidade-modal" @click:outside="$emit('input', false)" @keydown.esc="$emit('input', false)">
        <v-card>
            <v-card-title class="text-h5 especialidade-modal-title">
                <h4>
                    <span> {{titulo}} </span>
                </h4>
                <v-btn icon @click="$emit('input', false)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-container fluids>
                    <v-form ref="formEspecialidade" v-model="valid" lazy-validation>
                        <!-- Nome -->
                        <v-row class="mx-auto">
                            <v-col :md="12" :sm="12" :xl="12" cols="12">
                                <v-text-field v-model="especialidade.identificacao" hide-details="auto" :clearable="true" label="Nome" :rules="[v => !!v || 'Nome é obrigatório', v => (v && v.length <= 120) || 'Maximo de 120 caracteres']" />
                            </v-col>
                        </v-row>
                        <!-- Botão de criar -->
                        <v-row class="mx-auto" justify="space-between">
                            <v-col class="text-center">
                                <v-btn color="secondary" block large @click="$emit('input', false)">
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
            <v-btn color="blue" text v-bind="attrs " @click="toast = false">
                Ok
            </v-btn>
        </template>
    </v-snackbar>

</div>
</template>

<script>
export default {
    name: 'modal',
    props: ['value', 'especialidadeId'],
    data() {
        return {
            valid: true,
            titulo: 'Nova Especialidade',

            especialidade: {
                identificacao: ''
            },

            toastMensagem: '',
            toast: false,

        }
    },
    watch: {
        especialidadeId: function (especialidadeId) {
            if (especialidadeId) {
                this.edit(especialidadeId);
                this.titulo = 'Editar Especialidade';
            } else {
                this.limpaDados();
                this.titulo = 'Nova Especialidade';
            }
        }
    },
    mounted() {

    },
    methods: {

        submit() {
          if (this.$refs.formEspecialidade.validate()) {
              let especialidade = JSON.parse(JSON.stringify(this.especialidade))
              this.$axios.$post('/especialidade', especialidade).then(response => {
                  this.limpaDados();
                  this.abreToast('Especialidade Cadastrada!');
                  this.$emit('input', false) // Fecha modal
              }).catch(error => {

                  if (Array.isArray(error.response.data.erros)) {
                      this.abreToast(error.response.data.erros[0]);
                  } else {
                      this.abreToast(error.response.data.erros);
                  }

              })

          }

        },

        abreToast(mensagem) {
            this.toastMensagem = mensagem;
            this.toast = true;
        },

        limpaDados() {
            this.especialidade = {
                id: '',
                identificacao: '',
            }

            this.$refs.formEspecialidade.reset();
        },

    }
}
</script>

<style>
.especialidade-modal-title {
    margin-left: 0px;
}

.especialidade-modal-title h4 {
    width: calc(100% - 37px);
    text-align: left;
    border-bottom: 1px solid #b7b7b7;
    line-height: 0.1em;
    margin: 20px 0 20px;
}

.especialidade-modal-title h4 span {
    background: #fff;
    padding: 0 10px;
}
</style>
