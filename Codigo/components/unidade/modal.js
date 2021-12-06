import axios2 from "axios";
const Swal = require('sweetalert2')
import { mask } from "vue-the-mask";
export default {
  name: "modal",
  props: ["value", "unidadeId"],
  directives: { mask },
  data() {
    return {
      valid: true,
      titulo: "Nova Unidade",
      unidade: {
        id: "",
        nome: "",
        cep: "",
        cidade: "",
        logradouro: "",
        numero: "",
        ativo: "",
      },

      toastMensagem: "",
      toast: false
    };
  },
  watch: {
    unidadeId: function (unidadeId) {
      if (unidadeId) {
        this.editUnidade(unidadeId);
        this.titulo = "Editar Unidade";
      } else {
        this.limpaDados();
        this.titulo = "Nova Unidade";
      }
    }
  },
  mounted() { },
  methods: {
    buscaCep() {
      axios2
        .get(`https://viacep.com.br/ws/${this.unidade.cep}/json`)
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
      if (this.unidade.id > 0) {
        this.updateUnidade(this.unidade.id);
      } else {
        if (this.$refs.formUnidade.validate()) {
          let unidade = JSON.parse(JSON.stringify(this.unidade))
          this.$axios.$post('/unidade', unidade).then(response => {
            this.limpaDados();
            Swal.fire({
              title: 'Unidade Cadastrada',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            this.$emit('input', false) // Fecha modal
            this.$emit('listaUnidade')
          }).catch(error => {
            Swal.fire({
              title: error.response.data.message,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          })

        }
      }
    },

    editUnidade(id) {
      this.$axios.$get('/unidade/' + id).then(response => {
        this.unidade = response;
      }).catch(error => {
        console.log(error);
        Swal.fire({
          title: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    },

    updateUnidade(id) {
      if (this.$refs.formUnidade.validate() && id) {
        let unidade = JSON.parse(JSON.stringify(this.unidade));

        this.$axios.$put('/unidade/' + id, unidade).then(response => {
          this.$emit('listaUnidade')
          Swal.fire({
            title: 'Unidade Atualizada',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.$emit('input', false) // Fecha modal
        }).catch(error => {
          Swal.fire({
            title: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
      }
    },

    abreToast(mensagem) {
      this.toastMensagem = mensagem;
      this.toast = true;
    },

    limpaDados() {
      this.unidade =
      {
        id: '',
        nome: '',
        cep: '',
        cidade: '',
        logradouro: '',
        numero: ''
      },

        this.$refs.formUnidade.reset();
    }
  }
};
