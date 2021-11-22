<template>
  <v-app class="corpo">
    <v-app-bar
      color="#007970"
      class="d-block d-md-none"
      dark
      max-height="55px"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Cadastro de Corpo Clínico</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="text--accent-4"
        >
          <v-list-item v-for="(mn, mndx) in menus" :key="mndx" :to="mn.link" :disabled="mn.disabled">
            <v-list-item-icon>
              <v-icon>{{ mn.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ mn.nome }}</v-list-item-title>
          </v-list-item>
          <hr>
          <v-list-item disabled>
            <v-list-item-icon><v-icon>mdi-account-outline</v-icon></v-list-item-icon>
                <v-list-item-title>Usuario Nome</v-list-item-title>
          </v-list-item>
          <v-list-item disabled>
            <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container fluid class="corpo-clinico">
      <v-row class="corpo-clinico-header d-none d-md-flex">
        <v-col :md="4">
          <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.4714 1.13725L21.9341 0.660259C21.4693 0.516928 20.9732 0.76952 20.8259 1.22536L20.0243 3.71956L23.2449 4.71701L24.0477 2.22281C24.1951 1.76697 23.9363 1.28058 23.4714 1.13725ZM23.0221 5.40782L19.0238 17.8307L16.5329 20.0676L15.8032 16.8332L19.8014 4.41037L23.0221 5.40782Z" fill="#007970"/>
            <path d="M6.7667 7.7117H15.4521C15.7396 7.7117 15.9709 7.9408 15.9709 8.22276C15.9709 8.50355 15.7396 8.73265 15.4521 8.73265H6.7667C6.47795 8.73265 6.24431 8.50355 6.24431 8.22276C6.24431 7.9408 6.47795 7.7117 6.7667 7.7117ZM6.7667 2.45426H15.4521C15.7396 2.45426 15.9709 2.68335 15.9709 2.96532C15.9709 3.24611 15.7396 3.4752 15.4521 3.4752H6.7667C6.47795 3.4752 6.24431 3.24611 6.24431 2.96532C6.24431 2.68335 6.47795 2.45426 6.7667 2.45426ZM4.50939 4.36574H1.6518V1.56372H4.50939V4.36574ZM4.50939 9.62318H1.6518V6.82117H4.50939V9.62318ZM4.50939 14.8806H1.6518V12.0786H4.50939V14.8806ZM4.50939 20.1369H1.6518V17.3361H4.50939V20.1369ZM6.7667 12.968H15.4521C15.6797 12.968 15.8702 13.1137 15.9409 13.3122L17.9562 7.05144V0H0.00195312V23H17.9562V20.0511L15.9613 21.8428L15.3754 19.2452H6.7667C6.47795 19.2452 6.24431 19.0184 6.24431 18.7353C6.24431 18.4545 6.47795 18.2254 6.7667 18.2254H15.1454L14.8219 16.7909L15.754 13.8938C15.6689 13.9548 15.5647 13.9901 15.4521 13.9901H6.7667C6.47795 13.9901 6.24431 13.761 6.24431 13.479C6.24431 13.1982 6.47795 12.968 6.7667 12.968Z" fill="#007970"/>
          </svg>
          <h1>Cadastro de Corpo Clínico</h1>
        </v-col>
        <v-col :md="4">
          <v-bottom-navigation v-model="nomeMenu" background-color="fff" color="#007970" class="corpo-clinico-header-menu" height="40px">
            <v-btn v-for="(mn, mnidx) in menus" :key="mnidx" text :value="mn.nome" :disabled="mn.disabled" :to="mn.link">
              <span>{{ mn.nome }}</span>
              <v-icon>{{ mn.icon }}</v-icon>
            </v-btn>
          </v-bottom-navigation>
        </v-col>
        <v-col :md="4" class="corpo-clinico-header-user">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="#007970"
                size="35px"
                v-bind="attrs"
                v-on="on"
              >
                mdi-account-circle
              </v-icon>
            </template>
            <v-list>
              <v-list-item disabled>
                <v-list-item-icon><v-icon>mdi-account-outline</v-icon></v-list-item-icon>
                <v-list-item-title>Usuario Nome</v-list-item-title>
              </v-list-item>
              <v-list-item disabled>
                <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
                <v-list-item-title>Sair</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col :sm="12" cols="12">
          <Nuxt />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      nomeMenu: null,
      drawer: false,
      menus: [
        {
          nome: 'Candidaturas',
          icon: 'mdi-thumb-up-outline',
          link: '/',
          disabled: true
        },{
          nome: 'Usuários',
          icon: 'mdi-account-circle-outline',
          link: '/usuario',
        },{
          nome: 'Equipes',
          icon: 'mdi-account-group-outline',
          link: '/equipe',
        },{
          nome: 'Medicos',
          icon: 'mdi-doctor',
          link: '/medico',
        },{
          nome: 'Unidades',
          icon: 'mdi-hospital-building',
          link: '/unidade'
        },{
          nome: 'Relatórios',
          icon: 'mdi-chart-box-outline',
          link: '/',
          disabled: true
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Doppio+One&display=swap');
  .corpo-clinico, .corpo {
    background: #F2F2F2;
  }
  .corpo-clinico {
    &-header{
      background: #fff;
      border-bottom: 1px solid #B0B0B0;
      h1 {
        color: #007970;
        display: inline-block;
        font-size: 1.2rem;
        font-family: 'Doppio One', sans-serif;
      }
      &-menu{
        box-shadow: none !important;
      }
      &-user{
        text-align: right;
      }
    }
  }
</style>
