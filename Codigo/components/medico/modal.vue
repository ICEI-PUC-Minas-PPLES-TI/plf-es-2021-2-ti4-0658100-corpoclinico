<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        class="unidade-modal"
        width="800px"
        @click:outside="$emit('input', false)"
        @keydown.esc="$emit('input', false)"
    >
    <template v-slot:activator="{ on, attrs }">
        <v-btn  color="blue"
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
                            <v-card-text>
                                <v-select
                                :items="items"
                                label="Status"
                                hide-details="auto"
                                :rules="[v => !!v || 'Status Obrigatório']"
                                >
                                </v-select>
                                <v-textarea
                                    hide-details="auto"
                                    :clearable="true"
                                    label="Observações"
                                    :rules="[v => !!v || 'Observações obrigatórias']"
                                />
                            </v-card-text>
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
                <v-card-actions>
                <v-row class="mx-auto text-center" >
                    <v-col>
                        <v-btn  class="mr-2"
                                color="grey"
                                background="primary"
                                @click="dialog = false"
                                >   
                                Cancelar
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn  class="mr-2"
                                color="blue"
                                background="primary"
                                slot ="activator"
                                @click="submitAvaliacao"
                                >   
                                Avaliar
                        </v-btn>
                    </v-col>
                </v-row>
                </v-card-actions>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    data: () => ({
      items: ['Aprovado', 'Revisão', 'Negado'],
      valid:true,
      dialog:false,
    }),
    methods:{
        submitAvaliacao() {
            // if(this.unidade.id > 0){
            // this.updateUnidade(this.unidade.id);
            // }else{
            //     if (this.$refs.formUnidade.validate()){
            //         let unidade = JSON.parse(JSON.stringify(this.unidade))
            //         this.$axios.$post('/unidade', unidade).then(response => {
            //         this.limpaDados();
            //         this.abreToast('Unidade Cadastrada!');
            //         this.$emit('input', false) // Fecha modal
            //         this.$emit('listaUnidade')
            //         }).catch(error => {

            //         if (Array.isArray(error.response.data.erros)) {
            //             this.abreToast(error.response.data.erros[0]);
            //         } else {
            //             this.abreToast(error.response.data.erros);
            //         }

            //         })

            //     }
            // } 
            alert("oh my god")
        }
    }
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