<template>
  <div>
    <v-stepper
      v-model="step"
      vertical
      elevation="0"
      class="medico-stepper"
    >
      <!-- Dados Pessoais -->
      <v-stepper-step
        :complete="step > 1"
        color="#007970"
        step="1"
      >
        Dados Pessoais
        <small v-if="step == 1">Descrição de dados preenchidos</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <!-- Nome, CPF -->
        <v-row>
          <v-col :md="9">
            <v-text-field
              :hide-details="'auto'"
              label="Nome"
            />
          </v-col>
          <v-col :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="CPF"
            />
          </v-col>
        </v-row>
        <!-- Celular, Email, Data de Nascimento -->
        <v-row>
          <v-col :md="4">
            <v-text-field
              :hide-details="'auto'"
              label="Telefone Celular"
            />
          </v-col>
          <v-col :md="5">
            <v-text-field
              :hide-details="'auto'"
              label="E-mail"
            />
          </v-col>
          <v-col :md="3">
            <v-menu
              v-model="menuNascimento"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formData.data_nascimento"
                  hide-details="auto"
                  :rules="[v => !!v || 'Data de Nascimento obrigatória']"
                  label="Data de Nascimento"
                  type="date"
                  max="3000-01-01"
                  class="medico-stepper-input-date"
                >
                  <span slot="append">
                    <v-icon v-bind="attrs" v-on="on">
                      mdi-calendar
                    </v-icon>
                  </span>
                </v-text-field>
              </template>
              <v-date-picker
                v-model="formData.data_nascimento"
                @input="menuNascimento = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <!-- RG, Orgao Emissor, Data de Emissao -->
        <v-row>
          <v-col :md="4">
            <v-text-field
              :hide-details="'auto'"
              label="RG"
            />
          </v-col>
          <v-col :md="5">
            <v-text-field
              :hide-details="'auto'"
              label="Orgão Emissor"
            />
          </v-col>
          <v-col :md="3">
            <v-menu
              v-model="menuEmissao"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formData.data_emissao"
                  hide-details="auto"
                  :rules="[v => !!v || 'Data de Emissão obrigatória']"
                  label="Data de Emissão"
                  type="date"
                  max="3000-01-01"
                  class="medico-stepper-input-date"
                >
                  <span slot="append">
                    <v-icon v-bind="attrs" v-on="on">
                      mdi-calendar
                    </v-icon>
                  </span>
                </v-text-field>
              </template>
              <v-date-picker
                v-model="formData.data_emissao"
                @input="menuEmissao = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <!-- Titulo, Zona Eleitoral, Seção, Cartão SUS -->
        <v-row>
          <v-col :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Titulo de Eleitor"
            />
          </v-col>
          <v-col :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Zona Eleitoral"
              maxlength="4"
            />
          </v-col>
          <v-col :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Seção Eleitoral"
              maxlength="4"
            />
          </v-col>
          <v-col :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Cartão do SUS"
              maxlength="15"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col :md="2">
            <v-file-input
              accept="image/*"
              label="Doc. RG"
            />
          </v-col>
          <v-col :md="2">
            <v-file-input
              accept="image/*"
              label="Doc. CPF"
            />
          </v-col>
          <v-col :md="2">
            <v-file-input
              accept="image/*"
              label="Foto 3x4"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              color="accent"
              @click="step = 2"
            >
              Continuar
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <!-- Informações de Moradia -->
      <v-stepper-step
        :complete="step > 2"
        color="#007970"
        step="2"
      >
        Informações de Moradia 
        <small v-if="step == 2">Descrição de dados preenchidos</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card
          color="grey lighten-1"
          class="mb-12"
          height="200px"
        ></v-card>
        <v-btn
          color="primary"
          @click="step = 3"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <!--  Dados Acadêmicos -->
      <v-stepper-step
        :complete="step > 3"
        color="#007970"
        step="3"
      >
        Dados Acadêmicos
        <small v-if="step == 3">Descrição de dados preenchidos</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card
          color="grey lighten-1"
          class="mb-12"
          height="200px"
        ></v-card>
        <v-btn
          color="primary"
          @click="step = 4"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <!--  Dados Profissionais -->
      <v-stepper-step step="4" color="#007970">
        Dados Profissionais
        <small v-if="step == 4">Descrição de dados preenchidos</small>
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-card
          color="grey lighten-1"
          class="mb-12"
          height="200px"
        ></v-card>
        <v-btn
          color="primary"
          @click="step = 5"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <!--  Candidatura -->
      <v-stepper-step step="5" color="#007970">
        Candidatura
        <small v-if="step == 5">Descrição de dados preenchidos</small>
      </v-stepper-step>
      <v-stepper-content step="5">
        <v-card
          color="grey lighten-1"
          class="mb-12"
          height="200px"
        ></v-card>
        <v-btn
          color="primary"
          @click="step = 1"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
export default {
  layout: 'cmedico',
  data () {
    return {
      step: 1,
      formData: {
        data_nascimento: null,
        data_emissao: null,
      },
      menuNascimento: false,
      menuEmissao: false,
    }
  },
}
</script>

<style lang="scss">
  .medico-stepper{
    &-input-date input[type="date"]::-webkit-calendar-picker-indicator {
      display: none;
      -webkit-appearance: none;
    }
  }
</style>