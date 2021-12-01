<template>
<div class="text-center">
    <v-dialog v-model="value" scrollable max-width="500px" transition="dialog-bottom-transition" class="video-modal" @click:outside="$emit('input', false)" @keydown.esc="$emit('input', false)">
        <v-card>
            <v-card-title class="text-h5 video-modal-title">
                <h4>
                    <span> {{titulo}} </span>
                </h4>
                <v-btn icon @click="$emit('input', false)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-container fluids>
                    <v-form ref="formVideo" v-model="valid" lazy-validation>
                        <!-- Nome -->
                        <v-row class="mx-auto">
                            <v-col :md="12" :sm="12" :xl="12" cols="12">
                                <v-text-field v-model="video.link" hide-details="auto" :clearable="true" label="Link" :rules="[v => !!v || 'Link é obrigatório', v => (v && v.length <= 250) || 'Maximo de 250 caracteres']" />
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

</div>
</template>

<script>
export default {
    name: 'modal-video',
    props: ['value', 'videoId'],
    data() {
        return {
            valid: true,
            titulo: 'Novo video',

            video: {
                link: ''
            },

        }
    },
    watch: {
        videoId: function (videoId) {
            if (videoId) {
                this.edit(videoId);
                this.titulo = 'Editar video';
            } else {
                this.limpaDados();
                this.titulo = 'Novo video';
            }
        }
    },
    methods: {

        submit() {
          if (this.$refs.formVideo.validate()) {
              let video = JSON.parse(JSON.stringify(this.video))
              this.$axios.$post('/video', video).then(response => {
                  this.limpaDados();
                  this.$emit('abreToast', 'video Cadastrado!')
                  this.$emit('input', false) // Fecha modal
              }).catch(error => {

                this.$emit('abreToast', error.response.data)

              })

          }

        },
        limpaDados() {
            this.video = {
                id: '',
                link: '',
            }

            this.valid == false ?? this.$refs.formVideo.reset();
        },

    }
}
</script>

<style>
.video-modal-title {
    margin-left: 0px;
}

.video-modal-title h4 {
    width: calc(100% - 37px);
    text-align: left;
    border-bottom: 1px solid #b7b7b7;
    line-height: 0.1em;
    margin: 20px 0 20px;
}

.video-modal-title h4 span {
    background: #fff;
    padding: 0 10px;
}
</style>
