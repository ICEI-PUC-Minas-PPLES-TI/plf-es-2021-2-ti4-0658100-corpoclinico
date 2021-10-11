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
        <v-form
          ref="formPt1"
          lazy-validation
        >
          <!-- Nome, CPF -->
          <v-row>
            <v-col cols="12" :xs="12" :sm="6" :md="9">
              <v-text-field
                :hide-details="'auto'"
                :rules="[v => !!v || 'Nome é obrigatório']"
                v-model="formData.nome"
                label="Nome (obrigatório)"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="3">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.cpf"
                v-mask="['###.###.###-##']"
                :rules="[v => !!v || 'CPF é obrigatório']"
                label="CPF (obrigatório)"
                @blur="salvarEmCache"
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
                label="Telefone Celular (obrigatório)"
                :rules="[v => !!v || 'Telefone Celular obrigatório']"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="5">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.email"
                label="E-mail (obrigatório)"
                :rules="[v => !!v || 'E-mail obrigatório']"
                @blur="salvarEmCache"
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
                  @input="menuNascimento = false;salvarEmCache()"
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
                :rules="[v => !!v || 'RG obrigatório']"
                label="RG (obrigatório)"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="5">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.rg_orgao_emissor"
                label="Orgão Emissor"
                @blur="salvarEmCache"
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
                  @input="menuEmissao = false;salvarEmCache()"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <!-- Titulo, Zona Eleitoral, Seção, Cartão SUS -->
          <v-row>
            <v-col cols="12" :xs="12" :sm="6" :md="3">
              <v-text-field
                :hide-details="'auto'"
                label="Título de Eleitor (obrigatório)"
                v-model="formData.titulo_eleitoral"
                :rules="[v => !!v || 'Título obrigatório']"
                v-mask="['#### #### ####']"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="3">
              <v-text-field
                :hide-details="'auto'"
                label="Zona Eleitoral (obrigatório)"
                :rules="[v => !!v || 'Zona obrigatória']"
                v-model="formData.zona"
                maxlength="3"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="3">
              <v-text-field
                :hide-details="'auto'"
                label="Seção Eleitoral (obrigatório)"
                v-model="formData.secao"
                :rules="[v => !!v || 'Seção obrigatória']"
                maxlength="4"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="3">
              <v-text-field
                :hide-details="'auto'"
                label="Cartão do SUS (obrigatório)"
                :rules="[v => !!v || 'Cartão do Sus obrigatório']"
                v-model="formData.cartao_sus"
                maxlength="15"
                @blur="salvarEmCache"
              />
            </v-col>
          </v-row>
          <!-- Senha, Anexos -->
          <v-row>
            <v-col cols="12" :xs="12" :sm="6" :md="3">
              <v-text-field
                v-model="formData.senha"
                :append-icon="senhaVisivel ? 'mdi-eye' : 'mdi-eye-off'"
                :type="senhaVisivel ? 'text' : 'password'"
                @click:append="senhaVisivel = !senhaVisivel"
                hide-details="auto"
                label="Senha (obrigatório)"
                :rules="[v => !!v || 'Senha é obrigatório', v => (v && v.length >= 8 && /\d/.test(v) && /[a-z]/g.test(v) && /[A-Z]/g.test(v)) || 'Min 8 caracteres, 1 número, 1 letra minúscula e 1 letra maiúscula']"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="2">
              <v-file-input
                accept="image/*"
                label="Doc. RG"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="2">
              <v-file-input
                accept="image/*"
                label="Doc. CPF"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="2">
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
                @click="proximoPasso('formPt1',2)"
              >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
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
        <v-form
          ref="formPt2"
          lazy-validation
        >
          <!-- CEP, Logradouro, Número, Complemento -->
          <v-row>
            <v-col cols="12" :xs="12" :md="3">
              <v-text-field
                :hide-details="'auto'"
                v-mask="'#####-###'"
                v-model="formData.cep"
                label="CEP (obrigatório)"
                :rules="[v => !!v || 'CEP obrigatório']"
                @blur="buscaCep"
              />
            </v-col>
            <v-col cols="12" :xs="12" :md="5">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.logradouro"
                label="Logradouro (obrigatório)"
                :rules="[v => !!v || 'Logradouro obrigatório']"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="2">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.numero"
                label="Número (obrigatório)"
                :rules="[v => !!v || 'Número obrigatório']"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="2">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.complemento"
                label="Complemento"
                @blur="salvarEmCache"
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
                label="Estado (obrigatório)"
                v-model="formData.estado"
                :rules="[v => !!v || 'Estado obrigatório']"
                @change="salvarEmCache"
              ></v-select>
            </v-col>
            <v-col cols="12" :xs="12" :md="5">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.cidade"
                label="Cidade (obrigatório)"
                :rules="[v => !!v || 'Cidade obrigatória']"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :md="4">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.bairro"
                label="Bairro (obrigatório)"
                :rules="[v => !!v || 'Bairro obrigatório']"
                @blur="salvarEmCache"
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
                @click="proximoPasso('formPt2',3)"
              >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
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
        <v-form
          ref="formPt3"
          lazy-validation
        >
          <v-row>
            <v-col cols="12" :xs="12" :md="5">
              <v-select
                :items="[
                  {text: 'Graduação', value: 'BACHA'},
                  {text: 'Pós Graduação', value: 'ESPE'},
                  {text: 'Mestrado', value: 'MESTRE'},
                  {text: 'Doutorado', value: 'DOUTOR'},
                ]"
                v-model="formData.escolaridade_max"
                label="Nível de Escolaridade (obrigatório)"
                :rules="[v => !!v || 'Nível de Escolaridade obrigatório']"
                @change="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :md="7">
              <v-text-field
                :hide-details="'auto'"
                label="Sociedade Cientifica"
                v-model="formData.sociedade_cientifica"
                @blur="salvarEmCache"
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
                        @blur="salvarEmCache"
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
                        @blur="salvarEmCache"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :md="1" v-if="fidx > 0" @click="formData.formacao.splice(fidx, 1);salvarEmCache()">
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
                @click="proximoPasso('formPt3',4)"
              >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>

      <!--  Dados Profissionais -->
      <v-stepper-step step="4" color="#007970" :complete="step > 4">
        Dados Profissionais
        <small v-if="step == 4">Descrição de dados preenchidos</small>
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-form
          ref="formPt4"
          lazy-validation
        >
          <!-- CRM, Categoria -->
          <v-row>
            <v-col cols="12" :xs="12" :md="5">
              <v-text-field
                :hide-details="'auto'"
                label="CRM (obrigatório)"
                v-model="formData.crm"
                :rules="[v => !!v || 'CRM obrigatório']"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col :cols="12" :md="4">
              <v-menu
                v-model="menuDataCrm"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.dt_inscricao_crm"
                    hide-details="auto"
                    label="Data de Inscrição do CRM (obrigatório)"
                    type="date"
                    max="3000-01-01"
                    class="medico-stepper-input-date"
                    :rules="[v => !!v || 'Data de Inscrição do CRM obrigatório']"
                  >
                    <span slot="append">
                      <v-icon v-bind="attrs" v-on="on">
                        mdi-calendar
                      </v-icon>
                    </span>
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="formData.dt_inscricao_crm"
                  @input="menuDataCrm = false;salvarEmCache()"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" :xs="12" :md="3">
              <v-select
                :items="[
                  {text: 'Efetivo', value: 'E'},
                  {text: 'Temporário', value: 'T'},
                  {text: 'Contratado', value: 'C'},
                ]"
                label="Categoria (obrigatório)"
                v-model="formData.categoria"
                :rules="[v => !!v || 'Categoria obrigatória']"
                @change="salvarEmCache"
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
                        @blur="salvarEmCache"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :md="3">
                      <v-text-field
                        :hide-details="'auto'"
                        type="number"
                        label="Ano de Formação"
                        v-model="formData.especialidade[eidx].ano_formatura"
                        @blur="salvarEmCache"
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
                        @blur="salvarEmCache"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :md="1" @click="formData.especialidade.splice(eidx, 1);salvarEmCache()">
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
                @click="proximoPasso('formPt4',5)"
              >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>

      <!--  Candidatura -->
      <v-stepper-step step="5" color="#007970">
        Candidatura
        <small v-if="step == 5">Descrição de dados preenchidos</small>
      </v-stepper-step>
      <v-stepper-content step="5">
        <!-- Faturamento, CNPJ, Unidade, Equipe -->
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
              @change="salvarEmCache"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="3" v-if="formData.faturamento == 'PJ'">
            <v-text-field
              :hide-details="'auto'"
              label="CNPJ"
              v-model="formData.cnpj"
              v-mask="['##.###.###/####-##']"
              @blur="salvarEmCache"
            />
          </v-col>
          
          <v-col cols="12" :xs="12" :md="3">
            <v-select
              :hide-details="'auto'"
              item-text="nome"
              item-value="id"
              :items="unidades"
              v-model="formData.unidade_id"
              label="Unidade"
              @change="salvarEmCache"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="3">
            <v-text-field
              :hide-details="'auto'"
              label="Equipe"
              v-model="formData.equipe_id"
              disabled
              @change="salvarEmCache"
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
              @click="enviarDados"
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
const MODALV = '0.0.1' // Versão dos dados no modal, caso seja diferente da versao salva no PC do usuario nao vai carregar dados anteriores
export default {
  layout: 'cmedico',
  directives: {mask},
  data () {
    return {
      step: 1,
      formData: {
        nome: null,
        email: null,
        senha: null,
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
        dt_inscricao_crm: null,
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
      menuDataCrm: false,
      unidades: [],
      senhaVisivel: false
    }
  },
  async asyncData({ app }) {
    let data = {
      unidades: []
    }
    await app.$axios.get(`/unidade`).then(res => {
      data.unidades = res.data
    }).catch(err => {
      console.log(err.response)
    })
    return data
  },
  mounted(){
    const ULTIMAV = localStorage.getItem('corpoclinico-medico-version')
    // Retomar dados inseridos sem salvar
    if(ULTIMAV === MODALV) {
      const DADOS = localStorage.getItem('corpoclinico-medico')
      try{
        if(DADOS) {
          const JSONDADOS = JSON.parse(DADOS)
          this.formData = JSONDADOS
        }
      } catch(e){}
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
          this.salvarEmCache()
        })
        .catch(err => {
          console.log(err)
          this.salvarEmCache()
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
    },
    proximoPasso(formNome, step){
      if(this.$refs[formNome].validate()){
        this.step = step
      }
    },
    enviarDados(){
      let info = JSON.parse(JSON.stringify(this.formData))
      info.celular = info.celular.replace(/\D/g,'')
      info.cnpj = info.cnpj.replace(/\D/g,'')
      info.regiao = info.crm.substr(info.crm.length - 2)
      info.crm = info.crm.substr(0, info.crm.length - 3)
      info.titulo_eleitoral = info.titulo_eleitoral.replace(/ /g,'')
      console.log(info)
      this.$axios
        .post('/medico', info)
        .then(res => {
          console.log(res)
        }) .catch(err => {
          console.log(err.response)
        })
    },
    salvarEmCache(){
      localStorage.setItem('corpoclinico-medico-version', MODALV)
      localStorage.setItem('corpoclinico-medico', JSON.stringify(this.formData))
    },
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