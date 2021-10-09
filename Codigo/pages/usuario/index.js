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
          status: 'Ativo',
          data_excluido: ''
        }
      ],
      usuarioId: 0,

      modalAtivo: false,
      teste: '',
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
        this.errored = true
      })
      console.log(this.usuarios);
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
        alert('Usuario Deletado!')
      }).catch(error => {
        alert(JSON.stringify(error.response.data))
        console.log(error)
      })

      this.listaUsuarios();

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
