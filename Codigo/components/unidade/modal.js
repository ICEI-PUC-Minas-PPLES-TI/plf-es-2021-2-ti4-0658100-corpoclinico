import axios2 from "axios";
import { mask } from "vue-the-mask";
export default {
  name: "modal",
  props: ["value", "unidadeId"],
  directives: { mask },
  data() {
    return {
      valid: true,

      titulo: "Nova Unidade",
      cep: "",
      unidade: {
        id: "",
        nome: "",
        cidade: "",
        logradouro: "",
        numero: "",
        ativo:""
      },

      toastMensagem: "",
      toast: false
    };
  },
  watch: {
    unidadeId: function(unidadeId) {
      if (unidadeId) {
        this.editUnidade(unidadeId);
        this.titulo = "Editar Unidade";
      } else {
        this.limpaDados();
        this.titulo = "Nova Unidade";
      }
    }
  },
  mounted() {},
  methods: {
    buscaCep() {
      axios2
        .get(`https://viacep.com.br/ws/${this.cep}/json`)
        .then(res => {
          if (!res.data.erro) {
            this.unidade.logradouro ||= res.data.logradouro;
            this.unidade.cidade ||= res.data.localidade;
            this.unidade.bairro ||= res.data.bairro;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitUnidade() {
        if(this.unidade.id > 0){
          this.updateUsuario(this.unidade.id);
        }else{
        if (this.$refs.formUnidaded.validate()){
          let unidade = JSON.parse(JSON.stringify(this.unidade))
          this.$axios.$post('/unidade', unidade).then(response => {
            this.limpaDados();
            this.abreToast('Unidade Cadastrada!');
            this.$emit('input', false) // Fecha modal
            this.$emit('listaUnidade')
          }).catch(error => {

            if (Array.isArray(error.response.data.erros)) {
              this.abreToast(error.response.data.erros[0]);
            } else {
              this.abreToast(error.response.data.erros);
            }

          })

        }
      }
    },

    editUnidade(id) {
      this.$axios.$get('/unidade/' + id).then(response => {
        this.unidade = response;
      }).catch(error => {
        console.log(error);
      })
    },

    updateUnidade(id) {
      if (this.$refs.formUnidade.validate() && id ) {
        let unidade = JSON.parse(JSON.stringify(this.unidade))
        this.$axios.$put('/unidade/' + id, unidade).then(response => {
          this.limpaDados();
          this.abreToast('Unidade Atualizada!');
          this.$emit('input', false) // Fecha modal
        }).catch(error => {
          if(Array.isArray(error.response.data.erros)){
            this.abreToast(error.response.data.erros[0]);
          }else{
            this.abreToast(error.response.data.erros);
          }
        })
      }
    },

    abreToast(mensagem) {
      this.toastMensagem = mensagem;
      this.toast = true;
    },

    limpaDados() {
      this.unidade= [
        {
          id: '',
          nome: '',
          cidade: '',
          logradouro: ''
        }
      ],

      this.$refs.formUnidade.reset();
    }
  }
};
