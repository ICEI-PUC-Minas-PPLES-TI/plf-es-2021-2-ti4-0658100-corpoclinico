<template>
  <v-app class="main">
    <v-container fluid>
        <v-row>
            <v-col :md="2" cols="12">
                <img src="@/assets/logohospital.png" alt="Logo Hospital São Fransisco" width="100%">
            </v-col>
            <v-col :md="9" cols="12">
                <Nuxt />
            </v-col>
        </v-row>
    </v-container>
  </v-app>
</template>

<style>
  .main{
    background: #F2F2F0 !important;
    height: 100%;
    width: 100%;
    padding:0;
    margin:0;
    top:0;
    left:0;
    position: fixed;
  }
</style>


