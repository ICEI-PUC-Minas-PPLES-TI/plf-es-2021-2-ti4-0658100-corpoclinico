import modal from '@/components/unidade/modal.vue'
import deletar from '@/components/deletarDialog/deletar.vue'
export default {
  'layout': 'cmedico',
  components: {
    modal,
    deletar,
  },

  data() {
    return {
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Cidade', value: 'cidade' },
        { text: 'Bairro', value: 'bairro' },
        { text: 'Logradouro', value: 'logradouro' },
        { text: 'Ativo', value: 'ativo' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      unidades: [
        {
          id: '',
          nome: '',
          cep:'',
          cidade: '',
          bairro:'',
          logradouro: '',
          ativo:'',
        },
      ],

      unidadeId: 0,
      toast: false,
      toastMensagem: '',
      modalAtivo: false,
      dialog: false,

    }
  },
  watch:{
    modalAtivo: function (modalAtivo){
      modalAtivo ? false : this.listaUnidades();
    },
    dialog: function (dialog){
      dialog ? false : this.listaUnidades();
    },
  },
  mounted() {
    this.listaUnidades();
  },
  methods: {

    listaUnidades() {

      this.$axios.$get('/unidade').then(response => {
        this.unidades = response;
      }).catch(error => {
        console.log(error)
      })

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
    abreDeleta(id){
      if(id){
        this.dialog = !this.dialog;
        this.unidadeId = id;
      }else{
        this.dialog = !this.dialog;
        this.unidadeId = 0;
      }
    },

    deleteUnidade(id){
      let respo = confirm("Deseja deletar a unidade?");
      if(respo==true){ 
          this.$axios.$delete('/unidade/' + id).then(response => {
            this.abreToast('Unidade Deletada!');
            this.listaUnidades();
          }).catch(error => {
            if (Array.isArray(error.response.data.errors)) {
              this.abreToast(error.response.data.errors[0]);
            } else {
              this.abreToast(error.response.data.errors);
            }
    
          })
        }  
     


    },

    abreToast(mensagem) {
      this.toastMensagem = mensagem;
      this.toast = true;
    },

  }

}