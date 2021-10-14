export default {
  name: 'modal',
  props: ['value', 'unidadeId'],
  data() {
    return {
      valid: true,
      show1: false,

      titulo:'Nova Unidade',

      unidade: [
        {
          id: '',
          nome: '',
          cidade: '',
          logradouro: ''
        }
      ],

      toastMensagem: '',
      toast: false,

    }
  },
  watch:{
    unidadeId: function(unidadeId){
      if(unidadeId){
        this.editUsuario(unidadeId);
        this.titulo = 'Editar Unidade';
      }else{
        this.limpaDados();
        this.titulo = 'Nova Unidade';
      }
    }
  },
  mounted() {

  },
  methods: {

    submitUnidade() {
    //   if(this.unidade.id > 0){
    //     this.updateUsuario(this.unidade.id);
    //   }else{
    //   if (this.$refs.formUnidaded.validate()){
    //     let unidade = JSON.parse(JSON.stringify(this.unidade))
    //     this.$axios.$post('/unidade', unidade).then(response => {
    //       this.limpaDados();
    //       this.abreToast('Unidade Cadastrada!');
    //       this.$emit('input', false) // Fecha modal
    //       this.$emit('listaUnidade')
    //     }).catch(error => {

    //       if (Array.isArray(error.response.data.erros)) {
    //         this.abreToast(error.response.data.erros[0]);
    //       } else {
    //         this.abreToast(error.response.data.erros);
    //       }

    //     })

    //   }
    // }

    },

    editUnidade(id) {

      // this.$axios.$get('/unidade/' + id).then(response => {
      //   this.unidade = response;
      // }).catch(error => {
      //   console.log(error);
      // })

    },

    updateUnidade(id){

      // if (this.$refs.formUnidade.validate() && id ) {

      //   let unidade = JSON.parse(JSON.stringify(this.unidade))

      //   this.$axios.$put('/unidade/' + id, unidade).then(response => {
      //     this.limpaDados();
      //     this.abreToast('Unidade Atualizada!');
      //     this.$emit('input', false) // Fecha modal

      //   }).catch(error => {
      //     if(Array.isArray(error.response.data.erros)){
      //       this.abreToast(error.response.data.erros[0]);
      //     }else{
      //       this.abreToast(error.response.data.erros);
      //     }
      //   })

      // }

    },

    abreToast(mensagem){
      this.toastMensagem = mensagem;
      this.toast = true;
    },


    limpaDados(){
      // this.unidade= [
      //   {
      //     id: '',
      //     nome: '',
      //     cidade: '',
      //     logradouro: ''
      //   }
      // ],

      // this.$refs.formUnidade.reset();
    }

  }
}
