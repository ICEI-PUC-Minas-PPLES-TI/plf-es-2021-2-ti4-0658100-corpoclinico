<template>
  <div>
    <h1 class="mb-4">Avaliando Médico #{{ this.formData.id }}</h1>
    <h3>Dados Pessoais</h3>
    <v-row>
      <v-col cols="12" :xs="12" :sm="6" :md="9">
        <v-text-field
          :hide-details="'auto'"
          v-model="formData.nome"
          maxlength="120"
          label="Nome"
          color="primary"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="6" :md="3">
        <v-text-field
          :hide-details="'auto'"
          v-model="formData.cpf"
          v-mask="['###.###.###-##']"
          label="CPF"
          readonly
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" :xs="12" :sm="6" :md="4">
        <v-text-field
          :hide-details="'auto'"
          type="tel"
          v-model="formData.celular"
          v-mask="['(##) ####-####', '(##) #####-####']"
          label="Telefone Celular"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="6" :md="5">
        <v-text-field
          :hide-details="'auto'"
          v-model="formData.email"
          label="E-mail"
          type="email"
          maxlength="100"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="6" :md="3">
        <v-text-field
          v-model="formData.dt_nascimento"
          hide-details="auto"
          label="Data de Nascimento"
          type="date"
          max="3000-01-01"
          readonly
        >
        </v-text-field>
      </v-col>
    </v-row>
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
                pattern: /^[0-9]*\.?[0-9]*$/
              },
              A: {
                pattern: /[a-zA-Z]/,
                transform: v => v.toLocaleUpperCase()
              }
            }
          }"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="6" :md="5">
        <v-text-field
          :hide-details="'auto'"
          v-model="formData.rg_orgao_emissor"
          label="Orgão Emissor"
          maxlength="30"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="6" :md="3">
        <v-text-field
          v-model="formData.rg_data_emissao"
          hide-details="auto"
          label="Data de Emissão"
          type="date"
          max="3000-01-01"
          class="medico-stepper-input-date"
          readonly
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" :xs="12" :sm="6" :md="3">
        <v-text-field
          :hide-details="'auto'"
          label="Título de Eleitor"
          v-model="formData.titulo_eleitoral"
          v-mask="['#### #### ####']"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="6" :md="3">
        <v-text-field
          :hide-details="'auto'"
          label="Zona Eleitoral"
          v-model="formData.zona"
          maxlength="3"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="4" :md="2">
        <v-text-field
          :hide-details="'auto'"
          label="Seção Eleitoral"
          v-model="formData.secao"
          maxlength="4"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="8" :md="4">
        <v-text-field
          :hide-details="'auto'"
          label="Cartão do SUS"
          v-model="formData.cartao_sus"
          maxlength="15"
          readonly
        />
      </v-col>
    </v-row>
    <h3 class="my-4">Endereço</h3>
    <v-row>
      <v-col cols="12" :xs="12" :md="3">
        <v-text-field
          :hide-details="'auto'"
          v-mask="'#####-###'"
          v-model="formData.cep"
          label="CEP"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :md="5">
        <v-text-field
          :hide-details="'auto'"
          v-model="formData.logradouro"
          label="Logradouro"
          maxlength="100"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="6" :md="2">
        <v-text-field
          :hide-details="'auto'"
          v-model="formData.numero"
          label="Número"
          maxlength="20"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="6" :md="2">
        <v-text-field v-if="formData.Complemento!=null"
          :hide-details="'auto'"
          v-model="formData.complemento"
          label="Complemento"
          maxlength="20"
          readonly
        />
        <v-text-field v-if="formData.Complemento==null"
          :hide-details="'auto'"
          v-model="complementoVazio"
          label="Complemento"
          maxlength="20"
          readonly
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" :xs="12" :md="3">
        <v-text-field
          item-text="nome"
          item-value="sigla"
          label="Estado"
          v-model="formData.estado"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" :xs="12" :md="5">
        <v-text-field
          :hide-details="'auto'"
          v-model="formData.cidade"
          label="Cidade"
          maxlength="100"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :md="4">
        <v-text-field
          :hide-details="'auto'"
          v-model="formData.bairro"
          label="Bairro"
          maxlength="45"
          readonly
        />
      </v-col>
    </v-row>
    <h3>Formação</h3>
    <v-row>
      <v-col>
        <v-text-field
          v-model="formData.escolaridade_max"
          label="Nível de Escolaridade"
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          :hide-details="'auto'"
          label="Sociedade Cientifica"
          v-model="formData.sociedade_cientifica"
          maxlength="100"
          readonly
        >
        </v-text-field>
      </v-col>
    </v-row>
    <!-- Formações -->
    <v-row v-for="item in this.medico.formacoes" v-bind:key="item.id">
      <v-col cols="12" :xs="12" :md="6">
        <v-text-field label="Faculdade" v-model="item.faculdade_nome" />
      </v-col>
      <v-col>
        <v-text-field
          :hide-details="'auto'"
          type="number"
          label="Ano de Formação"
          v-model="item.faculdade_ano_formatura"
          readonly
        />
      </v-col>
    </v-row>
    <h3 class="my-4">Dados Profissionais</h3>
    <v-row v-for="item in this.medico.especialidades" v-bind:key="item.id">
      <v-col cols="12" :xs="12" :md="6">
        <v-text-field label="RQE de Especialidade" v-model="item.rqe" />
      </v-col>
      <!--<v-col cols="12" :xs="12" :md="4">
            <v-text-field
              :hide-details="'auto'"
              type="number"
              label="Instituição"
              v-model="item.instituicao"
              readonly
            />
          </v-col>-->
      <v-col cols="12" :xs="12" :md="6">
        <v-text-field
          :hide-details="'auto'"
          type="number"
          label="Ano de Conclusão"
          v-model="item.ano_formatura"
          readonly
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" :xs="12" :md="3">
        <v-text-field
          :hide-details="'auto'"
          label="CRM"
          maxlength="20"
          v-model="formData.crm"
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="formData.dt_inscricao_crm"
          hide-details="auto"
          label="Data de Inscrição do CRM"
          type="date"
          max="3000-01-01"
          class="medico-stepper-input-date"
          readonly
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" :xs="12" :md="3">
        <v-text-field label="Categoria" v-model="formData.categoria" readonly />
      </v-col>
    </v-row>
    <!-- Faturamento, CNPJ, Unidade, Equipe -->
    <h3 class="my-4">Dados financeiros</h3>
    <v-row>
      <v-col cols="12" :xs="12" :md="6">
        <v-text-field
          :hide-details="'auto'"
          v-model="formData.faturamento"
          label="Faturamento"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :md="6" v-if="formData.faturamento == 'PJ'">
        <v-text-field
          :hide-details="'auto'"
          label="CNPJ"
          v-model="formData.cnpj"
          v-mask="['##.###.###/####-##']"
          readonly
        />
      </v-col>
    </v-row>
    <h3 class="my-4">Equipe</h3>
    <v-row>
      <v-col cols="12" :xs="12" :md="6">
        <v-text-field
          :hide-details="'auto'"
          item-text="nome"
          item-value="id"
          v-model="formData.unidade"
          label="Unidade"
          readonly
        />
      </v-col>
      <v-col cols="12" :xs="12" :md="6">
        <v-text-field
          :hide-details="'auto'"
          item-text="nome"
          item-value="id"
          v-model="formData.equipe"
          label="Equipe"
          readonly
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <a @click="baixarArquivos()">Baixar arquivos do candidato</a>
      </v-col>
    </v-row>

    <!-- Botoes -->
    <v-row>
      <v-col :md="8" :sm="0" :xl="8" cols="12"> </v-col>
      <v-col :md="4" :sm="0" :xl="4" cols="12">
        <v-btn class="mr-2" color="white" @click="retorno()">
          Retornar
        </v-btn>
        <modalAvalia />
      </v-col>
    </v-row>
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
      complementoVazio:"Não Possui",
      medico: [],
      unidades: [],
      equipes: [],
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
        formacao: [],
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
    this.listaEquipes();
    this.listaUnidades();
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
            nome: this.medico.usuario.nome,
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
            formacao:this.medico.formacoes,
            especialidades:this.medico.especialidades,
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
            equipe: this.equipes[this.medico.candidatura.equipe_id - 1].nome,
            unidade: this.unidades[this.medico.candidatura.unidade_id - 1],
            faturamento: this.medico.candidatura.faturamento,
            cnpj: this.medico.candidatura.cnpj,
          };
        })
        .catch((error) => {
          console.log(error);
          this.formData = {
            id: "Médico não encontrado",
          };
          setTimeout((window.location.href = "/medico"), 3000);
        });
    },
    listaUnidades() {
      this.$axios
        .$get("/unidade")
        .then((response) => {
          for (let i = 0; i < response.length; i++) {
            this.unidades.push(response[i].nome);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listaEquipes() {
      this.$axios
        .$get("/equipe")
        .then((response) => {
          this.equipes = response.dados;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    baixarArquivos() {
      let urls = [];
      for (let i = 0; i < this.medico.arquivos.length; i++) {
        urls.push(window.location.protocol + "//" + window.location.host + "/api/arquivo/"+ this.medico.arquivos[i].id)
      }
      this.downloadAll(urls)
    },
    downloadAll(urls) {
      var link = document.createElement('a');

      link.setAttribute('download', null);
      link.style.display = 'none';

      document.body.appendChild(link);

      for (var i = 0; i < urls.length; i++) {
        link.setAttribute('href', urls[i]);
        link.click();
      }

      document.body.removeChild(link);
    },
    retorno() {
      window.location.href = "/medico";
    },
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
