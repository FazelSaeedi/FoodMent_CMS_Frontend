<template>
  <div>

    <v-app id="inspire">

      <!--  navigation   -->
      <v-navigation-drawer
          v-model="drawer"
          app
          :right="true"
      >

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title class="title text-center">
              منو
            </v-list-item-title>
            <v-list-item-subtitle class="title text-center">
              FoodMent
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
          <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.link"

          >
            <v-list-item-content>
              <v-list-item-title class="center">{{ item.title }}</v-list-item-title>
            </v-list-item-content>


            <v-list-item-icon>
              <v-icon>{{ item.icon}}</v-icon>
            </v-list-item-icon>

          </v-list-item>

        </v-list>
      </v-navigation-drawer>



      <!--   Header    -->
      <v-app-bar
          app
          :collapse-on-scroll="false"
          :elevation="2"
      >
        <button @click="logout()"><v-icon style="color: black">mdi-login-variant</v-icon></button>

        <v-spacer></v-spacer>

        <v-toolbar-title >FoodMent</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-app-bar-nav-icon @click="navClick()" style="color: #000000"></v-app-bar-nav-icon>

      </v-app-bar>





      <v-main style=" background-color: #e0dcdc;
            ">
        <v-container >
          <router-view></router-view>
        </v-container>
      </v-main>


      <FooterComponent></FooterComponent>

    </v-app>
  </div>
</template>

<script>
import FooterComponent from "@/components/CMSComponent/FooterComponent";

export default {
  name: "CMSFraim",
  data: () => ({
    drawer: false ,
    items : [
    ]
  }),

  components: {
    FooterComponent
  },
  methods : {

    logout () {
      this.destroyToken()
          .then(this.$router.push({name : 'Authenticate'}))
    },

    navClick () {
      this.drawer = !this.drawer
    },

  }
}
</script>

<style scoped>

</style>