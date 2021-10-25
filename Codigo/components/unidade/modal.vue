<template>
  <div class="text-center">
    <v-dialog
      v-model="value"
      scrollable
      max-width="800px"
      transition="dialog-bottom-transition"
      class="unidade-modal"
      @click:outside="$emit('input', false)"
      @keydown.esc="$emit('input', false)"
    >

      <v-card>
        <v-card-title class="text-h5 unidade-modal-title">
          <h4>
            <span> {{titulo}} </span>
          </h4>
          <v-btn icon @click="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluids>
            <v-form ref="formUnidade" v-model="valid" lazy-validation>

            <!-- Nome -->
              <v-row class="mx-auto">
                <v-col :md="12" :sm="12" :xl="12" cols="12">
                  <v-text-field
                    v-model="unidade.nome"
                    hide-details="auto"
                    :clearable="true"
                    label="Nome"
                    maxlength="40"
                    :rules="[v => !!v || 'Nome é obrigatório', v => (v && v.length <= 120) || 'Maximo de 40 caracteres']"
                  />
                </v-col>
              </v-row>

            <!--Cep-->
            <v-row class="mx-auto">
              <v-col :md="6" :sm="12" :xl="6" cols="12">
                <v-text-field
                  maxlength="9"
                  :hide-details="'auto'"
                  v-model="unidade.cep"
                  label="CEP (obrigatório)"
                  :rules="[v => !!v || 'Cep é obrigatório']"
                  @blur="buscaCep"
                />
              </v-col>
              <v-col :md="6" :sm="12" :xl="6" cols="12">
                  <!-- Cidade -->
                  <v-text-field
                    v-model="unidade.cidade"
                    :clearable="true"
                    hide-details="auto"
                    label="Cidade"
                    :rules="[v => !!v || 'Cidade é obrigatório', v => (v && v.length <= 100) || 'Maximo de 100 caracteres']"
                  />
                </v-col>
            </v-row>
              
              <!-- Bairro -->
              <v-row class="mx-auto mb-3">
                <v-col :md="12" :sm="12" :xl="12" cols="12">
                  <v-text-field
                    v-model="unidade.bairro"
                    :clearable="true"
                    hide-details="auto"
                    label="Bairro"
                    :rules="[v => !!v || 'Bairro é obrigatório',
                    v => (v && v.length >= 8 ) || 'Minimo de 8 caracteres']"
                  />
                </v-col>
              </v-row>
               <!-- Logradouro -->
              <v-row class="mx-auto mb-3">
                <v-col :md="8" :sm="12" :xl="8" cols="12">
                  <v-text-field
                    v-model="unidade.logradouro"
                    :clearable="true"
                    hide-details="auto"
                    label="Logradouro"
                    :rules="[v => !!v || 'Logradouro é obrigatório',
                    v => (v && v.length >= 8 ) || 'Minimo de 8 caracteres']"
                  />
                </v-col>
               <!-- Numero -->
                <v-col :md="4" :sm="12" :xl="4" cols="12">
                  <v-text-field
                    maxlength="6"
                    v-model="unidade.numero"
                    :clearable="true"
                    hide-details="auto"
                    label="Número"
                    :rules="[v => !!v || 'Número é obrigatório']"
                    
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
                  <v-btn color="primary" block large @click="submitUnidade">
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
