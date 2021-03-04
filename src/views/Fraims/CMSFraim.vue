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
            <v-list-item-subtitle class="title text-center">
              {{ this.getUserPhone }}
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
        <AlertComponent v-for="(alert , key) in this.getAlerts" v-bind:key="key" :message="alert.message" :type="alert.type">
        </AlertComponent>
        <v-container >
          <SnackbarComponent v-for="(snackbar , key) in this.getSnackbars" v-bind:key="key" :message="snackbar.message" :color="snackbar.color"></SnackbarComponent>
          <router-view></router-view>
        </v-container>
      </v-main>


      <FooterComponent></FooterComponent>

    </v-app>
  </div>
</template>

<script>
import FooterComponent from "@/components/CMSComponent/FooterComponent";
import {mapActions} from "vuex/dist/vuex.mjs";
import AlertComponent from "@/components/CMSComponent/AlertComponent";
import {mapGetters} from "vuex";
import SnackbarComponent from "@/components/GlobalComponent/SnackbarComponent";

export default {
  name: "CMSFraim",
  data: () => ({
    drawer: false ,
    alerts : [],
    items : [
      { title : 'ماهیت'  , icon : 'mdi-animation'  , link : {name : 'type'}},
      { title : 'گروه اصلی'  , icon : 'mdi-animation'  , link : {name : 'MainGroupFraim'}},
      { title : 'گروه فرعی'  , icon : 'mdi-animation'  , link : {name : 'SubGroupFraim'}},
      { title : 'محصولات'  , icon : 'mdi-animation'  , link : {name : 'ProductFraim'}},
      { title : 'رستوران ها'  , icon : 'mdi-animation'  , link : {name : 'RestrauntFraim'}},
    ]
  }),
  computed: {

    ...mapGetters({
      getAlerts : 'GlobalModul/getAlerts',
      getSnackbars : 'GlobalModul/getSnackbar',
      getUserPhone : 'UserModul/getUserPhone'
    })
  },
  created() {
        this.clearAlerts()
        this.checkUserLogin().then().catch(error => {
         if (error == 'Error: Network Error'){
           alert(error)
           this.setAlert({message : 'You are disconnected Please Check Your Network' , type : 'error'})
         }else{
           this.$router.push({name : 'Authenticate'})
         }

          console.log(error)

       })
  },

  components: {
    SnackbarComponent,
    AlertComponent,
    FooterComponent
  },
  methods : {

    ...mapActions({
      destroyToken : 'UserModul/destroyToken',
      checkUserLogin : 'UserModul/checkUserLogin',
      setAlert : 'GlobalModul/setAlert',
      clearAlerts : 'GlobalModul/clearAlerts',
      setSnackbar : 'GlobalModul/setSnackbar'
    }),


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