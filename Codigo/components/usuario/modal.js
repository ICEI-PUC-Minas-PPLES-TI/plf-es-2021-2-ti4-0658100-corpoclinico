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
        senhaDuplicada: '',

        tipo: 'A'
      },

      //formData: null

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
          this.$emit('input', false) // Fecha modal
          alert('Usuario Cadastrado!')
        }).catch(error => {
          alert(JSON.stringify(error.response.data))
          console.log(error)
        })

      }
    }

    },


    editUsuario(id) {

      this.$axios.$get('/usuario/' + id).then(response => {
        this.usuario = response;
      }).catch(error => {
        console.log(error)
        this.errored = true
      })

    },

    updateUsuario(id){

      if (this.$refs.formUsuario.validate() && id ) {

        let usuario = JSON.parse(JSON.stringify(this.usuario))

        this.$axios.$put('/usuario/' + id, usuario).then(response => {
          this.limpaDados();
          this.$emit('input', false) // Fecha modal
          alert('Usuario Atualizado!')
        }).catch(error => {
          alert(JSON.stringify(error.response.data))
          console.log(error)
        })

      }

    },


    limpaDados(){

      this.$refs.formUsuario.reset();

      this.usuario = {
        id: '',
        nome: '',
        email: '',
        senha: '',
        senhaDuplicada: '',
        tipo: 'A'
      }

    }

  }
}
