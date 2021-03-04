<template>
 <div>
   <v-footer
       padless
      :outlined="true"
      :elevation="24"
      :fixed="true"
   >
     <v-col
         class="text-center"
         cols="12"

     >
       <strong> <v-icon style="color: black;" :size="18">mdi-copyright</v-icon> Saeedi Trading </strong>
     </v-col>
   </v-footer>
 </div>
</template>

<script>
export default {
name: "FooterComponent"
}
</script>

<style scoped>

</style>