<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">
         Deseja deletar unidade?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            Não
          </v-btn>

          <v-btn
            color="success"
            text
            @click="dialog = false"
          >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>