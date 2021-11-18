<template>
    <v-dialog
        v-modal="dialog"
        transition="dialog-bottom-transition"
        class="unidade-modal"
        max-width="800px"
        @click:outside="$emit('input', false)"
        @keydown.esc="$emit('input', false)"
    >
    <template v-slot:activator="{ on, attrs }">
        <v-btn  class="mr-2"
                color="success"
                background="primary"
                slot ="activator"
                v-bind="attrs"
                v-on="on"
                >   
            Avaliar
        </v-btn>
    </template>
        <v-card>
            <v-container fluids>
                <v-row class="mx-auto">
                    <v-col :md="12" :sm="12" :xl="12" cols="12">
                        <v-form ref="formAvalia" v-model="valid" lazy-validation>
                            <v-card-title class="text-h5 unidade-modal-title">
                            Avaliar Médico
                            </v-card-title>
                            <v-cart-text>
                                <v-select
                                :items="items"
                                label="Status"
                                hide-details="auto"
                                >
                                </v-select>
                                <v-textarea
                                    hide-details="auto"
                                    :clearable="true"
                                    label="Observações"
                                />
                            </v-cart-text>
                        </v-form>   
                    </v-col>
                </v-row>
                <v-row class="mx-auto" >
                    <v-col :md="12" :sm="12" :xl="12" cols="12">
                        <v-file-input
                            accept="image/*"
                            label="Assinatura"
                            :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
                        />
                    </v-col>
                </v-row>
                <v-row class="mx-auto text-center" >
                    <v-col :md="12" :sm="12" :xl="12" cols="12">
                        <v-file-input
                            accept="image/*"
                            label="Arquivo Adicional"
                            :rules="[v => !v || v.size < 2000000 || 'Foto deve ser menor que 2 MB!',]"
                        />
                    </v-col>
                </v-row>    

                <v-row class="mx-auto text-center" >
                    <v-col>
                        <v-btn  class="mr-2"
                                color="grey"
                                background="primary"
                                slot ="activator"
                                v-bind="attrs"
                                v-on="on"
                                >   
                                Cancelar
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn  class="mr-2"
                                color="blue"
                                background="primary"
                                slot ="activator"
                                v-bind="attrs"
                                v-on="on"
                                >   
                                Avaliar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    data: () => ({
      items: ['Aprovado', 'Revisão', 'Negado'],
    }),
  }
</script>

<style>
.unidade-modal-title {
  margin-left: 0px;
}

.unidade-modal-title h4 {
  width: calc(100% - 37px);
  text-align: left;
  border-bottom: 1px solid #b7b7b7;
  line-height: 0.1em;
  margin: 20px 0 20px;
}

.unidade-modal-title h4 span {
  background: #fff;
  padding: 0 10px;
}

</style>