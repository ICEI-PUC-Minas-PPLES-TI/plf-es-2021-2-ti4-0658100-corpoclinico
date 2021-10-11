<template>
  <div class="text-center">
    <v-dialog
      v-model="value"
      scrollable
      max-width="500px"
      transition="dialog-bottom-transition"
      class="usuario-modal"
      @click:outside="$emit('input', false)"
      @keydown.esc="$emit('input', false)"
    >
      <v-card>
        <v-card-title class="text-h5 usuario-modal-title">
          <h4>
            <span> Novo Usuário </span>
          </h4>
          <v-btn icon @click="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluids>
            <v-form ref="formUsuario" v-model="valid" lazy-validation>
              <!-- Nome -->
              <v-row class="mx-auto">
                <v-col :md="12" :sm="12" :xl="12" cols="12">
                  <v-text-field
                    v-model="usuario.nome"
                    hide-details="auto"
                    :clearable="true"
                    label="Nome"
                    :rules="[v => !!v || 'Nome é obrigatório', v => (v && v.length <= 120) || 'Maximo de 120 caracteres']"
                  />
                </v-col>
              </v-row>
              <!-- Email -->
              <v-row class="mx-auto mt-3">
                <v-col :md="12" :sm="12" :xl="12" cols="12">
                  <v-text-field
                    v-model="usuario.email"
                    :clearable="true"
                    hide-details="auto"
                    label="Email"
                    :rules="[v => !!v || 'Email é obrigatório', v => (v && v.length <= 100) || 'Maximo de 100 caracteres']"
                  />
                </v-col>
              </v-row>
              <!-- Senha -->
              <v-row class="mx-auto mb-3">
                <v-col :md="12" :sm="12" :xl="12" cols="12">
                  <v-text-field
                    v-model="usuario.senha"
                    :clearable="true"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    hide-details="auto"
                    label="Senha"
                    :rules="[v => !!v || 'Senha é obrigatório',
                    v => (v && v.length >= 8 ) || 'Minimo de 8 caracteres']"
                  />
                </v-col>
              </v-row>
              <!-- Botão de criar -->
              <v-row class="mx-auto" justify="space-between" >
                <v-col class="text-center">
                  <v-btn color="secondary" block large @click="$emit('input', false)">
                    Cancelar
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn color="primary" block large @click="submitUsuario">
                    Gravar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

      <v-snackbar
      v-model="toast"
      shaped
      >
      {{ toastMensagem }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs " @click="toast = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script src="./modal.js"></script>

<style>
.usuario-modal-title {
  margin-left: 0px;
}

.usuario-modal-title h4 {
  width: calc(100% - 37px);
  text-align: left;
  border-bottom: 1px solid #b7b7b7;
  line-height: 0.1em;
  margin: 20px 0 20px;
}

.usuario-modal-title h4 span {
  background: #fff;
  padding: 0 10px;
}

</style>
