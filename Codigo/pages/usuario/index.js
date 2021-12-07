import modal from '@/components/usuario/modal.vue'
const Swal = require('sweetalert2')
export default {
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
      tabelaPaginaAtual: 1,
      tabelaPaginas: 1,
      totalItems: 1,
      tabelaCarregando: false,
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
      this.$axios.$get(`/usuario?pagina=${this.tabelaPaginaAtual}`).then(response => {
        this.usuarios = response.dados;
        this.tabelaPaginas = response.paginas
        this.totalItems = response.total
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
        this.listaUsuarios();

      }).catch(error => {
        Swal.fire({
          title: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })


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
