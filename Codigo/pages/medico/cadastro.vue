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
          <v-col cols="12" :xs="12" :sm="6" :md="9">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.nome"
              label="Nome"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="6" :md="3">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.cpf"
              v-mask="['###.###.###-##']"
              label="CPF"
            />
          </v-col>
        </v-row>
        <!-- Celular, Email, Data de Nascimento -->
        <v-row>
          <v-col cols="12" :xs="12" :sm="6" :md="4">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.celular"
              v-mask="['(##) ####-####', '(##) #####-####']"
              label="Telefone Celular"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="6" :md="5">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.email"
              label="E-mail"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="6" :md="3">
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
                  v-model="formData.dt_nascimento"
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
                v-model="formData.dt_nascimento"
                @input="menuNascimento = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <!-- RG, Orgao Emissor, Data de Emissao -->
        <v-row>
          <v-col cols="12" :xs="12" :sm="6" :md="4">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.rg"
              label="RG"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="6" :md="5">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.rg_orgao_emissor"
              label="Orgão Emissor"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="6" :md="3">
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
                  v-model="formData.rg_data_emissao"
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
                v-model="formData.rg_data_emissao"
                @input="menuEmissao = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <!-- Titulo, Zona Eleitoral, Seção, Cartão SUS -->
        <v-row>
          <v-col cols="12" :xs="12" :sm="6" :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Titulo de Eleitor"
              v-model="formData.titulo_eleitoral"
              v-mask="['#### #### ####']"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="6" :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Zona Eleitoral"
              v-model="formData.zona"
              maxlength="4"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="6" :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Seção Eleitoral"
              v-model="formData.secao"
              maxlength="4"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="6" :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Cartão do SUS"
              v-model="formData.cartao_sus"
              maxlength="15"
            />
          </v-col>
        </v-row>
        <!-- Anexos -->
        <v-row>
          <v-col cols="12" :xs="12" :sm="4" :md="2">
            <v-file-input
              accept="image/*"
              label="Doc. RG"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="4" :md="2">
            <v-file-input
              accept="image/*"
              label="Doc. CPF"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="4" :md="2">
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
        <!-- CEP, Logradouro, Número, Complemento -->
        <v-row>
          <v-col cols="12" :xs="12" :md="3">
            <v-text-field
              :hide-details="'auto'"
              v-mask="'#####-###'"
              v-model="formData.cep"
              label="CEP"
              @blur="buscaCep"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="5">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.logradouro"
              label="Logradouro"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="6" :md="2">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.numero"
              label="Número"
            />
          </v-col>
          <v-col cols="12" :xs="12" :sm="6" :md="2">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.complemento"
              label="Complemento"
            />
          </v-col>
        </v-row>
        <!-- Estado, Cidade, Bairro -->
        <v-row>
          <v-col cols="12" :xs="12" :md="3">
            <v-select
              item-text="nome"
              item-value="sigla"
              :items="[
                {nome: 'Acre', sigla: 'AC'},
                {nome: 'Alagoas', sigla: 'AL'},
                {nome: 'Amapá', sigla: 'AP'},
                {nome: 'Amazonas', sigla: 'AM'},
                {nome: 'Bahia', sigla: 'BA'},
                {nome: 'Ceará', sigla: 'CE'},
                {nome: 'Distrito Federal', sigla: 'DF'},
                {nome: 'Espírito Santo', sigla: 'ES'},
                {nome: 'Goiás', sigla: 'GO'},
                {nome: 'Maranhão', sigla: 'MA'},
                {nome: 'Mato Grosso', sigla: 'MT'},
                {nome: 'Mato Grosso do Sul', sigla: 'MS'},
                {nome: 'Minas Gerais', sigla: 'MG'},
                {nome: 'Pará', sigla: 'PA'},
                {nome: 'Paraíba', sigla: 'PB'},
                {nome: 'Paraná', sigla: 'PR'},
                {nome: 'Pernambuco', sigla: 'PE'},
                {nome: 'Piauí', sigla: 'PI'},
                {nome: 'Rio de Janeiro', sigla: 'RJ'},
                {nome: 'Rio Grande do Norte', sigla: 'RN'},
                {nome: 'Rio Grande do Sul', sigla: 'RS'},
                {nome: 'Rondônia', sigla: 'RO'},
                {nome: 'Roraima', sigla: 'RR'},
                {nome: 'Santa Catarina', sigla: 'SC'},
                {nome: 'São Paulo', sigla: 'SP'},
                {nome: 'Sergipe', sigla: 'SE'},
                {nome: 'Tocantins', sigla: 'TO'}
              ]"
              label="Estado"
              v-model="formData.estado"
            ></v-select>
          </v-col>
          <v-col cols="12" :xs="12" :md="5">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.cidade"
              label="Cidade"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="4">
            <v-text-field
              :hide-details="'auto'"
              v-model="formData.bairro"
              label="Bairro"
            />
          </v-col>
        </v-row>
        <!-- Comprovante de Endereço -->
        <v-row>
          <v-col cols="12" :xs="12" :md="3">
            <v-file-input
              accept="image/*"
              label="Comp. de Endereço"
            />
          </v-col>
        </v-row>
        <!-- Continuar, Voltar -->
        <v-row>
          <v-col>
            <v-btn
              @click="step = 1"
            >
              Voltar
            </v-btn>
            <v-btn
              color="accent"
              @click="step = 3"
            >
              Continuar
            </v-btn>
          </v-col>
        </v-row>
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
        <!-- Escolaridade, Sociedade Cientifica -->
        <v-row>
          <v-col cols="12" :xs="12" :md="5">
            <v-select
              :items="[
                {text: 'Graduação', value: 'GRAD'},
                {text: 'Pós Graduação', value: 'POSGRAD'},
                {text: 'Mestrado', value: 'MESTRE'},
                {text: 'Doutorado', value: 'DOUT'},
              ]"
              v-model="formData.escolaridade_max"
              label="Nível de Escolaridade"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="7">
            <v-text-field
              :hide-details="'auto'"
              label="Sociedade Cientifica"
              v-model="formData.sociedade_cientifica"
            >
              <template v-slot:append>
                <v-tooltip
                  bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">
                      mdi-help-circle-outline
                    </v-icon>
                  </template>
                  Associação de especialistas, estudiosos ou eruditos de um ramo do conhecimento ou das ciências em geral.
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <!-- Formações -->
        <v-row>
          <v-col>
            <ul>
              <li v-for="(forma, fidx) in formData.formacao" :key="fidx">
                <v-row>
                  <v-col cols="12" :xs="12" :md="6">
                    <v-text-field
                      :hide-details="'auto'"
                      label="Nome Faculdade"
                      v-model="formData.formacao[fidx].faculdade_nome"
                    />
                  </v-col>
                  <v-col cols="12" :xs="12" :sm="6" :md="2">
                    <v-file-input
                      accept="image/*"
                      label="Certificado"
                    />
                  </v-col>
                  <v-col cols="12" :xs="12" :sm="6" :md="3">
                    <v-text-field
                      :hide-details="'auto'"
                      type="number"
                      label="Ano de Formação"
                      v-model="formData.formacao[fidx].faculdade_ano_formatura"
                    />
                  </v-col>
                  <v-col cols="12" :xs="12" :md="1" v-if="fidx > 0" @click="formData.formacao.splice(fidx, 1)">
                    <v-btn icon class="mt-3">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn text @click="adicionarFormacao">
              Adicionar Formação
            </v-btn>
          </v-col>
        </v-row>
        <!-- Continuar, Voltar -->
        <v-row>
          <v-col>
            <v-btn
              @click="step = 2"
            >
              Voltar
            </v-btn>
            <v-btn
              color="accent"
              @click="step = 4"
            >
              Continuar
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <!--  Dados Profissionais -->
      <v-stepper-step step="4" color="#007970" :complete="step > 4">
        Dados Profissionais
        <small v-if="step == 4">Descrição de dados preenchidos</small>
      </v-stepper-step>
      <v-stepper-content step="4">
        <!-- CRM, Categoria -->
        <v-row>
          <v-col cols="12" :xs="12" :md="5">
            <v-text-field
              :hide-details="'auto'"
              label="CRM"
              v-model="formData.crm"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="7">
            <v-select
              :items="[
                {text: 'Efetivo', value: 'E'},
                {text: 'Temporário', value: 'T'},
                {text: 'Contratado', value: 'C'},
              ]"
              label="Categoria"
              v-model="formData.categoria"
            />
          </v-col>
        </v-row>
        <!-- Especialidades -->
        <v-row>
          <v-col>
            <ul>
              <li v-for="(espe, eidx) in formData.especialidade" :key="eidx">
                <v-row>
                  <v-col cols="12" :xs="12" :md="4">
                    <v-text-field
                      :hide-details="'auto'"
                      label="Instituicao"
                      v-model="formData.especialidade[eidx].instituicao"
                    />
                  </v-col>
                  <v-col cols="12" :xs="12" :md="3">
                    <v-text-field
                      :hide-details="'auto'"
                      type="number"
                      label="Ano de Formação"
                      v-model="formData.especialidade[eidx].ano_formatura"
                    />
                  </v-col>
                  <v-col cols="12" :xs="12" :md="2">
                    <v-file-input
                      accept="image/*"
                      label="Certificado"
                    />
                  </v-col>
                  <v-col cols="12" :xs="12" :md="2">
                    <v-text-field
                      :hide-details="'auto'"
                      type="number"
                      label="Nº RQE"
                      v-model="formData.especialidade[eidx].rqe"
                    />
                  </v-col>
                  <v-col cols="12" :xs="12" :md="1" @click="formData.especialidade.splice(eidx, 1)">
                    <v-btn icon class="mt-3">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn text @click="adicionarEspecialidade">
              Adicionar {{ formData.especialidade.length > 0 ? 'outra': '' }} especialidade
            </v-btn>
          </v-col>
        </v-row>
        <!-- Continuar, Voltar -->
        <v-row>
          <v-col>
            <v-btn
              @click="step = 3"
            >
              Voltar
            </v-btn>
            <v-btn
              color="accent"
              @click="step = 5"
            >
              Continuar
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <!--  Candidatura -->
      <v-stepper-step step="5" color="#007970">
        Candidatura
        <small v-if="step == 5">Descrição de dados preenchidos</small>
      </v-stepper-step>
      <v-stepper-content step="5">
        <!-- RG, Orgao Emissor, Data de Emissao -->
        <v-row>
          <v-col cols="12" :xs="12" :md="formData.faturamento == 'PJ' ? 3: 6">
            <v-select
              :hide-details="'auto'"
              :items="[
                {text: 'Pessoa Juridica', value: 'PJ'},
                {text: 'Cooperado', value: 'C'}
              ]"
              v-model="formData.faturamento"
              label="Faturamento"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="3" v-if="formData.faturamento == 'PJ'">
            <v-text-field
              :hide-details="'auto'"
              label="CNPJ"
              v-model="formData.cnpj"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Unidade"
              v-model="formData.unidade_id"
              disabled
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Equipe"
              v-model="formData.equipe_id"
              disabled
            />
          </v-col>
        </v-row>
        <!-- Explicação e link de certificados -->
        <v-row>
          <v-col>
            <small class="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae egestas leo. Nam faucibus non lorem sit amet porta.
            </small>
            <a href="#" class="d-block">Link de Download</a>
          </v-col>
        </v-row>
        <!-- Certificado e Termos -->
        <v-row>
          <v-col cols="12" :xs="12" :md="4">
            <v-file-input
              accept="image/*"
              label="Cert. Quitação CRMMG"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="4">
            <v-file-input
              accept="image/*"
              label="Termo de Vigilância"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="4">
            <v-file-input
              accept="image/*"
              label="Termo de Compromisso"
            />
          </v-col>
        </v-row>
        <!-- Continuar, Voltar -->
        <v-row>
          <v-col>
            <v-btn
              @click="step = 4"
            >
              Voltar
            </v-btn>
            <v-btn
              color="accent"
              @click="step = 1"
            >
              Concluir
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import axios2 from 'axios';
import {mask} from 'vue-the-mask'
export default {
  layout: 'cmedico',
  directives: {mask},
  data () {
    return {
      step: 1,
      formData: {
        nome: null,
        email: null,
        celular: null,
        cpf: null,
        dt_nascimento: null,
        rg: null,
        rg_orgao_emissor: null,
        rg_data_emissao: null,
        titulo_eleitoral: null,
        zona: null,
        secao: null,
        cartao_sus: null,
        cep: null,
        logradouro: null,
        numero: null,
        complemento: null,
        estado: null,
        cidade: null,
        bairro: null,
        sociedade_cientifica: null,
        escolaridade_max: null,
        crm: null,
        categoria: null,
        formacao: [{
          faculdade_nome: null,
          faculdade_ano_formatura: null,
        }],
        especialidade: [],
        equipe_id: null,
        unidade_id: null,
        faturamento: null,
        cnpj: null,
      },
      menuNascimento: false,
      menuEmissao: false,
    }
  },
  methods: {
    buscaCep(){
      axios2
        .get(`https://viacep.com.br/ws/${this.formData.cep}/json`)
        .then(res => {
          if(!res.data.erro){
            this.formData.logradouro ||= res.data.logradouro
            this.formData.estado ||= res.data.uf
            this.formData.cidade ||= res.data.localidade
            this.formData.bairro ||= res.data.bairro
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    adicionarFormacao(){
      this.formData.formacao.push({
        faculdade_nome: null,
        faculdade_ano_formatura: null,
      })
    },
    adicionarEspecialidade(){
      this.formData.especialidade.push({
        instituicao: null,
        ano_formatura: null,
        rqe: null,
      })
    }
  }
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