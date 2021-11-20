//deixar inputs so pra leitura //mudar os selects para ipunt //datas so input

<template>
  <div>
    <h1>Avaliando Médico #{{ this.formData.id }}</h1>
    <v-form ref="formPt1" lazy-validation>
      <!-- Nome, CPF -->
      <v-row>
        <v-col cols="12" :xs="12" :sm="6" :md="9">
          <v-text-field
            :hide-details="'auto'"
            v-model="formData.nome"
            maxlength="120"
            label="Nome"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="3">
          <v-text-field
            :hide-details="'auto'"
            v-model="formData.cpf"
            v-mask="['###.###.###-##']"
            label="CPF"
            disabled
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
            label="Telefone Celular"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="5">
          <v-text-field
            :hide-details="'auto'"
            v-model="formData.email"
            label="E-mail"
            type="email"
            maxlength="100"
            disabled
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
                disabled
              >
                <span slot="append">
                  <v-icon v-bind="attrs" v-on="on"> mdi-calendar </v-icon>
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
            v-mask="{
              mask: 'AA-FFFFFFFFFFF',
              tokens: {
                F: {
                  pattern: /^[0-9]*\.?[0-9]*$/,
                },
                A: {
                  pattern: /[a-zA-Z]/,
                  transform: (v) => v.toLocaleUpperCase(),
                },
              },
            }"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="5">
          <v-text-field
            :hide-details="'auto'"
            v-model="formData.rg_orgao_emissor"
            label="Orgão Emissor"
            maxlength="30"
            disabled
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
                disabled
              >
                <span slot="append">
                  <v-icon v-bind="attrs" v-on="on"> mdi-calendar </v-icon>
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
            label="Título de Eleitor"
            v-model="formData.titulo_eleitoral"
            v-mask="['#### #### ####']"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="3">
          <v-text-field
            :hide-details="'auto'"
            label="Zona Eleitoral"
            v-model="formData.zona"
            maxlength="3"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="3">
          <v-text-field
            :hide-details="'auto'"
            label="Seção Eleitoral"
            v-model="formData.secao"
            maxlength="4"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="3">
          <v-text-field
            :hide-details="'auto'"
            label="Cartão do SUS"
            v-model="formData.cartao_sus"
            maxlength="15"
            disabled
          />
        </v-col>
      </v-row>
      <!-- Senha, Anexos -->
      <v-row>
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="4">
          <v-file-input
            accept="image/*"
            label="Doc. RG (Frente e Verso)"
            :rules="[
              (v) => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',
            ]"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="4">
          <v-file-input accept="image/*" label="Doc. CPF" disabled />
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="4">
          <v-file-input accept="image/*" label="Foto 3x4" disabled />
        </v-col>
      </v-row>
      <!-- CEP, Logradouro, Número, Complemento -->
      <v-row>
        <v-col cols="12" :xs="12" :md="3">
          <v-text-field
            :hide-details="'auto'"
            v-mask="'#####-###'"
            v-model="formData.cep"
            label="CEP"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :md="5">
          <v-text-field
            :hide-details="'auto'"
            v-model="formData.logradouro"
            label="Logradouro"
            maxlength="100"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="2">
          <v-text-field
            :hide-details="'auto'"
            v-model="formData.numero"
            label="Número"
            maxlength="20"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :sm="6" :md="2">
          <v-text-field
            :hide-details="'auto'"
            v-model="formData.complemento"
            label="Complemento"
            maxlength="20"
            disabled
          />
        </v-col>
      </v-row>
      <!-- Estado, Cidade, Bairro -->
      <v-row>
        <v-col cols="12" :xs="12" :md="3">
          <v-text-field
            item-text="nome"
            item-value="sigla"
            label="Estado"
            v-model="formData.estado"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" :xs="12" :md="5">
          <v-text-field
            :hide-details="'auto'"
            v-model="formData.cidade"
            label="Cidade"
            maxlength="100"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :md="4">
          <v-text-field
            :hide-details="'auto'"
            v-model="formData.bairro"
            label="Bairro"
            maxlength="45"
            disabled
          />
        </v-col>
      </v-row>
      <!-- Comprovante de Endereço -->
      <v-row>
        <v-col cols="12" :xs="12" :md="4">
          <v-file-input accept="image/*" label="Comp. de Endereço" disabled />
        </v-col>
        <v-col cols="12" :xs="12" :md="4">
          <v-text-field
            v-model="formData.escolaridade_max"
            label="Nível de Escolaridade"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :md="4">
          <v-text-field
            :hide-details="'auto'"
            label="Sociedade Cientifica"
            v-model="formData.sociedade_cientifica"
            maxlength="100"
            disabled
          >
            <template v-slot:append>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on"> mdi-help-circle-outline </v-icon>
                </template>
                Associação de especialistas, estudiosos ou eruditos de um ramo
                do conhecimento ou das ciências em geral.
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
                    label="Nome Faculdade"
                    maxlength="60"
                    v-model="formData.formacao[fidx].faculdade_nome"
                    disabled
                  />
                </v-col>
                <v-col cols="12" :xs="12" :sm="6" :md="3">
                  <v-file-input accept="image/*" label="Certificado" disabled />
                </v-col>
                <v-col cols="12" :xs="12" :sm="6" :md="3">
                  <v-text-field
                    :hide-details="'auto'"
                    type="number"
                    label="Ano de Formação"
                    v-model="formData.formacao[fidx].faculdade_ano_formatura"
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  :xs="12"
                  :md="1"
                  v-if="fidx > 0"
                  @click="formData.formacao.splice(fidx, 1)"
                >
                  <v-btn icon class="mt-3">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </li>
          </ul>
        </v-col>
      </v-row>
      <!-- CRM, Categoria -->
      <v-row>
        <v-col cols="12" :xs="12" :md="3">
          <v-text-field
            :hide-details="'auto'"
            label="CRM"
            maxlength="20"
            v-model="formData.crm"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :md="2">
          <v-file-input accept="image/*" label="Doc. CRM" disabled />
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
                label="Data de Inscrição do CRM"
                type="date"
                max="3000-01-01"
                class="medico-stepper-input-date"
                disabled
              >
                <span slot="append">
                  <v-icon v-bind="attrs" v-on="on"> mdi-calendar </v-icon>
                </span>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="formData.dt_inscricao_crm"
              @input="menuDataCrm = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" :xs="12" :md="3">
          <v-text-field
            label="Categoria"
            v-model="formData.categoria"
            disabled
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
                    maxlength="60"
                    disabled
                  />
                </v-col>
                <v-col cols="12" :xs="12" :md="3">
                  <v-text-field
                    :hide-details="'auto'"
                    type="number"
                    label="Ano de Formação"
                    v-model="formData.especialidade[eidx].ano_formatura"
                    disabled
                  />
                </v-col>
                <v-col cols="12" :xs="12" :md="2">
                  <v-file-input accept="image/*" label="Certificado" disabled />
                </v-col>
                <v-col cols="12" :xs="12" :md="2">
                  <v-text-field
                    :hide-details="'auto'"
                    type="number"
                    label="Nº RQE"
                    maxlength="20"
                    v-model="formData.especialidade[eidx].rqe"
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  :xs="12"
                  :md="1"
                  @click="formData.especialidade.splice(eidx, 1)"
                >
                  <v-btn icon class="mt-3">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-row> </v-row>

      <!-- Faturamento, CNPJ, Unidade, Equipe -->
      <v-row>
        <v-col cols="12" :xs="12" :md="formData.faturamento == 'PJ' ? 3 : 6">
          <v-text-field
            :hide-details="'auto'"
            :items="[
              { text: 'Pessoa Juridica', value: 'PJ' },
              { text: 'Cooperado', value: 'C' },
            ]"
            v-model="formData.faturamento"
            label="Faturamento"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :md="3" v-if="formData.faturamento == 'PJ'">
          <v-text-field
            :hide-details="'auto'"
            label="CNPJ"
            v-model="formData.cnpj"
            v-mask="['##.###.###/####-##']"
            disabled
          />
        </v-col>

        <v-col cols="12" :xs="12" :md="3">
          <v-text-field
            :hide-details="'auto'"
            item-text="nome"
            item-value="id"
            v-model="formData.unidade"
            label="Unidade"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :md="3">
          <v-text-field
            :hide-details="'auto'"
            item-text="nome"
            item-value="id"
            v-model="formData.equipe"
            label="Equipe"
            disabled
          />
        </v-col>
      </v-row>
      <!-- Certificado e Termos -->
      <v-row>
        <v-col cols="12" :xs="12" :md="4">
          <v-file-input
            accept="image/*"
            label="Cert. Quitação CRMMG"
            disabled
          />
        </v-col>
        <v-col cols="12" :xs="12" :md="4">
          <v-file-input accept="image/*" label="Termo de Vigilância" disabled />
        </v-col>
        <v-col cols="12" :xs="12" :md="4">
          <v-file-input
            accept="image/*"
            label="Termo de Compromisso"
            disabled
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col :md="8" :sm="0" :xl="8" cols="12"> </v-col>
        <v-col :md="4" :sm="0" :xl="4" cols="12">
          <v-btn 
          class="mr-2" 
          color="white"
          @click="retorno()"
          > Retornar </v-btn>
          <modalAvalia />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import axios2 from "axios";
