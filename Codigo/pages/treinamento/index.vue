<template>
  <v-container fluid style="overflow: auto; padding: 6vh">
    <div class="text-center">Bem vindo ao treinamento</div>

    <v-stepper v-model="step">
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <div class="text-center">
          <v-btn class="ma-1" plain @click="step = 2">
            <v-icon> mdi-chevron-right </v-icon>
          </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <div class="text-center">
          <v-btn class="ma-1" plain @click="step = 1">
            <v-icon> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn class="ma-1" plain @click="step = 3">
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
      step: 1,
    };
  },
  methods: {},
};
</script>
