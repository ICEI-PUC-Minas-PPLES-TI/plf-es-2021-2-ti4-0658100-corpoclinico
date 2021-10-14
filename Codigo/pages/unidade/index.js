import modal from '@/components/unidade/modal.vue'

export default {
  'layout': 'cmedico',
  components: {
    modal,
  },

  data() {
    return {
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Cidade', value: 'cidade' },
        { text: 'Bairro', value: 'bairro' },
        { text: 'Logradouro', value: 'logradouro' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      unidades: [
        {
          id: '1',
          nome: 'BH-Pampulha',
          cidade: 'Belo Horizonte',
          bairro:'Pampulha',
          logradouro: 'Rua Faria Lobato'
        },
        {
          id: '2',
          nome: 'Serra',
          cidade: 'Belo Horizonte',
          bairro:'Serra',
          logradouro: 'Rua Serra Papo'
        }
      ],

      unidadeId: 0,
      toast: false,
      toastMensagem: '',
      modalAtivo: false,

    }
  },
  watch:{
    modalAtivo: function (modalAtivo){
      modalAtivo ? false : this.listaUnidades();
    }
  },
  mounted() {
    this.listaUnidades();
  },
  methods: {

    listaUnidades() {

      // this.$axios.$get('/unidade').then(response => {
      //   this.unidades = response.dados;

      // }).catch(error => {
      //   console.log(error)
      // })

    },

    abreModal(id){
      if(id){
        this.modalAtivo = !this.modalAtivo;
        this.unidadeId = id;
      }else{
        this.modalAtivo = !this.modalAtivo;
        this.unidadeId = 0;
      }
    },

    deleteUnidade(id){
      console.log(this.unidades.length)
      if(this.unidades.length==1){
        this.unidades=[
          {
            id: '',
            nome: '',
            cidade: '',
            bairro:'',
            logradouro: ''
          }
        ]
      }else{
        this.unidades.splice(id-1,1);
      }
      // this.$axios.$delete('/unidade/' + id).then(response => {
      //   this.abreToast('Unidade Deletada!');
      //   this.listaUsuarios();

      // }).catch(error => {
      //   if (Array.isArray(error.response.data.errors)) {
      //     this.abreToast(error.response.data.errors[0]);
      //   } else {
      //     this.abreToast(error.response.data.errors);
      //   }

      // })


    },

    abreToast(mensagem) {
      this.toastMensagem = mensagem;
      this.toast = true;
    },

    formataStatus(dataExclusao){
      if ( dataExclusao == null ){
        return "ATIVO"
      }else{
        return "INATIVO"
      }
    }

  }

}
