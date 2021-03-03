<template>
  <v-overlay
      :opacity="0.7"
      :value="overlay"
      absolute
      :z-index="overlayZindex"
  >
    <v-progress-circular indeterminate size="100">
      Loading...
    </v-progress-circular>
  </v-overlay>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "OverlayComponent" ,
  data () {
    return {
      overlayZindex : 1000,
    }
  },

  computed : {
    ...mapGetters({
       overlay : 'GlobalModul/overlay'
    })
  }
}
</script>

<style scoped>

</style>