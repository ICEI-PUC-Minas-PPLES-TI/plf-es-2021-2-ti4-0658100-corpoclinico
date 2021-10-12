import modal from '@/components/usuario/modal.vue'

export default {
  'layout': 'cmedico',
  components: {
    modal,
  },

  data() {
    return {
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Email', value: 'email' },
        { text: 'Status', value: 'data_excluido' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      usuarios: [
        {
          id: '',
          nome: '',
          email: '',
          status: '',
          data_excluido: ''
        }
      ],

      usuarioId: 0,
      toast: false,
      toastMensagem: '',
      modalAtivo: false,

    }
  },
  watch:{
    modalAtivo: function (modalAtivo){
      modalAtivo ? false : this.listaUsuarios();
    }
  },
  mounted() {
    this.listaUsuarios();
  },
  methods: {

    listaUsuarios() {

      this.$axios.$get('/usuario').then(response => {
        this.usuarios = response.dados;

      }).catch(error => {
        console.log(error)
      })

    },

    abreModal(id){
      if(id){
        this.modalAtivo = !this.modalAtivo;
        this.usuarioId = id;
      }else{
        this.modalAtivo = !this.modalAtivo;
        this.usuarioId = 0;
      }
    },

    deleteUsuario(id){

      this.$axios.$delete('/usuario/' + id).then(response => {
        this.abreToast('Usuario Deletado!');
      }).catch(error => {
        alert(JSON.stringify(error.response.data))
        this.abreToast(error.response.data);
        console.log(error)
      })

      this.listaUsuarios();

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
