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
        <small v-if="step == 1">Informações Pessoais</small>
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
                maxlength="120"
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
                type="tel"
                v-model="formData.celular"
                v-mask="['(##) ####-####', '(##) #####-####']"
                label="Telefone Celular (obrigatório)"
                :rules="[v => !!v || 'Telefone Celular obrigatório', v => (v && v.length >= 14) || 'Telefone inválido',]"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="5">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.email"
                label="E-mail (obrigatório)"
                type="email"
                maxlength="100"
                :rules="[v => !!v || 'E-mail obrigatório', v => /.+@.+\..+/.test(v) || 'E-mail inválido',]"
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
            <v-col cols="12" :sm="12" :md="2">
              <v-select
                item-text="sigla"
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
                label="UF do RG (obrigatório)"
                v-model="formData.rg_estado"
                :rules="[v => !!v || 'Estado do RG obrigatório']"
                @change="salvarEmCache"
              ></v-select>
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="3">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.rg"
                :rules="[v => !!v || 'RG obrigatório']"
                label="RG (obrigatório)"
                maxlength="11"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="4">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.rg_orgao_emissor"
                label="Orgão Emissor"
                maxlength="30"
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
                :rules="[v => !!v || 'Senha é obrigatório', v => (v && v.length >= 8) || 'Min 8 caracteres']"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="3">
              <v-file-input
                accept="image/*"
                label="Doc. RG (Frente e Verso)"
                :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',v => !!v || 'Doc RG obrigatório']"
                @change="carregaArquivo($event, 'doc_rg')"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="3">
              <v-file-input
                accept="image/*"
                label="Doc. CPF"
                :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',v => !!v || 'Doc CPF obrigatório']"
                @change="carregaArquivo($event, 'doc_cpf')"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="3">
              <v-file-input
                accept="image/*"
                label="Foto 3x4"
                :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',v => !!v || 'Foto 3x4 obrigatório']"
                @change="carregaArquivo($event, 'doc_foto_txq')"
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
                maxlength="100"
                :rules="[v => !!v || 'Logradouro obrigatório']"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="2">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.numero"
                label="Número (obrigatório)"
                maxlength="20"
                :rules="[v => !!v || 'Número obrigatório']"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :sm="6" :md="2">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.complemento"
                label="Complemento"
                maxlength="20"
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
                maxlength="100"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :md="4">
              <v-text-field
                :hide-details="'auto'"
                v-model="formData.bairro"
                label="Bairro (obrigatório)"
                maxlength="45"
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
                :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',v => !!v || 'Comp. de Endereço obrigatório']"
                @change="carregaArquivo($event, 'doc_comp_ender')"
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
                maxlength="100"
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
                <li v-for="(forma, fidx) in formData.formacoes" :key="fidx">
                  <v-row>
                    <v-col cols="12" :xs="12" :md="6">
                      <v-text-field
                        :hide-details="'auto'"
                        label="Nome Faculdade"
                        maxlength="60"
                        v-model="formData.formacoes[fidx].faculdade_nome"
                        @blur="salvarEmCache"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :sm="6" :md="2">
                      <v-file-input
                        accept="image/*"
                        label="Certificado"
                        :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',v => !!v || 'Certificado obrigatório']"
                        @change="carregaArquivo($event, 'docs_cert_form', false)"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :sm="6" :md="3">
                      <v-text-field
                        :hide-details="'auto'"
                        type="number"
                        label="Ano de Formação"
                        v-model="formData.formacoes[fidx].faculdade_ano_formatura"
                        @blur="salvarEmCache"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :md="1" v-if="fidx > 0" @click="formData.formacoes.splice(fidx, 1);salvarEmCache()">
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
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-form
          ref="formPt4"
          lazy-validation
        >
          <!-- CRM, Categoria -->
          <v-row>
            <v-col cols="12" :md="2">
              <v-select
                item-text="sigla"
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
                label="Região do CRM (obrigatório)"
                v-model="formData.regiao"
                :rules="[v => !!v || 'Estado do CRM obrigatório']"
                @change="salvarEmCache"
              ></v-select>
            </v-col>
            <v-col cols="12" :xs="12" :md="3">
              <v-text-field
                :hide-details="'auto'"
                label="CRM (obrigatório)"
                maxlength="20"
                v-model="formData.crm"
                :rules="[v => !!v || 'CRM obrigatório']"
                @blur="salvarEmCache"
              />
            </v-col>
            <v-col cols="12" :xs="12" :md="2">
              <v-file-input
                accept="image/*"
                :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',v => !!v || 'Doc. CRM obrigatório']"
                label="Doc. CRM"
                @change="carregaArquivo($event, 'doc_crm')"
              />
            </v-col>
            <v-col :cols="12" :md="2">
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
                <li v-for="(espe, eidx) in formData.especialidades" :key="eidx">
                  <v-row>
                    <v-col :xs="12" :md="2">
                      <v-select
                        :hide-details="'auto'"
                        item-text="identificacao"
                        item-value="id"
                        :items="especialidades"
                        v-model="formData.especialidades[eidx].especialidade_id"
                        label="Especialidade"
                        @change="salvarEmCache"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :md="3">
                      <v-text-field
                        :hide-details="'auto'"
                        label="Instituicao"
                        v-model="formData.especialidades[eidx].instituicao"
                        maxlength="60"
                        @blur="salvarEmCache"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :md="2">
                      <v-text-field
                        :hide-details="'auto'"
                        type="number"
                        label="Ano de Formação"
                        v-model="formData.especialidades[eidx].ano_formatura"
                        @blur="salvarEmCache"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :md="2">
                      <v-file-input
                        accept="image/*"
                        label="Certificado"
                        :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',v => !!v || 'Certificado obrigatório']"
                        @change="carregaArquivo($event, 'docs_cert_espec', false)"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :md="2">
                      <v-text-field
                        :hide-details="'auto'"
                        type="number"
                        label="Nº RQE"
                        maxlength="20"
                        v-model="formData.especialidades[eidx].rqe"
                        @blur="salvarEmCache"
                      />
                    </v-col>
                    <v-col cols="12" :xs="12" :md="1" @click="formData.especialidades.splice(eidx, 1);salvarEmCache()">
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
                Adicionar {{ formData.especialidades.length > 0 ? 'outra': '' }} especialidade
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
      </v-stepper-step>
      <v-stepper-content step="5">
        <!-- Faturamento, CNPJ, Unidade, Equipe -->
        <v-row v-for="(ct, cidx) in formData.candidaturas" :key="cidx">
          <v-col cols="12" :xs="12" :md="formData.candidaturas[cidx].faturamento == 'PJ' ? 3: 6">
            <v-select
              :hide-details="'auto'"
              :items="[
                {text: 'Pessoa Juridica', value: 'PJ'},
                {text: 'Cooperado', value: 'C'}
              ]"
              v-model="formData.candidaturas[cidx].faturamento"
              label="Faturamento"
              @change="salvarEmCache"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="3" v-if="formData.candidaturas[cidx].faturamento == 'PJ'">
            <v-text-field
              :hide-details="'auto'"
              label="CNPJ"
              maxlength="14"
              v-model="formData.candidaturas[cidx].cnpj"
              v-mask="['##.###.###/####-##']"
              @blur="salvarEmCache"
            />
          </v-col>
          
          <v-col cols="12" :xs="12" :md="2">
            <v-select
              :hide-details="'auto'"
              item-text="nome"
              item-value="id"
              :items="unidades"
              v-model="formData.candidaturas[cidx].unidade_id"
              label="Unidade"
              @change="salvarEmCache"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="3">
            <v-select
              :hide-details="'auto'"
              item-text="nome"
              item-value="id"
              :items="equipes"
              v-model="formData.candidaturas[cidx].equipe_id"
              label="Equipe"
              @change="salvarEmCache"
            />
          </v-col>
          <v-col :xs="12" :md="1" v-if="cidx > 0">
            <v-btn icon class="mt-3" @click="formData.candidaturas.splice(cidx, 1);salvarEmCache()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn text @click="adicionarCandidatura">
              Adicionar outra candidatura
            </v-btn>
          </v-col>
        </v-row>
        <!-- Explicação e link de certificados -->
        <v-row>
          <v-col>
            <small class="text-muted">
              Os seguintes documentos devem ser assinados e anexados para a conclusão da candidatura:
            </small>
            <a href="/documentos.zip" download class="d-block">Link de Download</a>
          </v-col>
        </v-row>
        <!-- Certificado e Termos -->
        <v-row>
          <v-col cols="12" :xs="12" :md="4">
            <v-file-input
              accept="image/*"
              label="Cert. Quitação CRMMG"
              :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',v => !!v || 'Cert. Quitação obrigatório']"
              @change="carregaArquivo($event, 'doc_cert_quit_crmmg')"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="4">
            <v-file-input
              accept="image/*"
              label="Termo de Vigilância"
              :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',v => !!v || 'Termo obrigatório']"
              @change="carregaArquivo($event, 'doc_term_vigi')"
            />
          </v-col>
          <v-col cols="12" :xs="12" :md="4">
            <v-file-input
              accept="image/*"
              label="Termo de Compromisso"
              :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',v => !!v || 'Termo obrigatório']"
              @change="carregaArquivo($event, 'doc_term_compr')"
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
const Swal = require('sweetalert2')
const MODALV = '0.0.3' // Versão dos dados no modal, caso seja diferente da versao salva no PC do usuario nao vai carregar dados anteriores
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
        dt_nascimento: undefined,
        rg: null,
        rg_orgao_emissor: null,
        rg_data_emissao: undefined,
        rg_estado: null,
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
        regiao: null,
        crm: null,
        dt_inscricao_crm: null,
        categoria: null,
        formacoes: [{
          faculdade_nome: null,
          faculdade_ano_formatura: null,
        }],
        candidaturas: [{
          equipe_id: null,
          unidade_id: null,
          faturamento: null,
          cnpj: null,
        }],
        especialidades: []
      },
      arquivos: {
        doc_rg: null,
        doc_cpf: null,
        doc_foto_txq: null,
        doc_comp_ender: null,
        doc_crm: null,
        doc_cert_quit_crmmg: null,
        doc_term_vigi: null,
        doc_term_compr: null,
        docs_cert_espec: [],
        docs_cert_form: [],
      },
      menuNascimento: false,
      menuEmissao: false,
      menuDataCrm: false,
      unidades: [],
      equipes: [],
      especialidades: [],
      senhaVisivel: false
    }
  },
  async asyncData({ app }) {
    let data = {
      unidades: [],
      equipes: [],
      especialidades: [],
    }
    await app.$axios.get(`/unidade`).then(res => {
      data.unidades = res.data
    }).catch(err => {
      console.log(err.response)
    })

    await app.$axios.get(`/equipe`).then(res => {
      data.equipes = res.data.dados
    }).catch(err => {
      console.log(err.response)
    })

    await app.$axios.get(`/especialidade`).then(res => {
      data.especialidades = res.data.dados
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
            this.formData.logradouro = this.formData.logradouro || res.data.logradouro 
            this.formData.estado = this.formData.estado || res.data.uf
            this.formData.cidade = this.formData.cidade || res.data.localidade
            this.formData.bairro = this.formData.bairro || res.data.bairro
          }
          this.salvarEmCache()
        })
        .catch(err => {
          console.log(err)
          this.salvarEmCache()
        })
    },
    adicionarFormacao(){
      this.formData.formacoes.push({
        faculdade_nome: null,
        faculdade_ano_formatura: null,
      })
    },
    adicionarEspecialidade(){
      this.formData.especialidades.push({
        especialidade_id: null,
        instituicao: null,
        ano_formatura: null,
        rqe: null,
      })
    },
    adicionarCandidatura(){
      this.formData.candidaturas.push({
        equipe_id: null,
        unidade_id: null,
        faturamento: null,
        cnpj: null,
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
      info.cnpj = info.cnpj ? info.cnpj.replace(/\D/g,''): null
      info.rg = `${info.rg_estado}-${info.rg}`
      info.titulo_eleitoral = info.titulo_eleitoral.replace(/ /g,'')
    
      let formData = new FormData()
      for (var key in info){
        if(Array.isArray(info[key])) {
          formData.append(key, JSON.stringify(info[key]))
        } else
          formData.append(key, info[key])
      }

      for (var key in this.arquivos) {
        if(Array.isArray(this.arquivos[key])) {
          for(let i=0; i<this.arquivos[key].length; i++) {
            console.log(key)
            formData.append(key, this.arquivos[key][i])
          }
        } else if(this.arquivos[key])
          formData.append(key, this.arquivos[key])
      }
      
      this.$axios
        .post('/medico', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          Swal.fire({
            title: 'Cadastro concluido!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          localStorage.removeItem('corpoclinico-medico-version')
          localStorage.removeItem('corpoclinico-medico')
          window.location.href = '/login'
        }).catch(err => {
          console.log(err.response)
          Swal.fire({
            title: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    },
    salvarEmCache(){
      let info = JSON.parse(JSON.stringify(this.formData))
      info.senha = null
      localStorage.setItem('corpoclinico-medico-version', MODALV)
      localStorage.setItem('corpoclinico-medico', JSON.stringify(info))
    },
    carregaArquivo(ev, nome, unico=true){
      if(unico)
        this.arquivos[nome] = ev
      else{
        this.arquivos[nome].push(ev)
      }
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