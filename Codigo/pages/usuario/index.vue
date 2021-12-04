<template>
  <!--Container-->
  <v-container fluid style="overflow: auto; padding: 6vh">
    <v-card class="mx-auto" width="100%">
      <v-card-title>
        <span class="text-h6">Administradores</span>
      </v-card-title>

      <div class="div-btn">
        <v-card-actions>
          <v-btn color="success" background="primary" @click="abreModal(0)">
            Criar usuário
          </v-btn>
          <modal v-model="modalAtivo" v-bind:usuarioId="usuarioId" />
        </v-card-actions>
      </div>
      <v-card-text class="text-h5">
        <template>
          <v-data-table
            :headers="headers"
            :items="usuarios"
            :items-per-page="-1"
            :loading="tabelaCarregando"
            :disable-sort="true"
            :footer-props="{
              'disable-items-per-page': true,
              'disable-pagination': true
            }"
            class="usuario-table"
          >
            <template v-slot:item.data_excluido="{ item }">
              {{ formataStatus(item.data_excluido) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon color="success" class="mr-2" @click="abreModal(item.id)">
                mdi-square-edit-outline
              </v-icon>
              <v-icon color="success" @click="deleteUsuario(item.id)">
                mdi-trash-can-outline
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </template>
        <v-pagination
          v-model="tabelaPaginaAtual"
          :length="tabelaPaginas"
          @input="listaUsuarios"
        />
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

<script src="./index.js">
</script>

<style>
.div-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.usuario-table .v-data-footer{
  display: none;
}
</style>
