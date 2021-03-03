<template>
<div>
  <v-app id="app">
    <v-main>
      <v-container fill-height fluid >
        <v-row justify="center" style="padding-bottom: 150px !important;">
          <v-col
              cols="12"
              sm="7"
              md="6"
              lg="3"

          >

            <v-card ref="form" class="pr-2 pl-2 " style="opacity: 0.95; background-color: #ffffff ; border-radius: 25px;" elevation="15">
              <NavBarAuthentication :switchComponent="switchComponent"></NavBarAuthentication>



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
export default {
name: "Authenticate",
  components: {NavBarAuthentication},
  data () {
    return {
      show: false,
      switchComponent : true
    }
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