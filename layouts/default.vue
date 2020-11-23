<template>
  <div class="layout">
    <Nuxt />
    <InterFace v-show="showInterFace" />
  </div>
</template>

<script>
export default {
  computed: {
    showInterFace() {
      return this.$route.name !== 'index' && this.$route.name !== 'finished';
    },
  },
};
</script>
