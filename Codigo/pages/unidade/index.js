import modal from '@/components/unidade/modal.vue'
const Swal = require('sweetalert2')
export default {
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
        { text: 'Ativo', value: 'ativo' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      unidades: [
        {
          id: '',
          nome: '',
          cep: '',
          cidade: '',
          bairro: '',
          logradouro: '',
          ativo: '',
        },
      ],

      unidadeId: 0,
      toast: false,
      toastMensagem: '',
      modalAtivo: false,
      dialog: false,

    }
  },
  watch: {
    modalAtivo: function (modalAtivo) {
      modalAtivo ? false : this.listaUnidades();
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

    abreModal(id) {
      if (id) {
        this.modalAtivo = !this.modalAtivo;
        this.unidadeId = id;
      } else {
        this.modalAtivo = !this.modalAtivo;
        this.unidadeId = 0;
      }
    },

    ativaUnidade(id) {
      let unidade = {
        ativo: true
      }
      this.$axios.$put('/unidade/' + id, unidade).then(response => {
        this.$emit('listaUnidade')
        this.abreToast('Unidade Ativa!');
      }).catch(error => {
        console.log("Erro:");
        console.error(error)
        Swal.fire({
          title: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    },

    deleteUnidade(id) {
      this.$axios.$delete('/unidade/' + id).then(response => {
        this.abreToast('Unidade Inativa!');
        this.listaUnidades();
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

  }

}
