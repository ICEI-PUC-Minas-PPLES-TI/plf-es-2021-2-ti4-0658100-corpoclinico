<template>
  <v-container fluid style="overflow: auto; padding: 6vh">
    <div class="text-center">Bem vindo ao treinamento</div>
    <transition name="fade">
      <v-stepper v-model="step" v-if="videoIds.length > 0">
        <div v-for="(videoId, index) in videoIds" :key="index">
          <v-stepper-content :step="index + 1">
            <v-card class="mb-12" color="grey lighten-1" height="350px" width="100%">
              <youtube
                :video-id="videoId"
                ref="youtube"
                :player-vars="playerVars"
                @playing="playing"
              ></youtube>
            </v-card>
            <div class="text-center">
              <v-btn v-if="index + 1 != 1" class="ma-1" plain @click="previousStep(index)">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>

              <v-btn class="ma-1" plain @click="nextStep(index)">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-stepper-content>
        </div>
        <v-stepper-header>
          <div v-for="(videoId, index) in videoIds" :key="index">
            <v-stepper-step
              :complete="step > index + 1"
              color="#007970"
              :step="index + 1"
            >{{ index + 1 }}</v-stepper-step>
            <v-divider></v-divider>
          </div>
        </v-stepper-header>
      </v-stepper>
      <div class="text-center" v-else>
        Nenhum video cadastrado
      </div>
    </transition>

    <v-snackbar v-model="toast" shaped>
      {{ toastMensagem }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="toast = false">Ok</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style>
iframe {
  width: 100%;
}
</style>

<script>

import { getIdFromUrl } from 'vue-youtube'

export default {
  layout: "cmedico",

  data() {
    return {
      videoIds: [],
      step: 1,
      playerVars: {
        //autoplay: 1
      },
      toastMensagem: "",
      toast: false,

    };
  },
  async beforeMount() {
     this.listaVideos(this).then(data =>{
       data.forEach(element => {
              if (element.link) {
                this.videoIds.push(getIdFromUrl(element.link));
              }
      });
     });
  },
   created() {
  },
  async mounted() {
  },
  methods: {
    playVideo() {
      this.player.playVideo()
    },
    playing() {
      //console.log('\o/ we are watching!!!')
    },
    async nextStep(index) {
      let result = await this.$refs.youtube[index].player.getPlayerState();
      if (result == 0) {
        this.step = index + 2;
      } else {
        this.abreToast("Termine o vídeo atual para avançar!");
      }

    },

    async previousStep(index) {
      this.step -= 1;
    },

    abreToast(mensagem) {
      this.toastMensagem = mensagem;
      this.toast = true;
    },

    listaVideos(t) {
      return new Promise(resolve => {      
        setTimeout(function() {
        t.$axios
          .$get("/video?ativo=1")
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            t.abreToast(error)
          });
        }, 50);
      });
    }

  },
};
</script>



