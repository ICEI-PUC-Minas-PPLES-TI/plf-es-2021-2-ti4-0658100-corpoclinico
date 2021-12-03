<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid fundoclaro>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="10" md="5" lg="5">
            <v-card class="py-0" elevation="0">
              <v-row class="py-4" align="center" justify="center">
                <v-img max-width="40%" :src="image" alt="corpo clinico"></v-img>
              </v-row>

              <v-card-text>
                <v-form
                  ref="formulario"
                  v-on:submit.prevent="handleSubmit"
                  lazy-validation
                >
                  <v-text-field
                    label="Login"
                    :error-messages="erroLogin"
                    name="email"
                    prepend-inner-icon="mdi-account-circle"
                    type="email"
                    class="p-0rounded-0"
                    outlined
                    placeholder="email@email.com"
                    :rules="[rules.required]"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    ref="password"
                    :error-messages="erroLogin"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    label="Senha"
                    name="senha"
                    prepend-inner-icon="mdi-lock"
                    :type="show1 ? 'text' : 'password'"
                    outlined
                    class="mb-0 rounded-0"
                    v-model="senha"
                    @click:append="show1 = !show1"
                  ></v-text-field>

                  <v-btn
                    @click.native="handleSubmit"
                    class="rounded-0 mt-2"
                    color="#25BAAE"
                    x-large
                    block
                    dark
                  >
                    Entrar
                  </v-btn>

                  <v-card-actions class="text--secondary">
                    Ainda não se candidatou?<a
                      href="/medico/cadastro"
                      class="pl-2"
                      style="color: #25baae"
                      >Candidatar-se</a
                    >
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import image from "/assets/logo.svg";
export default {
  name: "login",
  layout: "clear",
  data() {
    return {
      email: "",
      senha: "",
      image: image, //logo do corpo clinico
      tipo: "",
      show1: false, //mostrar a senha
      erroLogin: null,
      rules: {
        required: (value) => !!value || "Obrigatório."
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.$refs.formulario.validate()) {
        document.cookie = `token=`;
        this.$axios
          .post("/signin", {
            email: this.email,
            senha: this.senha,
          })
          .then((res) => {
            this.$store.dispatch('login/userLogin', {
              loginData: res.data.acessoToken,
              nome: res.data.nome,
              tipo: res.data.tipo,
              router: this.$router
            })
          })
          .catch((err) => {
            this.erroLogin = "Dados não encontrados";
          });
      }
    },
  },
};
</script>

<style lang="css" scoped>
</style>