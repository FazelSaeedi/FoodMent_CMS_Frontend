<template>
  <div>
    <v-alert :type="type" class="mr-2 ml-2 mt-2"
    elevation="5"
    close-icon="mdi-close"
    dismissible
    >
      {{ message }}
    </v-alert>

  </div>
</template>

<script>
export default {
  props : ['message' , 'type'],
  name: "AlertComponent",
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>