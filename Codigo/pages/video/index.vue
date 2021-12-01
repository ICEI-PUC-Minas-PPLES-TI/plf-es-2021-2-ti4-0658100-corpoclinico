<template>
    <!--Container-->
    <v-container fluid style="overflow: auto; padding: 6vh">
        <v-card class="mx-auto" width="100%">
            <v-card-title>
                <span class="text-h6">Videos</span>
            </v-card-title>

            <div class="div-btn">
                <v-card-actions>
                    <v-btn
                        color="success"
                        background="primary"
                        @click="abreModal(0)"
                    >Adicionar video</v-btn>
                </v-card-actions>

                <modalVideo
                    v-model="modalVideoAtivo"
                    @abreToast="abreToast"
                    v-bind:videoId="videoId"
                />
            </div>
            <v-card-text class="text-h5">
                <template>
                    <v-data-table :headers="headers" :items="videos" :items-per-page="20">

                        <template v-slot:item.sobe="{ item }">
                            <v-icon
                                color="success"
                                class="mr-2"
                                @click="sobeItem(item)"
                                v-if="item.prioridade >= 1"
                            >mdi-arrow-up</v-icon>
                        </template>

                        <template v-slot:item.desce="{ item }">
                            <v-icon
                                color="success"
                                class="mr-2"
                                @click="desceItem(item)"
                                v-if="item.prioridade != total"
                            >mdi-arrow-down</v-icon>
                        </template>

                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                color="success"
                                class="mr-2"
                                @click="abreToast('Em desenvolvimento')"
                            >mdi-square-edit-outline</v-icon>
                        </template>
                    </v-data-table>
                </template>
            </v-card-text>
        </v-card>

        <v-snackbar v-model="toast" shaped>
            {{ toastMensagem }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="toast = false">Ok</v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
import modalVideo from "@/components/video/modal.vue";

export default {
    components: {
        modalVideo,
    },

    data() {
        return {
            headers: [
                { text: "Link", value: "link" },
                { text: "Ordem", value: "prioridade" },
                { text:"Sobe", value:"sobe"},
                { text: "Desce", value:"desce"},
                { text: "Ação", value: "actions", sortable: false },
            ],
            videos: [
                {
                    id: "",
                    link: "",
                    prioridade: "",
                    ativo: ""
                },
            ],

            toast: false,
            toastMensagem: "",
            modalVideoAtivo: false,
            videoId: "",
            total: 1
        };
    },
    watch: {
        modalVideoAtivo: function (modalVideoAtivo) {
            modalVideoAtivo ? false : this.listavideos();
        },
    },
    mounted() {
        this.listavideos();
    },
    methods: {
        listavideos() {
            this.$axios
                .$get("/video")
                .then((response) => {
                    this.videos = response;
                    this.total = this.videos.length;
                })
                .catch((error) => {
                    this.abreToast(error)
                });
        },

        abreModal(id) {
            if (id) {
                this.modalVideoAtivo = !this.modalVideoAtivo;
                this.videoId = id;
            } else {
                this.modalVideoAtivo = !this.modalVideoAtivo;
                this.videoId = 0;
            }
        },

        abreToast(mensagem) {
            this.toastMensagem = mensagem;
            this.toast = true;
        },

        desceItem(item) {
            item.prioridade = item.prioridade + 1;

            this.$axios.$put("/video/" + item.id, JSON.parse(JSON.stringify(item))).then((response) => {
                this.listavideos();
            }).catch((error) => {
                this.abreToast(error)
            });
        },

        sobeItem(item){
            item.prioridade = item.prioridade - 1;

            this.$axios.$put("/video/" + item.id, JSON.parse(JSON.stringify(item))).then((response) => {
                this.listavideos();
            }).catch((error) => {
                this.abreToast(error)
            });
        }
    },
};
</script>

<style>
.div-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
}
</style>
