<template lang="html">
  <div class="test">
    <div class="marquee-wrap"><vue-marquee content="222222222" class="two" showtwo="false"></vue-marquee></div>
    <div class="marquee-wrap"><vue-marquee content="111111111" class="two" showtwo="false"></vue-marquee></div>
    <div class="marquee-wrap"><vue-marquee content="333333333" class="two" showtwo="false" speed="quick" ></vue-marquee></div>
  </div>
</template>

<script>
  import vueMarquee from '@/vuepages/components/vue-marquee'
  const { log } = console;
  export default {
    name: "index",
    components: {
      vueMarquee,
    },
    data() {
      return {}
    },
    methods: {},
    created() {},
    mounted() {
      log('mounted');
    }
  };
</script>

<style lang="stylus">
  .test
    font-size 24px
    color red
  .marquee-wrap {
    width: 100px;
    margin: 0 auto;
  }
</style>
