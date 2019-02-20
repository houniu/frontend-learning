<template lang="html">
  <div class="test">test</div>
</template>

<script>
  const { log } = console;
  export default {
    name: "index",
    components: {},
    data() {
      return {}
    },
    methods: {},
    created() {
      log('created');
    },
    mounted() {
      log('mounted');
    }
  };
</script>

<style scoped lang="stylus">
  .test
    font-size 24px
    color red
</style>
