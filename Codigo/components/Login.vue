<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid secondary>
                <v-row align="center" justify="center" dense>
                    <v-col cols="12" sm="10" md="5" lg="3">
                        <v-card class="py-0" elevation="0">
                        <v-row class="py-4" align="center" justify="center">
                            <v-img  max-width="40%" :src="image" alt="corpo clinico"></v-img>
                        </v-row>
                            <v-card-text>
                                <v-form v-on:submit.prevent="handleSubmit">
                                    <v-text-field label="Login" name="email" prepend-inner-icon="mdi-account-circle" type="email" class="p-0rounded-0" outlined placeholder="email@email.com" v-model="email"></v-text-field>
                                    <v-text-field label="Senha" name="senha" prepend-inner-icon="mdi-lock" type="password" outlined class="rounded-0" v-model="senha"></v-text-field>
                                    <span name="msg" v-model="msg" class="mx-1 my-0">{{msg}}</span>
                                     <v-checkbox color="#25BAAE" label="Lembrar-me" class="mt-0" value="checked" v-model="lembrar"></v-checkbox>
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
    import axios from 'axios';
    import image from '/assets/logo.svg'
export default {
    name: 'Login',
    data(){
        return{
            email:'',
            senha:'',
            image:image,//logo do corpo clinico
            lembrar:'',//checkbox de lembrar senha
            msg:'' //mensagem que aparece embaixo da senha (mas acho que vou tirar kk)
        }

    },
    methods: {
        async handleSubmit(){
            if(this.email==" "||this.senha==" "){
                this.msg="Favor inserir dados"
            }else{
                document.cookie = `key=`;
                const response= await axios.post('http://localhost:3000/api/signin',{
                    email:this.email,
                    senha: this.senha
                });
                if(response.status==200){
                    document.cookie = `key=${response.data.acessoToken}`;
                    this.msg = "Logando"
                }else{
                    this.msg="Login inválido"
                }
            
            }
            
            console.log(this.lembrar)
        }
    },
}
</script>

<style lang="css" scoped></style>