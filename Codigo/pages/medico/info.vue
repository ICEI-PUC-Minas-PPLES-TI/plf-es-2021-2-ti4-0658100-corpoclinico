<template>
  <div class="info-container">
    <v-row>
      <v-col class="info-title">
        <h4>
          Minha Ficha
          <v-btn class="float-right" text @click="logout">
            <v-icon>
              mdi-logout
            </v-icon>
            Sair
          </v-btn>
        </h4>
      </v-col>
    </v-row>
    <div v-if="info">
      <!-- Retorno -->
      <v-row v-if="retorno">
        <v-col>
          <v-alert
            text
            :type="retorno.status == 'R' ? 'error' : retorno.status == 'P' ? 'info': 'success'"
          >
            <span v-if="retorno.status == 'R'">
              Candidatura Recusada
              <p>
                Comentários:
              </p>
              <ul v-for="(r, ridx) in retorno.result" :key="ridx">
                <li>{{r.comentario }}</li>
              </ul>
              <br>
              <p>
                Para corrigir seus dados, aperte no botão editar que aparece ao lado direito de cada seção.
              </p>
              <p>
                Ao final da página você encontra um botão para reenviar sua candidatura para avaliação
              </p>
            </span>
            <span v-else-if="retorno.status == 'P'">
              Candidatura em análise, entre novamente mais tarde para obter o resultado
            </span>
            <span v-else-if="retorno.status == 'A'">
              Candidatura aprovada
              <p>
                Para prosseguir, 
                <router-link to="/treinamento">
                  clique aqui
                </router-link>
                para assistir os vídeos de treinamento
              </p>
            </span>
          </v-alert>
        </v-col>
      </v-row>
      <!-- Troca de Senha -->
      <v-row>
        <v-col class="info-subtitle">
          <span>
            Troca de Senha
            <small v-if="!formTrocaSenha" class="float-right info-editbutton" @click="formTrocaSenha = true">
              Trocar
            </small>
          </span>
        </v-col>
      </v-row>
      <v-row v-if="formTrocaSenha">
        <v-col cols="12" :sm="12" :md="4">
          <span class="info-label">Nova Senha</span>
          <v-text-field :hide-details="'auto'" type="password" v-model="formSenha.senha" :rules="[v => !!v || 'Senha é obrigatório', v => (v && v.length >= 8) || 'Min 8 caracteres']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="4">
          <span class="info-label">Confirmar Senha</span>
          <v-text-field :hide-details="'auto'" type="password" v-model="formSenha.confirmarSenha" :rules="[v => !!v || 'É obrigatório confirmar a senha', passwordConfirmationRule]" />
        </v-col>
        <v-col :cols="12" :sm="12">
          <v-btn color="primary" block @click="atualizaDados(formSenha); formTrocaSenha=false;clearSenha()">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
      <!-- Informações Básicas -->
      <v-row>
        <v-col class="info-subtitle">
          <span>
            Informações Básicas
            <small v-if="!editBasico" class="float-right info-editbutton" @click="editBasicoBtn">
              Editar
            </small>
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" :sm="12" :md="4">
          <span class="info-label">Nome</span>
          <span v-if="!editBasico">{{ info.usuario.nome }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formBasico.nome" :rules="[v => !!v || 'Nome é obrigatório']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">CPF</span>
          <span v-if="!editBasico">{{ info.cpf }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formBasico.cpf" v-mask="['###.###.###-##']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="2">
          <span class="info-label">Telefone</span>
          <span v-if="!editBasico">{{ info.celular }}</span>
          <v-text-field
            v-else
            :hide-details="'auto'"
            v-model="formBasico.celular"
            v-mask="['(##) ####-####', '(##) #####-####']"
            :rules="[v => !!v || 'Telefone Celular obrigatório', v => (v && v.length >= 14) || 'Telefone inválido',]"  
          />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Cartão do SUS</span>
          <span v-if="!editBasico">{{ info.cartao_sus }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formBasico.cartao_sus" :rules="[v => !!v || 'Cartão do Sus obrigatório']" maxlength="15" />
        </v-col>
        <v-col cols="12" :sm="12" :md="4">
          <span class="info-label">E-mail</span>
          <span v-if="!editBasico">{{ info.usuario.email }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formBasico.email" :rules="[v => !!v || 'E-mail obrigatório', v => /.+@.+\..+/.test(v) || 'E-mail inválido',]" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Data de Nascimento</span>
          <span v-if="!editBasico">{{ formataData(info.dt_nascimento) }}</span>
          <v-menu
            v-if="formBasico && editBasico"
            v-model="menuNascimento"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formBasico.dt_nascimento"
                hide-details="auto"
                type="date"
                max="3000-01-01"
                class="info-date"
              >
                <span slot="append">
                  <v-icon v-bind="attrs" v-on="on">
                    mdi-calendar
                  </v-icon>
                </span>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="formBasico.dt_nascimento"
              @input="menuNascimento = false;"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" :sm="12" :md="2">
          <span class="info-label">Titulo de Eleitor</span>
          <span v-if="!editBasico">{{ info.titulo_eleitoral }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formBasico.titulo_eleitoral" v-mask="['#### #### ####']" :rules="[v => !!v || 'Título obrigatório']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Zona e Seção Eleitoral</span>
          <span v-if="!editBasico">{{ info.zona }} - {{ info.secao }}</span>
          <v-row v-else>
            <v-col><v-text-field :hide-details="'auto'" v-model="formBasico.zona" maxlength="3" :rules="[v => !!v || 'Zona obrigatória']" /></v-col>
            <v-col><v-text-field :hide-details="'auto'" v-model="formBasico.secao" maxlength="4" :rules="[v => !!v || 'Seção obrigatória']" /></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" :sm="12" :md="4">
          <span class="info-label">RG</span>
          <span v-if="!editBasico">{{ info.rg }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formBasico.rg" :rules="[v => !!v || 'RG obrigatório']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Orgão Emissor</span>
          <span v-if="!editBasico">{{ info.rg_orgao_emissor }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formBasico.rg_orgao_emissor" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Data de Emissão do RG</span>
          <span v-if="!editBasico">{{ formataData(info.rg_data_emissao) }}</span>
          <v-menu
            v-if="formBasico && editBasico"
            v-model="menuEmissao"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formBasico.rg_data_emissao"
                hide-details="auto"
                label="Data de Emissão"
                type="date"
                max="3000-01-01"
                class="info-date"
              >
                <span slot="append">
                  <v-icon v-bind="attrs" v-on="on">
                    mdi-calendar
                  </v-icon>
                </span>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="formBasico.rg_data_emissao"
              @input="menuEmissao = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col v-if="editBasico" cols="12" :xs="12" :sm="6" :md="3">
          <v-file-input
            accept="image/*"
            label="Doc. RG (Frente e Verso)"
            :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
            @change="carregaArquivo($event, 'doc_rg')"
          />
        </v-col>
        <v-col v-if="editBasico" cols="12" :xs="12" :sm="6" :md="3">
          <v-file-input
            accept="image/*"
            label="Doc. CPF"
            :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
            @change="carregaArquivo($event, 'doc_cpf')"
          />
        </v-col>
        <v-col v-if="editBasico" cols="12" :xs="12" :sm="6" :md="3">
          <v-file-input
            accept="image/*"
            label="Foto 3x4"
            :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
            @change="carregaArquivo($event, 'doc_foto_txq')"
          />
        </v-col>
        <v-col v-if="editBasico" :cols="12" :sm="12">
          <v-btn color="primary" block @click="atualizaDados(formBasico); editBasico=false">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
      <!-- Informações de Moradia -->
      <v-row>
        <v-col class="info-subtitle">
          <span>
            Informações de Moradia
            <small v-if="!editMoradia" class="float-right info-editbutton" @click="editMoradiaBtn">
              Editar
            </small>
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">CEP</span>
          <span v-if="!editMoradia">{{ info.cep }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formMoradia.cep" :rules="[v => !!v || 'CEP obrigatório']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Logradouro</span>
          <span v-if="!editMoradia">{{ info.logradouro }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formMoradia.logradouro" maxlength="100" :rules="[v => !!v || 'Logradouro obrigatório']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Número</span>
          <span v-if="!editMoradia">{{ info.numero }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formMoradia.numero" maxlength="20" :rules="[v => !!v || 'Número obrigatório']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Complemento</span>
          <span v-if="!editMoradia">{{ info.complemento ? info.complemento : 'Não informado' }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formMoradia.complemento" maxlength="20" :rules="[v => !!v || 'CEP obrigatório']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Estado</span>
          <span v-if="!editMoradia">{{ info.estado }}</span>
          <v-select
            v-else
            :hide-details="'auto'"
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
            v-model="formMoradia.estado"
            :rules="[v => !!v || 'Estado obrigatório']"
          />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Cidade</span>
          <span v-if="!editMoradia">{{ info.cidade }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formMoradia.cidade" maxlength="100" :rules="[v => !!v || 'Cidade obrigatório']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Bairro</span>
          <span v-if="!editMoradia">{{ info.bairro }}</span>
          <v-text-field v-else :hide-details="'auto'" v-model="formMoradia.bairro" maxlength="45" :rules="[v => !!v || 'Bairro obrigatório']" />
        </v-col>
        <v-col v-if="editMoradia" cols="12" :xs="12" :md="3">
          <v-file-input
            accept="image/*"
            label="Comp. de Endereço"
            :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
            @change="carregaArquivo($event, 'doc_comp_ender')"
          />
        </v-col>
        <v-col v-if="editMoradia" :cols="12" :sm="12">
          <v-btn color="primary" block @click="atualizaDados(formMoradia); editMoradia=false">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
      <!-- Dados Acadêmicos -->
      <v-row>
        <v-col class="info-subtitle">
          <span>
            Dados Acadêmicos
            <small v-if="!editAcademico" class="float-right info-editbutton" @click="editAcademicoBtn">
              Editar
            </small>
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Nível de Escolaridade</span>
          <span v-if="!editAcademico"> {{ escolaridade }} </span>
          <v-select
            v-else
            :items="[
              {text: 'Graduação', value: 'BACHA'},
              {text: 'Pós Graduação', value: 'ESPE'},
              {text: 'Mestrado', value: 'MESTRE'},
              {text: 'Doutorado', value: 'DOUTOR'},
            ]"
            v-model="formAcademico.escolaridade_max"
            :rules="[v => !!v || 'Nível de Escolaridade obrigatório']"
          />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Sociedade Cientifica</span>
          <span v-if="!editAcademico"> {{ info.sociedade_cientifica ? info.sociedade_cientifica : 'Não informado' }} </span>
          <v-text-field v-else :hide-details="'auto'" v-model="formAcademico.sociedade_cientifica" maxlength="100">
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
        <v-col cols="12" :sm="12">
          <p>Formações</p>
          <ul v-if="!editAcademico">
            <li v-for="(fo, fidx) in info.formacoes" :key="fidx">
              {{ fo.faculdade_nome }} - Formado em {{ fo.faculdade_ano_formatura }}
            </li>
          </ul>
          <ul v-else>
            <li v-for="(forma, fidx) in formAcademico.formacoes" :key="fidx">
              <v-row>
                <v-col cols="12" :xs="12" :md="6">
                  <v-text-field
                    :hide-details="'auto'"
                    label="Nome Faculdade"
                    maxlength="60"
                    v-model="formAcademico.formacoes[fidx].faculdade_nome"
                  />
                </v-col>
                <v-col cols="12" :xs="12" :sm="6" :md="2">
                  <v-file-input
                    accept="image/*"
                    label="Certificado"
                    :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
                    @change="carregaArquivo($event, 'docs_cert_form', false);formAcademico.formacoes[fidx].arquivo_id=null"
                  />
                </v-col>
                <v-col cols="12" :xs="12" :sm="6" :md="3">
                  <v-text-field
                    :hide-details="'auto'"
                    type="number"
                    label="Ano de Formação"
                    v-model="formAcademico.formacoes[fidx].faculdade_ano_formatura"
                  />
                </v-col>
                <v-col cols="12" :xs="12" :md="1" v-if="fidx > 0" @click="formAcademico.formacoes.splice(fidx, 1);">
                  <v-btn icon class="mt-3">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </li>
            <li>
              <v-btn text @click="adicionarFormacao">
                Adicionar Formação
              </v-btn>
            </li>
          </ul>
        </v-col>
        <v-col v-if="editAcademico" :cols="12" :sm="12">
          <v-btn color="primary" block @click="atualizaDados(formAcademico); editAcademico=false">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
      <!-- Dados Profissionais -->
      <v-row>
        <v-col class="info-subtitle">
          <span>
            Dados Profissionais
            <small v-if="!editProfissional" class="float-right info-editbutton" @click="editProfissionalBtn">
              Editar
            </small>
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" :sm="12" :md="4">
          <span class="info-label">CRM</span>
          <span v-if="!editProfissional">{{ info.crm }}</span>
          <v-text-field
            v-else
            :hide-details="'auto'"
            maxlength="20"
            v-model="formProfissional.crm"
            :rules="[v => !!v || 'CRM obrigatório']"
          />
        </v-col>
        <v-col cols="12" :sm="12" :md="4">
          <span class="info-label">Data de Inscrição do CRM</span>
          <span v-if="!editProfissional">{{ formataData(info.dt_inscricao_crm) }}</span>
          <v-menu
            v-if="formProfissional && editProfissional"
            v-model="menuDataCrm"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formProfissional.dt_inscricao_crm"
                hide-details="auto"
                type="date"
                max="3000-01-01"
                class="info-date"
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
              v-model="formProfissional.dt_inscricao_crm"
              @input="menuDataCrm = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" :sm="12" :md="4">
          <span class="info-label">Categoria</span>
          <span v-if="!editProfissional">{{ categoria }}</span>
          <v-select
            v-else
            :items="[
              {text: 'Efetivo', value: 'E'},
              {text: 'Temporário', value: 'T'},
              {text: 'Contratado', value: 'C'},
            ]"
            v-model="formProfissional.categoria"
            :rules="[v => !!v || 'Categoria obrigatória']"
        />
        </v-col>
        <v-col cols="12" :sm="12">
          <p>Especialidades</p>
          <ul v-if="!editProfissional">
            <li v-for="(ep, eidx) in info.especialidades" :key="eidx">
              {{ ep.instituicao }}, RQE: {{ ep.rqe }} - Formado em {{ ep.ano_formatura }}
            </li>
          </ul>
          <ul v-else>
            <li v-for="(espe, eidx) in formProfissional.especialidades" :key="eidx">
              <v-row>
                <v-col :sm="12" :md="2">
                  <v-select
                    :hide-details="'auto'"
                    item-text="identificacao"
                    item-value="id"
                    :items="formProfissionalEspecialidade"
                    v-model="formProfissional.especialidades[eidx].especialidade_id"
                    label="Especialidade"
                  />
                </v-col>
                <v-col cols="12" :xs="12" :md="3">
                  <v-text-field
                    :hide-details="'auto'"
                    label="Instituicao"
                    v-model="formProfissional.especialidades[eidx].instituicao"
                    maxlength="60"
                  />
                </v-col>
                <v-col cols="12" :xs="12" :md="2">
                  <v-text-field
                    :hide-details="'auto'"
                    type="number"
                    label="Ano de Formação"
                    v-model="formProfissional.especialidades[eidx].ano_formatura"
                  />
                </v-col>
                <v-col cols="12" :xs="12" :md="2">
                  <v-file-input
                    accept="image/*"
                    label="Certificado"
                    :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
                    @change="carregaArquivo($event, 'docs_cert_espec', false);formProfissional.especialidades[eidx].arquivo_id=null"
                  />
                </v-col>
                <v-col cols="12" :xs="12" :md="2">
                  <v-text-field
                    :hide-details="'auto'"
                    type="number"
                    label="Nº RQE"
                    maxlength="20"
                    v-model="formProfissional.especialidades[eidx].rqe"
                  />
                </v-col>
                <v-col cols="12" :xs="12" :md="1" @click="formProfissional.especialidades.splice(eidx, 1)">
                  <v-btn icon class="mt-3">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </li>
            <li>
              <v-btn text @click="adicionarEspecialidade">
                Adicionar {{ formProfissional.especialidades.length > 0 ? 'outra': '' }} especialidade
              </v-btn>
            </li>
          </ul>
        </v-col>
        <v-col v-if="editProfissional" :cols="12" :sm="12">
          <v-btn color="primary" block @click="atualizaDados(formProfissional); editProfissional=false">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
      <!-- Candidatura -->
      <v-row>
        <v-col class="info-subtitle">
          <span>
            Candidatura
            <small v-if="!editCandidatura" class="float-right info-editbutton" @click="editCandidaturaBtn">
              Editar
            </small>
          </span>
        </v-col>
      </v-row>
      <v-row v-for="(cand, cidx) in info.candidatura" :key="cidx">
        <v-col cols="12" :sm="12" :md="2">
          <span class="info-label">Faturamento</span>
          <span v-if="!editCandidatura"> {{ cand.faturamento == 'C' ? 'Cooperado': 'Pessoa Jurídica' }} </span>
          <v-select
            v-else
            :hide-details="'auto'"
            :items="[
              {text: 'Pessoa Juridica', value: 'PJ'},
              {text: 'Cooperado', value: 'C'}
            ]"
            v-model="formCandidatura.candidaturas[cidx].faturamento"
          />
        </v-col>
        <v-col v-if="cand.faturamento == 'PJ' || (editCandidatura && formCandidatura.candidaturas[cidx].faturamento == 'PJ') " cols="12" :sm="12" :md="3">
          <span class="info-label">CNPJ</span>
          <span v-if="!editCandidatura"> {{ cand.cnpj }} </span>
          <v-text-field v-else :hide-details="'auto'" v-model="formCandidatura.candidaturas[cidx].cnpj" v-mask="['##.###.###/####-##']" />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Unidade</span>
          <span v-if="!editCandidatura"> {{ cand.unidade.nome }} </span>
          <v-select
            v-else
            :hide-details="'auto'"
            item-text="nome"
            item-value="id"
            :items="formCandidaturaUnidade"
            v-model="formCandidatura.candidaturas[cidx].unidade_id"
          />
        </v-col>
        <v-col cols="12" :sm="12" :md="3">
          <span class="info-label">Equipe</span>
          <span v-if="!editCandidatura"> {{ cand.equipe.nome }} </span>
          <v-select
            v-else
            :hide-details="'auto'"
            item-text="nome"
            item-value="id"
            :items="formCandidaturaEquipe"
            v-model="formCandidatura.candidaturas[cidx].equipe_id"
          />
        </v-col>
        <v-col v-if="editCandidatura && formCandidatura.candidaturas[cidx].removable" :sm="12" :md="1" @click="formCandidatura.candidaturas.splice(cidx, 1)">
          <v-btn icon class="mt-3">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="editCandidatura">
        <v-col>
          <v-btn text @click="adicionarCandidatura">
            Adicionar mais uma candidatura
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="editCandidatura" cols="12" :xs="12" :md="4">
          <v-file-input
            accept="image/*"
            label="Cert. Quitação CRMMG"
            :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
            @change="carregaArquivo($event, 'doc_cert_quit_crmmg')"
          />
        </v-col>
        <v-col v-if="editCandidatura" cols="12" :xs="12" :md="4">
          <v-file-input
            accept="image/*"
            label="Termo de Vigilância"
            :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
            @change="carregaArquivo($event, 'doc_term_vigi')"
          />
        </v-col>
        <v-col v-if="editCandidatura" cols="12" :xs="12" :md="4">
          <v-file-input
            accept="image/*"
            label="Termo de Compromisso"
            :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
            @change="carregaArquivo($event, 'doc_term_compr')"
          />
        </v-col>
        <v-col v-if="editCandidatura" :cols="12" :sm="12">
          <v-btn color="primary" block @click="atualizaDados(formCandidatura); editCandidatura=false">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
      <br>
      <v-row v-if="retorno && retorno.status == 'R'">
        <v-col>
          <v-btn color="info" block @click="review">
            Reenviar candidatura
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'
const Swal = require('sweetalert2')
export default {
  layout: 'cmedico',
  directives: {mask},
  data(){
    return {
      info: null,
      formBasico: null,
      editBasico: false,
      menuNascimento: false,
      menuEmissao: false,
      editMoradia: false,
      formMoradia: null,
      editCandidatura: false,
      formCandidatura: [],
      formCandidaturaEquipe: [],
      formCandidaturaUnidade: [],
      formProfissionalEspecialidade: [],
      editAcademico: false,
      formAcademico: null,
      editProfissional: false,
      formProfissional: null,
      menuDataCrm: false,
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
      formTrocaSenha: false,
      formSenha: {
        senha: null,
        confirmarSenha: null,
      }
    }
  },
  async asyncData({ params, app }) {
    let data = {
      info: null
    }
    await app.$axios
      .get(`/me`)
      .then(res => {
        data.info = res.data
      }).catch(err => {
        console.log('err', err.response)
      })

    return data
  },
  computed: {
    escolaridade(){
      if(this.info) {
        const es = this.info.escolaridade_max
        if(es == 'BACHA')
          return 'Graduação'
        else if(es == 'ESPE')
          return 'Pós Graduação'
        else if(es == 'MESTRE')
          return 'Mestrado'
        else if(es == 'DOUTOR')
          return 'Doutorado'
      }
    },
    categoria(){
      if(this.info){
        const ct = this.info.categoria
        if(ct == 'T')
          return 'Temporário'
        else if(ct == 'E')
          return 'Efetivo'
        else if(ct == 'C')
          return 'Contratado'
      }
    },
    retorno(){
      if(this.info){
        if(this.info.candidatura){
          let res = {
            status: null,
            result: []
          }
          this.info.candidatura.forEach((candidatura) => {
            const denied = candidatura.retornos.filter((f) => {
              return f.status == 'R'
            })
            if(denied.length > 0){
              res.status = 'R'
              res.result = res.result.concat(denied)
            }
          })
          if(!res.status)
            this.info.candidatura.forEach((candidatura) => {
              const pending = candidatura.retornos.filter((f) => {
                return f.status == 'P'
              })
              if(pending.length > 0){
                res.status = 'P'
                res.result = []
              }
            })

          if(!res.status)
            this.info.candidatura.forEach((candidatura) => {
              const approved = candidatura.retornos.filter((f) => {
                return f.status == 'A'
              })
              if(approved.length == candidatura.retornos.length){
                res.status = 'A'
                res.result = []
              }
            })

          if(res.status)
            return res
          else
            return null
        } else 
          return null
        
      } else return null
    },
    passwordConfirmationRule() {
      return () => (this.formSenha.senha === this.formSenha.confirmarSenha) || 'Senhas não coincidem'
    }
  },
  methods: {
    reloadDados(){
      this.$axios
        .get(`/me`)
        .then(res => {
          this.info = res.data
        }).catch(err => {
          console.log('err', err.response)
        })
    },
    formataData(data) {
      if (!data) return null;
      const [year, month, day] = data.split("-");
      return `${day}/${month}/${year}`;
    },
    editBasicoBtn(){
      this.formBasico = {
        nome: this.info.usuario.nome,
        email: this.info.usuario.email,
        celular: this.info.celular,
        cpf: this.info.cpf,
        dt_nascimento: this.info.dt_nascimento,
        rg: this.info.rg,
        rg_orgao_emissor: this.info.rg_orgao_emissor,
        rg_data_emissao: this.info.rg_data_emissao,
        rg_estado: this.info.rg_estado,
        titulo_eleitoral: this.info.titulo_eleitoral,
        zona: this.info.zona,
        secao: this.info.secao,
        cartao_sus: this.info.cartao_sus
      }
      this.editBasico = true
    },
    editMoradiaBtn(){
      this.formMoradia = {
        cep: this.info.cep,
        logradouro: this.info.logradouro,
        numero: this.info.numero,
        complemento: this.info.complemento,
        estado: this.info.estado,
        cidade: this.info.cidade,
        bairro: this.info.bairro
      }
      this.editMoradia = true
    },
    editCandidaturaBtn(){
      this.$axios.get(`/unidade`).then(res => {
        this.formCandidaturaUnidade = res.data
      }).catch(err => {
        console.log(err.response)
      })

      this.$axios.get(`/equipe`).then(res => {
        this.formCandidaturaEquipe = res.data.dados
      }).catch(err => {
        console.log(err.response)
      })
      
      this.formCandidatura = {
        candidaturas: this.info.candidatura
      }
      this.editCandidatura = true
    },
    editAcademicoBtn(){
      this.formAcademico = {
        sociedade_cientifica: this.info.sociedade_cientifica,
        escolaridade_max: this.info.escolaridade_max,
        formacoes: this.info.formacoes,
      }
      this.editAcademico = true
    },
    adicionarFormacao(){
      this.formAcademico.formacoes.push({
        faculdade_nome: null,
        faculdade_ano_formatura: null,
      })
    },
    adicionarCandidatura(){
      this.formCandidatura.candidaturas.push({
        equipe_id: null,
        unidade_id: null,
        faturamento: null,
        cnpj: null,
        removable: true,
        retornos: []
      })
    },
    editProfissionalBtn(){
      this.$axios.get(`/especialidade`).then(res => {
        this.formProfissionalEspecialidade = res.data.dados
      }).catch(err => {
        console.log(err.response)
      })
      
      this.formProfissional = {
        regiao: this.info.regiao,
        crm: this.info.crm,
        dt_inscricao_crm: this.info.dt_inscricao_crm,
        categoria: this.info.categoria,
        especialidades: this.info.especialidades
      }
      this.editProfissional = true
    },
    adicionarEspecialidade(){
      if(this.formProfissional)
        this.formProfissional.especialidades.push({
          instituicao: null,
          ano_formatura: null,
          rqe: null,
        })
    },
    atualizaDados(data){
      if(data.celular)
        data.celular = data.celular.replace(/\D/g,'')
      if(data.titulo_eleitoral)
        data.titulo_eleitoral = data.titulo_eleitoral.replace(/ /g,'')
      if(data.cnpj)
        data.cnpj = data.cnpj.replace(/\D/g,'')

      let formData = new FormData()
      for (var key in data){
        if(Array.isArray(data[key])) {
          formData.append(key, JSON.stringify(data[key]))
        } else
          formData.append(key, data[key])
      }

      for (var key in this.arquivos) {
        if(Array.isArray(this.arquivos[key])) {
          for(let i=0; i<this.arquivos[key].length; i++) {
            formData.append(key, this.arquivos[key][i])
          }
        } else if(this.arquivos[key])
          formData.append(key, this.arquivos[key])
      }
      
      this.$axios
        .put('/medico/'+this.info.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.reloadDados()
          Swal.fire({
            title: 'Dados atualizados!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        }) .catch(err => {
          console.log(err.response)
          Swal.fire({
            title: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    },
    carregaArquivo(ev, nome, unico=true){
      if(unico)
        this.arquivos[nome] = ev
      else
        this.arquivos[nome].push(ev)
      
    },
    clearSenha(){
      this.formSenha = {
        senha: null,
        confirmarSenha: null,
      }
    },
    review(){
      Swal.fire({
        title: 'Tem certeza que deseja reenviar os dados da candidatura ?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.post('/retorno/review')
            .then(() => {
              Swal.fire('Candidatura reenviada', '', 'success')
              this.reloadDados()
            })
        }
      })
    },
    logout(){
      this.$store.dispatch('login/userLogout', {
        router: this.$router
      })
    }
  }
}
</script>

<style lang="scss">
.info{
  &-container{
    background: #fff;
  }
  &-label{
    display: block;
    color: #9B9B9B;
    font-size: .8rem;
  }
  &-subtitle{
    span{
      display: block;
      color: #525050;
      border-bottom: 2px solid #C2C2C2;
    }
  }
  &-title{
    h4{
      font-size: 1.1rem;
    }
  }
  &-editbutton{
    color: #686868;
    &:hover{
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &-date input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
}
</style>