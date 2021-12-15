<template>
  <v-container fluid style="overflow: auto; padding: 6vh">
    <v-card>
      <v-card-text id="areaPrint" v-if="medico">
        <h1 class="mb-4">Avaliando Médico #{{ medico.id }}</h1>
        <!-- Dados Pessoais -->
        <v-row>
          <v-col>
            <h3>Dados Pessoais</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" :sm="6" :md="6">
            <span class="avaliar-label">Nome</span>
            <span class="avaliar-field"> {{ medico.usuario.nome }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="3">
            <span class="avaliar-label">CPF</span>
            <span class="avaliar-field"> {{ medico.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="3">
            <span class="avaliar-label">Telefone Celular</span>
            <span class="avaliar-field"> {{ formataTelefone(medico.celular) }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="6">
            <span class="avaliar-label">E-mail</span>
            <span class="avaliar-field"> {{ medico.usuario.email }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="3">
            <span class="avaliar-label">Data de Nascimento</span>
            <span class="avaliar-field"> {{ formataData(medico.dt_nascimento) }} </span>
          </v-col>
          <v-col cols="12" :sm="8" :md="3">
            <span class="avaliar-label">Cartão do SUS</span>
            <span class="avaliar-field"> {{ medico.cartao_sus }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="4">
            <span class="avaliar-label">RG</span>
            <span class="avaliar-field"> {{ medico.rg }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="5">
            <span class="avaliar-label">Orgão Emissor</span>
            <span class="avaliar-field"> {{ medico.rg_orgao_emissor }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="3">
            <span class="avaliar-label">Data de Emissão (RG)</span>
            <span class="avaliar-field"> {{ formataData(medico.rg_data_emissao) }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="3">
            <span class="avaliar-label">Título de Eleitor</span>
            <span class="avaliar-field"> {{ medico.titulo_eleitoral.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3") }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="3">
            <span class="avaliar-label">Zona Eleitoral</span>
            <span class="avaliar-field"> {{ medico.zona }} </span>
          </v-col>
          <v-col cols="12" :sm="4" :md="2">
            <span class="avaliar-label">Seção Eleitoral</span>
            <span class="avaliar-field"> {{ medico.secao }} </span>
          </v-col>
        </v-row>
        <!-- Endereco -->
        <v-row>
          <v-col>
            <h3 class="my-4">Endereço</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" :md="3">
            <span class="avaliar-label">CEP</span>
            <span class="avaliar-field"> {{ medico.cep.replace(/(\d{5})(\d{3})/, "$1-$2") }} </span>
          </v-col>
          <v-col cols="12" :md="5">
            <span class="avaliar-label">Logradouro</span>
            <span class="avaliar-field"> {{ medico.logradouro }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="2">
            <span class="avaliar-label">Número</span>
            <span class="avaliar-field"> {{ medico.numero }} </span>
          </v-col>
          <v-col cols="12" :sm="6" :md="2">
            <span class="avaliar-label">Complemento</span>
            <span class="avaliar-field"> {{ medico.complemento ? medico.complemento : 'Não Possui' }} </span>
          </v-col>
          <v-col cols="12" :md="3">
            <span class="avaliar-label">Estado</span>
            <span class="avaliar-field"> {{ medico.estado }} </span>
          </v-col>
          <v-col cols="12" :md="5">
            <span class="avaliar-label">Cidade</span>
            <span class="avaliar-field"> {{ medico.cidade }} </span>
          </v-col>
          <v-col cols="12" :md="4">
            <span class="avaliar-label">Bairro</span>
            <span class="avaliar-field"> {{ medico.bairro }} </span>
          </v-col>
        </v-row>
        <!-- Formação -->
        <v-row>
          <v-col>
            <h3>Formação</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="avaliar-label">Nível de Escolaridade</span>
            <span class="avaliar-field"> {{ medico.escolaridade_max }} </span>
          </v-col>
          <v-col>
            <span class="avaliar-label">Sociedade Cientifica</span>
            <span class="avaliar-field"> {{ medico.sociedade_cientifica }} </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <ul>
              <li v-for="(item, itemidx) in this.medico.formacoes" :key="itemidx">
                <span class="avaliar-label">Faculdade {{ itemidx + 1}}</span>
                <span class="avaliar-field"> {{ item.faculdade_nome }}, formado em {{ item.faculdade_ano_formatura }} </span>
              </li>
            </ul>
          </v-col>
        </v-row>
        <!-- Dados Profissionais -->
        <v-row>
          <v-col>
            <h3 class="my-4">Dados Profissionais</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" :md="3">
            <span class="avaliar-label">CRM</span>
            <span class="avaliar-field"> {{ medico.crm }} </span>
          </v-col>
          <v-col :md="3">
            <span class="avaliar-label">Data de Inscrição do CRM</span>
            <span class="avaliar-field"> {{ formataData(medico.dt_inscricao_crm) }} </span>
          </v-col>
          <v-col cols="12" :md="3">
            <span class="avaliar-label">Categoria</span>
            <span class="avaliar-field"> {{ medico.categoria == 'C' ? 'Contratado': medico.categoria == 'E' ? 'Efetivo': 'Temporário' }} </span>
          </v-col>
        </v-row>
        <v-row>
          <ul>
            <li v-for="(item, itidx) in this.medico.especialidades" :key="itidx">
              <span class="avaliar-label">Especialidade {{ itidx + 1}}</span>
              <span class="avaliar-field"> {{ item.especialidade.identificacao }}, concluído em {{ item.ano_formatura }} na Instituição {{ item.instituicao }}. Nº RQE: {{ item.rqe }} </span>
            </li>
          </ul>
        </v-row>
        <!-- Faturamento, CNPJ, Unidade, Equipe -->
        <v-row>
          <v-col>
            <h3 class="my-4">Dados da Candidatura</h3>
          </v-col>
        </v-row>
        <v-row v-for="(c, cidx) in medico.candidatura" :key="cidx" class="avaliar-candidatura-linha">
          <v-col cols="12" :xs="2" :md="1">
            <span class="avaliar-label">ID</span>
            <span class="avaliar-field"> {{ cidx + 1 }} </span>
          </v-col>
          <v-col cols="12" :xs="10" :md="c.faturamento == 'PJ' ? 2: 4">
            <span class="avaliar-label">Faturamento</span>
            <span class="avaliar-field">{{ c.faturamento == 'PJ' ? "Pessoa Jurídica" : "Cooperativa" }}</span>
          </v-col>
          <v-col cols="12" :md="2" v-if="c.faturamento == 'PJ'">
            <span class="avaliar-label">CNPJ</span>
            <span class="avaliar-field" >{{ c.cnpj ? c.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1 $2 $3/$4-$5"): '' }}</span>
          </v-col>
          <v-col cols="12" :md="3">
            <span class="avaliar-label">Unidade</span>
            <span class="avaliar-field"> {{ c.unidade.nome }} </span>
          </v-col>
          <v-col cols="12" :md="2">
            <span class="avaliar-label">Equipe</span>
            <span class="avaliar-field"> {{ c.equipe.nome }} </span>
          </v-col>
          <v-col cols="12" :md="2">
            <v-btn
              v-if="verificaAvaliador(c)"
              width="100%"
              color="warning"
              class="noprint"
              text
              @click="candidaturaSelecionada=c;modalAvaliaAtivo=true"
            >
              <v-icon>
                mdi-star-outline
              </v-icon>
              Avaliar
            </v-btn>
            <v-btn
              v-if="verificaAvaliado(c)"
              color="warning"
              class="noprint"
              text
              disabled
            >
              <v-icon>
                mdi-star
              </v-icon>
              Avaliado
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="pb-6">
          <v-col class="noprint">
            <v-btn-toggle>
              <v-btn
                color="info"
                small
                @click="baixarArquivos()"
              >
                Baixar todos os arquivos do candidato
              </v-btn>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="info"
                    small
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="white">
                      mdi-arrow-down-drop-circle-outline
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="baixarArquivo('RG')">
                    Baixar RG
                  </v-list-item>
                  <v-list-item @click="baixarArquivo('CPF')">
                    Baixar CPF
                  </v-list-item>
                  <v-list-item @click="baixarArquivo('FOTO')">
                    Baixar Foto 3x4
                  </v-list-item>
                  <v-list-item @click="baixarArquivo('CENDER')">
                    Baixar Comprovante de Endereco
                  </v-list-item>
                  <v-list-item @click="baixarArquivo('CRM')">
                    Baixar Documento de CRM
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <section class="print">
          <v-row>
            <v-col>
              <h3>Assinaturas</h3>
            </v-col>
          </v-row>
          <v-row
            class="py-4"
          >
            <v-col>
              <hr class="solid">
            </v-col>
          </v-row>
          <v-row
            class="py-4"
          >
            <v-col>
              <hr class="solid">
            </v-col>
          </v-row>
          <v-row
            class="py-4"
          >
            <v-col>
              <hr class="solid">
            </v-col>
          </v-row>
        </section>

        <!-- Botoes -->
        <v-row justify="end" class="noprint">
          <v-col :md="7" :sm="12" :xl="12" cols="12"></v-col>
          <v-col class="text-center" :md="5" :sm="12" :xl="12" cols="12">
            <v-btn class="mr-2" color="white" @click="imprimir()">
              <v-icon>
                mdi-printer-outline
              </v-icon>
              Imprimir
            </v-btn>
            <v-btn class="mr-2" color="white" to="/medico">Retornar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- Modal Avaliação -->
    <v-dialog
      v-model="modalAvaliaAtivo"
      transition="dialog-bottom-transition"
      class="unidade-modal"
      width="600px"
    >
      <v-card class="px-4 py-4">
        <v-container fluids>
          <v-row class="mx-auto">
            <v-col :md="12" :sm="12" :xl="12" cols="12">
              <v-form ref="formAvalia" lazy-validation>
                <v-card-title class="text-h5 unidade-modal-title">
                  Avaliar Candidatura - ID {{ indexCandidatura }}
                </v-card-title>
                <v-card-text>
                  <v-select
                    :items="[{text: 'Aprovado', value: 'A'},{text: 'Recusado', value: 'R'}]"
                    label="Status"
                    hide-details="auto"
                    v-model="retorno.status"
                    :rules="[v => !!v || 'Status Obrigatório']"
                  >
                  </v-select>
                  <v-textarea
                    hide-details="auto"
                    :clearable="true"
                    label="Observações"
                    v-model="retorno.comentario"
                    :disabled = "retorno.status == 'A'"
                    :rules="'retorno.status'== 'Reprovado' ? [v => !!v || 'Comentário é obrigatório'] : []"
                  />
                </v-card-text>
              </v-form>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-row class="mx-auto text-center mt-2">
              <v-col>
                <v-btn
                  color="grey"
                  background="primary"
                  width="100%"
                  @click="dialog = false"
                >
                  Cancelar
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  width="100%"
                  color="blue"
                  background="primary"
                  slot="activator"
                  @click="submitAvaliacao"
                >
                  Avaliar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      modalAvaliaAtivo: false,
      medico: null,
      candidaturaSelecionada: null,
      retorno: {
        status: null,
        comentario: null
      },
    };
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("id");
    this.listaMedico(myParam);
  },
  computed: {
    indexCandidatura(){
      if(this.medico)
        return this.medico.candidatura.indexOf(this.candidaturaSelecionada) + 1
      else return 0
    }
  },
  methods: {
    listaMedico(id) {
      this.$axios
        .$get("/medico/" + id)
        .then((response) => {
          this.medico = response
        })
        .catch(error => {
          console.log(error);
          setTimeout((window.location.href = "/medico"), 3000);
        });
    },
    baixarArquivos() {
      for (let i = 0; i < this.medico.arquivos.length; i++) {
        this.$axios
          .get("/arquivo/" + this.medico.arquivos[i].id)
          .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", this.medico.arquivos[i].nome_arquivo);
            document.body.appendChild(link);
            link.click();
          });
      }
    },
    baixarArquivo(name){
      const res = this.medico.arquivos.filter((file) => {
        return file.tipo == name
      })
      if(res.length > 0){
        const arquivo = res[0]
        console.log(arquivo)
        this.$axios
          .get("/arquivo/" + arquivo.id)
          .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", arquivo.nome_arquivo);
            document.body.appendChild(link);
            link.click();
          });
      }
    },
    imprimir(){
      window.print()
    },
    verificaAvaliador(candidatura){
      const userID = this.$store.getters["login/me"].id
      const res = candidatura.retornos.filter((ret) => {
        return ret.avaliador.id == userID && ret.status == 'P'
      })
      return res.length >= 1
    },
    verificaAvaliado(candidatura){ // Verificar se já foi avaliado pelo proprio usuario
      const userID = this.$store.getters["login/me"].id
      const res = candidatura.retornos.filter((ret) => {
        return ret.avaliador.id == userID && ret.status != 'P'
      })
      return res.length >= 1
    },
    formataTelefone(v) {
      var r = v.replace(/\D/g, "");
      r = r.replace(/^0/, "");
      if (r.length > 10)
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
      else if (r.length > 5)
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      else if (r.length > 2)
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
      else
        r = r.replace(/^(\d*)/, "($1");
      return r;
    },
    formataData(data) {
      if (!data) return null;
      const [year, month, day] = data.split("-");
      return `${day}/${month}/${year}`;
    },
    submitAvaliacao() {
      if (this.$refs.formAvalia.validate()) {
        const userID = this.$store.getters["login/me"].id
        const res = this.candidaturaSelecionada.retornos.filter((ret) => {
          return ret.avaliador.id == userID
        })
        if(res.length >= 1) {
          const id = res[0].id
          this.$axios
            .$put("/retorno/" + id, this.retorno)
            .then(() => {
              this.$router.push('/medico')
            })
            .catch(error => {
              console.log(error);
              Swal.fire({
                title: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
              })
            });
        }
      }
    },
  },
};
</script>

<style lang="scss">
.avaliar{
  &-label{
    display: block;
    color: #868686;
    font-size: .8rem;
  }
  &-field{
    color: #333;
    font-weight: bold;
    font-size: 1rem;
  }
  &-candidatura-linha{
    border-bottom: 1px solid #eee;
  }
}

hr.solid {
  border-top: 1px solid rgb(148, 148, 148);
}

.print{
  display: none;
}

@media print {
  body * {
    visibility: hidden;
  }
  .v-card * {
    visibility: visible;
  }
  .print{
    display: block;
  }
  .noprint{
    display: none;
  }
}
</style>