import { mask } from "vue-the-mask";
import modalAvalia from "@/components/medico/modal.vue";
export default {
  //todo: Buscar formações e especialidaes e carregar na tela
  components: { modalAvalia },
  layout: "cmedico",
  directives: { mask },
  data() {
    return {
      medico: [],
      unidades:[],
      equipes:[],
      formData: {
        id: null,
        nome: null,
        email: null,
        senha: null,
        celular: null,
        cpf: null,
        dt_nascimento: undefined,
        rg: null,
        rg_orgao_emissor: null,
        rg_data_emissao: undefined,
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
        formacao: [
          {
            faculdade_nome: null,
            faculdade_ano_formatura: null,
          },
        ],
        especialidade: [],
        equipe: null,
        unidade: null,
        faturamento: null,
        cnpj: null,
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
      },
      menuNascimento: false,
      menuEmissao: false,
      menuDataCrm: false,
      senhaVisivel: false,
    };
  },
  mounted() {
    this.listaEquipes()
    this.listaUnidades()
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("id");
    this.listaMedico(myParam);
  },
  methods: {
    carregaArquivo(ev, nome) {
      this.arquivos[nome] = ev;
    },
    listaMedico(id) {
      this.$axios
        .$get("/medico/" + id)
        .then((response) => {
          this.medico = response;
          this.formData = {
            id: this.medico.id,
            nome:this.medico.usuario.nome,
            email: this.medico.usuario.email,
            celular: this.medico.celular,
            cpf: this.medico.cpf,
            dt_nascimento: this.medico.dt_nascimento,
            rg: this.medico.rg,
            rg_orgao_emissor: this.medico.rg_orgao_emissor,
            rg_data_emissao: this.medico.rg_data_emissao,
            titulo_eleitoral: this.medico.titulo_eleitoral,
            zona: this.medico.zona,
            secao: this.medico.secao,
            cartao_sus: this.medico.cartao_sus,
            cep: this.medico.cep,
            logradouro: this.medico.logradouro,
            numero: this.medico.numero,
            complemento: this.medico.complemento,
            estado: this.medico.estado,
            cidade: this.medico.cidade,
            bairro: this.medico.bairro,
            sociedade_cientifica: this.medico.sociedade_cientifica,
            escolaridade_max: this.medico.escolaridade_max,
            crm: this.medico.crm,
            dt_inscricao_crm: this.medico.dt_inscricao_crm,
            categoria: this.medico.categoria,
            formacao: [
              {
                faculdade_nome: null,
                faculdade_ano_formatura: null,
              },
            ],
            especialidade: [],
            equipe: this.equipes[this.medico.candidatura.equipe_id-1].nome,
            unidade: this.unidades[this.medico.candidatura.unidade_id-1],
            faturamento: this.medico.candidatura.faturamento,
            cnpj: this.medico.candidatura.cnpj,
          };
        })
        .catch((error) => {
          console.log(error);
          this.formData={
            id:"Médico não encontrado"
          }
          setTimeout(window.location.href="/medico", 2000);
        });
    },
    listaUnidades() {
      this.$axios.$get('/unidade').then(response => {
        for(let i = 0;i<response.length;i++){
          this.unidades.push(response[i].nome)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    listaEquipes(){
      this.$axios.$get('/equipe').then(response => {
        this.equipes = response.dados
      }).catch(error => {
        console.log(error)
      })
    },
    retorno(){
      window.location.href="/medico"
    }
  },
};
</script>

<style lang="scss">
.medico-stepper {
  &-input-date input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
}
</style>
