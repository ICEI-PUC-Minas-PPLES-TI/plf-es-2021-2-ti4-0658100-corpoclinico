<template>
  <!--Container-->
  <v-container fluid style="overflow: auto; padding:6vh;">
    <v-card class="mx-auto" width="100%">
      <div class="div-titulo-btn">
        <v-card-title>
          <span class="text-h6">Unidades</span>
        </v-card-title>
        <v-card-actions>
          <v-btn
            class="mr-2"
            color="success"
            background="primary"
            @click="abreModal(0)"
          >
            Criar Unidade
          </v-btn>
          <modal v-model="modalAtivo" v-bind:unidadeId="unidadeId" />
        </v-card-actions>
      </div>
      <v-card-text class="text-h5">
        <template>
          <v-data-table
            :headers="headers"
            :items="unidades"
            :items-per-page="-1"
            :loading="tabelaCarregando"
            :disable-sort="true"
            :footer-props="{
              'disable-items-per-page': true,
              'disable-pagination': true
            }"
            class="unidade-table"
          >
            <template v-slot:item.ativo="{ item }">
              <v-switch 
                v-if=" item.ativo==0 "
                color="success"
                inset
                v-model="item.ativo"
                @change="ativaUnidade(item.id)"
              ></v-switch>
              <v-switch 
                v-if=" item.ativo==1 "
                color="success"
                inset
                v-model="item.ativo"
                @change="deleteUnidade(item.id)"
              ></v-switch>
            </template>
            <template v-slot:item.actions="{ item }">
            
              <v-icon color="success" class="mr-2" @click="abreModal(item.id)">
                mdi-square-edit-outline
              </v-icon>

              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">
                Reset
              </v-btn>
            </template>
          </v-data-table>
        </template>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="toast" shaped>
      {{ toastMensagem }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="toast = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script src="./index.js"></script>

<style>
.div-titulo-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between !important;
}
.unidade-table .v-data-footer{
  display: none;
}
</style>
