<template>
  <div>
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
  </div>
</template>

<script>
export default {
name: "NavBarAuthentication" ,
props : ['switchComponent']
}
</script>

<style scoped>
.hover:hover {
  background-color: #888787
}

.v-messages__wrapper{
  text-align: center;
}
</style>