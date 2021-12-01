<template>
  <div class="info-container">
    <v-row>
      <v-col class="info-title">
        <h4>Minha Ficha</h4>
      </v-col>
    </v-row>
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
    <v-row>
      <v-col class="info-subtitle">
        <span>
          Informações Básicas
        </span>
      </v-col>
    </v-row>
    <v-row v-if="info" class="info-form">
      <v-col cols="12" :sm="12" :md="4">
        <span class="info-label">Nome</span>
        {{ info.usuario.nome }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">CPF</span>
        {{ info.cpf }}
      </v-col>
      <v-col cols="12" :sm="12" :md="2">
        <span class="info-label">Telefone</span>
        {{ info.celular }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Cartão do SUS</span>
        {{ info.cartao_sus }}
      </v-col>
      <v-col cols="12" :sm="12" :md="4">
        <span class="info-label">E-mail</span>
        {{ info.usuario.email }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Data de Nascimento</span>
        {{ formataData(info.dt_nascimento) }}
      </v-col>
      <v-col cols="12" :sm="12" :md="2">
        <span class="info-label">Titulo de Eleitor</span>
        {{ info.titulo_eleitoral }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Zona e Seção Eleitoral</span>
        {{ info.zona }} - {{ info.secao }}
      </v-col>
      <v-col cols="12" :sm="12" :md="4">
        <span class="info-label">RG</span>
        {{ info.rg }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Orgão Emissor</span>
        {{ info.rg_orgao_emissor }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Data de Emissão do RG</span>
        {{ formataData(info.rg_data_emissao) }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="info-subtitle">
        <span>
          Informações de Moradia
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">CEP</span>
        {{ info.cep }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Logradouro</span>
        {{ info.logradouro }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Número</span>
        {{ info.numero }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Complemento</span>
        {{ info.complemento ? info.complemento : 'Não informado' }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Estado</span>
        {{ info.estado }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Cidade</span>
        {{ info.cidade }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Bairro</span>
        {{ info.bairro }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="info-subtitle">
        <span>
          Dados Acadêmicos
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Nível de Escolaridade</span>
        {{ escolaridade }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Sociedade Cientifica</span>
        {{ info.sociedade_cientifica ? info.sociedade_cientifica : 'Não informado' }}
      </v-col>
      <!-- @todo Adicionar informações de formação -->
    </v-row>
    <v-row>
      <v-col class="info-subtitle">
        <span>
          Dados Profissionais
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" :sm="12" :md="4">
        <span class="info-label">CRM</span>
        {{ info.crm }}
      </v-col>
      <v-col cols="12" :sm="12" :md="4">
        <span class="info-label">CRM</span>
        {{ formataData(info.dt_inscricao_crm) }}
      </v-col>
      <v-col cols="12" :sm="12" :md="4">
        <span class="info-label">Categoria</span>
        {{ categoria }}
      </v-col>
      <!-- @todo Adicionar informações de especialidades -->
    </v-row>
    <v-row>
      <v-col class="info-subtitle">
        <span>
          Candidatura
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Faturamento</span>
        {{ info.candidatura.faturamento == 'C' ? 'Cooperado': 'Pessoa Jurídica' }}
      </v-col>
      <v-col v-if="info.candidatura.faturamento == 'PJ'" cols="12" :sm="12" :md="3">
        <span class="info-label">CNPJ</span>
        {{ info.candidatura.cnpj }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Unidade</span>
        {{ info.candidatura.unidade.nome }}
      </v-col>
      <v-col cols="12" :sm="12" :md="3">
        <span class="info-label">Equipe</span>
        {{ info.candidatura.equipe.nome }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'cmedico',
  data(){
    return {
      info: null
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
          let denied = this.info.candidatura.retornos.filter((f) => {
            return f.status == 'R'
          })
          if(denied.length > 0)
            return {
              status: 'R',
              result: denied
            }
          else {
            let pending = this.info.candidatura.retornos.filter((f) => {
              return f.status == 'P'
            })
            if(pending.length > 0)
              return {status: 'P' }
            else {
              let approved = this.info.candidatura.retornos.filter((f) => {
                return f.status == 'A'
              })
              if(approved.length > 0)
                return {status: 'A' }
              else
                return null
            }
          }
        } else 
          return null
        
      } else return null
    }
  },
  methods: {
    formataData(data) {
      if (!data) return null;
      const [year, month, day] = data.split("-");
      return `${day}/${month}/${year}`;
    },
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
}
</style>