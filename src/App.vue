<template>
  <div>
    <router-view></router-view>
    <overlay-component></overlay-component>
  </div>
</template>

<script>

import OverlayComponent from "@/components/GlobalComponent/OverlayComponent";
export default {
  name: 'App',

  components: {
    OverlayComponent
  },

  data: () => ({
    //
  }),
};
</script>
