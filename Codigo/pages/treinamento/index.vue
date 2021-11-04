<template>
  <v-container fluid style="overflow: auto; padding: 6vh">
    <div class="text-center">Bem vindo ao treinamento</div>
    <div id="teste"></div>
    <v-stepper v-model="step">
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1" height="200px">
          <div id="player"></div>
        </v-card>

        <div class="text-center">
          <v-btn class="ma-1" plain @click="proximoPasso('video1', 1)">
            <v-icon> mdi-chevron-right </v-icon>
          </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px">
          <!--
        <iframe width="100%" height="100%" id="video2"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ">
        </iframe> -->
          <div id="player2"></div>
        </v-card>

        <div class="text-center">
          <v-btn class="ma-1" plain @click="step = 1">
            <v-icon> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn class="ma-1" plain @click="proximoPasso('video2', 3)">
            <v-icon> mdi-chevron-right </v-icon>
          </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <div class="text-center">
          <v-btn class="ma-1" plain @click="step = 2">
            <v-icon> mdi-chevron-left </v-icon>
          </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-header>
        <v-stepper-step :complete="step > 1" color="#007970" step="1">
          1
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" color="#007970" step="2">
          2
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step color="#007970" step="3"> 3 </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  layout: "cmedico",
  data() {
    return {
      nextStep1: false,
      nextStep2: false,
      step: 1,
    };
  },
  mounted() {

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    console.log("oba");
    var checkYT = setInterval(function () {
      if (YT.loaded) {
        //...setup video here using YT.Player()
        var player;
        player = new YT.Player("player", {
          height: "100%",
          width: "100%",
          videoId: "M7lc1UVf-VE",
          events: {
            onStateChange: function (evt) {
              console.log(evt);
              if (evt.data === YT.PlayerState.ENDED) {
                //this.nextStep1 = true;
                let s = window.document.getElementById('teste');
                console.log( s );
                s.value = 'testeee';
                console.log(s);
              }
            },
          },
        });

        var player2;
        player2 = new YT.Player("player2", {
          height: "100%",
          width: "100%",
          videoId: "dQw4w9WgXcQ",
          events: {
            onStateChange: function (evt) {
              console.log(evt);
              if (evt.data === YT.PlayerState.ENDED) {
                this.nextStep2 = true;
              }
            },
          },
        });

        clearInterval(checkYT);
      }
    }, 100);



    //console.log(window.onYouTubeIframeAPIReady());
    // window.onYouTubeIframeAPIReady(){
    // player = new YT.Player('player', {
    //     height: '360',
    //     width: '640',
    //     videoId: 'M7lc1UVf-VE',
    //     events: {
    //       'onReady': onPlayerReady,
    //       'onStateChange': onPlayerStateChange
    //     }
    //   });
    // }
  },
  methods: {
    proximoPasso(formNome, step) {
      if (step == 2 && this.nextStep1 == true) {
        this.step = 2;
      } else if (step == 3 && this.nextStep2 == true) {
        this.step = 3;
      }
    },

    loadScript() {
      if (typeof YT == "undefined" || typeof YT.Player == "undefined") {
        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.onYouTubeIframeAPIReady();
      }
    },

    // onYouTubeIframeAPIReady() {
    //   new YT.Player("player", {
    //     events: {
    //       onStateChange: function (evt) {
    //         console.log(evt);
    //         if (evt.data === YT.PlayerState.ENDED) {
    //           this.nextStep1 = true;
    //         }
    //       },
    //     },
    //   });
    // },

    // onPlayerStateChange() {
    //   log;
    // },
  },
};
</script>
