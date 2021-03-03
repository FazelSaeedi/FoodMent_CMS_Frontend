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


              <v-row no-gutters class="mb-3 mt-4 " style="border-bottom: 1px solid black ;  cursor: pointer" >



                <v-col class="text-center mt-6 " @click="switchComponent=true"
                       cols="6"
                >
                  <v-card-text class="hover pl-6" style="font-size: 23px ; height: 60px ; border-radius: 50px" >ورود</v-card-text>
                </v-col>




                <v-col class="text-center mt-6 mb-7"
                       cols="6"
                >
                  <v-card-text class="hover"  style="font-size: 23px ; height: 60px ;  border-radius: 50px">ثبت نام</v-card-text>
                </v-col>
              </v-row>



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
                  >

                  </v-text-field>

                </v-row>
                <v-card-actions class="justify-center pa-6" >
                  <v-btn color="yellow"
                         style="font-size: 20px"
                         width="180"
                         height="40"
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
export default {
name: "Authenticate",
  data () {
    return {
      show: false,
      switchComponent : false
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


.hover:hover {
  background-color: #888787
}

.v-messages__wrapper{
  text-align: center;
}

</style>