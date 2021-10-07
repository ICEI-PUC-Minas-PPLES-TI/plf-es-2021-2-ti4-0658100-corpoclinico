<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid secondary>
                <v-row align="center" justify="center" dense>
                    <v-col cols="12" sm="8" md="5" lg="4">
                        <v-card class="py-2" elevation="0">
                            <v-img  src="@/assets/logo.svg" alt="corpo clinico" contain height="150" width="400"></v-img>
                            <v-card-text>
                                <v-form @submit.prevent="handleSubmit">
                                    <v-text-field label="Login" name="email" prepend-inner-icon="mdi-account-circle" type="email" class="rounded-0" outlined placeholder="email@email.com" v-model="email"></v-text-field>
                                    <v-text-field label="Senha" name="senha" prepend-inner-icon="mdi-lock" type="senha" outlined class="rounded-0" v-model="senha"></v-text-field>
                                     <v-checkbox color="#25BAAE" label="Lembrar-me" class="mt-0">
                                    </v-checkbox>
                                    <v-btn  @click.native="handleSubmit" class="rounded-0" color="#25BAAE" x-large block dark > Entrar </v-btn>
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
    // import axios from 'axios';
export default {
    name: 'Login',
    data(){
        return{
            email:'',
            senha:''
        }
    },
    methods: {
        async handleSubmit(){
            // const response= await axios.post('http://localhost:3000/api/signin',{
            //     email:this.email,
            //     senha: this.senha
            // });
            console.log(this.email,this.senha);
        }
    },
}
</script>

<style lang="css" scoped></style>'