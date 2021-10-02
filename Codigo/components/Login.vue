<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid secondary>
                <v-row align="center" justify="center" dense>
                    <v-col cols="12" sm="8" md="5" lg="4">
                        <v-card elevation="0">
                            <v-img src="@/assets/logo.png" alt="corpo clinico" contain height="200"></v-img>
                            <v-card-text>
                                <v-form>
                                    <v-text-field label="Login" name="login" prepend-inner-icon="mdi-account-circle" type="email" class="rounded-0" outlined placeholder="email@email.com" v-model="login"></v-text-field>
                                    <v-text-field label="Senha" name="senha" prepend-inner-icon="mdi-lock" type="senha" outlined class="rounded-0" v-model="senha"></v-text-field>
                                     <v-checkbox color="#25BAAE" label="Lembrar-me" class="mt-0">
                                    </v-checkbox>
                                    <v-btn  @click.native="logar" class="rounded-0" color="#25BAAE" x-large block dark > Entrar </v-btn>
                                    <v-card-actions class="text--secondary" >
                                        Ainda não se candidatou?<a href="#" class="pl-2" style="color: #25BAAE">Candidatar-se</a>
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
export default {
    data(){
        return{
            login:'',
            senha:'',
        }
    },
    methods:{
        logar() {
            let hoje = new Date();
            console.log(hoje.getDate())

            document.cookie = `login=${this.login}; expires= Thu, 21 Aug 2022 20:00:00 UTC`
        },
        valida(){

        }
    },
}
</script>

<style lang="css" scoped></style>