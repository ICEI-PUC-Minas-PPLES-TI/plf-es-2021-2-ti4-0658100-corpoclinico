<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid >
                <v-row align="center" justify="center" dense>
                    <v-col cols="12" sm="8" md="4" lg="4">
                        <v-card elevation="0">

                            <v-img src="@/assets/logo.png" alt="corpo clinico" contain height="200"></v-img>
                            <v-card-text>
                                <v-form>
                                    <v-text-field label="Login" name="email" prepend-inner-icon="mdi-account-circle" type="email" class="rounded-0" outlined placeholder="email@email.com"></v-text-field>
                                    <v-text-field label="Senha" name="password" prepend-inner-icon="mdi-lock" type="password" outlined class="rounded-0"></v-text-field>
                                     <v-checkbox color="#25BAAE" label="Lembrar-me" class="mt-0">
                                    </v-checkbox>
                                    <v-btn  class="rounded-0" color="#25BAAE" x-large block dark> Entrar </v-btn>
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
    
}
</script>

<style lang="css" scoped></style>