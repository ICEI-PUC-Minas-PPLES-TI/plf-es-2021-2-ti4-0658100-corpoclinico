<template>
<!--Container-->
<v-container fluid style="overflow: auto; padding:6vh;">
    <v-card class="mx-auto" width="100%">
        <div class="div-titulo-btn">
            <v-card-title>
                <span class="text-h6">Administradores</span>
            </v-card-title>
            <v-card-actions>
                <v-btn color="success" background="primary" @click="abreModal(0)">
                    Criar usuário
                </v-btn>
                <modal v-model="modalAtivo" v-bind:usuarioId="usuarioId" />
            </v-card-actions>
        </div>
        <v-card-text class="text-h5 ">
            <template>
                <v-data-table :headers="headers" :items="usuarios" :items-per-page="5" class="elevation-1">
                    <template v-slot:item.tipo="{ item }">
                        {{ formataTipo(item.tipo) }}
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
                        <v-btn color="primary" @click="initialize">
                            Reset
                        </v-btn>
                    </template>
                </v-data-table>
            </template>
        </v-card-text>
    </v-card>
</v-container>
</template>

<script src="./index.js"> </script>

<style>
.div-titulo-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between !important;
}
</style>
