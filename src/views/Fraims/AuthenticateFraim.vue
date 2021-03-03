<template>
<div>
  <v-app id="app">
    <v-main>
      <v-container fill-height fluid >
        <v-row justify="center" style="padding-bottom: 150px !important;">
          <v-col
              cols="12"
              sm="7"
              md="5"
              lg="4"
          >

            <v-card ref="form" class="pr-2 pl-2 " style="opacity: 0.95; background-color: #ffffff ; border-radius: 25px;" elevation="15">
              <NavBarAuthentication :switchComponent="switchComponent"></NavBarAuthentication>


              <v-card-text  class="pr-15 pl-15" >
                <div v-if="switchComponent">
                  <v-card-text class="pb-0 text-center pt-5   "  style="font-size: 20px">تلفن</v-card-text>
                  <v-text-field
                      style="font-size: 25px"
                      class="centered-input  pt-6 "
                      ref="name"
                      placeholder="09xx - xxx - xxx"
                      align="center"
                      clearable
                      v-model="phone"
                  >
                  </v-text-field>
                  <v-row>
                    <v-card-text class="pb-0 text-center pt-12 " style="font-size: 20px">رمز عبور</v-card-text>

                    <v-text-field
                        style="font-size: 25px"
                        class="centered-input  pt-6 "
                        ref="name"
                        align="center"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        hint="حد اقل ۸ کاراکتر"
                        counter
                        clearable
                        @click:append="show = !show"
                        v-model="password"
                    >

                    </v-text-field>

                  </v-row>
                  <v-card-actions class="justify-center pa-6" >
                    <v-btn color="yellow"
                           style="font-size: 20px"
                           width="180"
                           height="40"
                           @click="login()"
                    >
                      ورود
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-card-text>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</div>
</template>

<script>
import NavBarAuthentication from "@/components/Authentication/NavBarAuthentication";
import {mapGetters} from 'vuex'


export default {
name: "Authenticate",
  components: {NavBarAuthentication},
  computed: {

    ...mapGetters({
      jwt : 'userModul/jwt'
    }) ,
  },
  data () {
    return {
      show: false,
      switchComponent : true,
      phone : '' ,
      password : '',
    }
  },
  beforeCreate(){
    if (!this.jwt){
      this.$router.push({name : 'Panel'})
    }
  },
  methods :{
    login() {
        alert('login')
        alert(this.jwt)
    },
  }
}
</script>

<style >
#app{
  background-image: url('https://wallup.net/wp-content/uploads/2017/03/29/490310-Fries-tomatoes-food.jpg');
}

.centered-input input {
  text-align: center;

}

.centered-input label{
  width: 100%;
  text-align: center;
}

.centered-input input::-webkit-input-placeholder {
  text-align: center;
}

.centered-input input::-moz-placeholder { /* Firefox 18- */
  text-align: center;
}

.centered-input input::-moz-placeholder {  /* Firefox 19+ */
  text-align: center;
}

.centered-input input::-ms-input-placeholder {
  text-align: center;
}




</style>