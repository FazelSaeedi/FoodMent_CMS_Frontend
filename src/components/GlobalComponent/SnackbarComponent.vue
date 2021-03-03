<template>
  <v-snackbar
      v-model="snackbar"
      top
      :color="color"
      :timeout="2000"
  >

    {{ message }}
    <v-spacer></v-spacer>

    <template v-slot:action="{ attrs }">

      <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>


  </v-snackbar>
</template>

<script>
export default {
  name: "SnackbarComponent",
  props : ['message' , 'color'],
  data (){
    return {
      snackbar : true
    }
  }
}
</script>

<style scoped>

</style>