export default {
  name: 'modal',
  props: ['value', 'usuarioId'],
  data() {
    return {
      valid: true,
      show1: false,

      usuario: {
        id: '',
        nome: '',
        email: '',
        senha: '',
        tipo: ''
      },

      toastMensagem: '',
      toast: false,

    }
  },
  watch:{
    usuarioId: function(usuarioId){
      if(usuarioId){
        this.editUsuario(usuarioId);
      }
    }
  },
  mounted() {

  },
  methods: {

    submitUsuario() {
      if(this.usuario.id > 0){
        this.updateUsuario(this.usuario.id);
      }else{
      if (this.$refs.formUsuario.validate()){
        let usuario = JSON.parse(JSON.stringify(this.usuario))
        this.$axios.$post('/usuario', usuario).then(response => {
          this.limpaDados();
          this.abreToast('Usuario Cadastrado!');
          this.$emit('input', false) // Fecha modal
          this.$emit('listaUsuarios')
        }).catch(error => {

          this.abreToast(error.response.data.erros[0]);

        })

      }
    }

    },

    editUsuario(id) {

      this.$axios.$get('/usuario/' + id).then(response => {
        this.usuario = response;
      }).catch(error => {
        console.log(error);
      })

    },

    updateUsuario(id){

      if (this.$refs.formUsuario.validate() && id ) {

        let usuario = JSON.parse(JSON.stringify(this.usuario))

        this.$axios.$put('/usuario/' + id, usuario).then(response => {
          this.limpaDados();
          this.abreToast('Usuario Atualizado!');
          this.$emit('input', false) // Fecha modal

        }).catch(error => {
          this.abreToast(error.response.data.erros[0]);
        })

      }

    },

    abreToast(mensagem){
      this.toastMensagem = mensagem;
      this.toast = true;
    },


    limpaDados(){

      this.$refs.formUsuario.reset();

      this.usuario = {
        id: '',
        nome: '',
        email: '',
        senha: '',
        tipo: ''
      }

    }

  }
}
