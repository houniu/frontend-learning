<template lang="html">
  <div class="test-wrap">
    <div class="marquee-wrap"><vue-marquee content="222222222" class="two" showtwo="false"></vue-marquee></div>
    <div class="marquee-wrap"><vue-marquee content="111111111" class="two" showtwo="false"></vue-marquee></div>
    <div class="marquee-wrap"><vue-marquee content="333333333" class="two" showtwo="false" speed="quick" ></vue-marquee></div>
    <div class="test-center">
      <div class="test-center__father">
        <div class="test-center__son"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookie from 'js-cookie'
  import vueMarquee from '@/vuepages/components/vue-marquee'
  import { convertArr } from '@/common/utils'

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
      log(convertArr([1,2,34,[45,56,[123]]]));
      Cookie.set('access-token', 'token', { expires: 7, domain: 'tv.sohu.com' });
    }
  };
</script>

<style lang="stylus">
.test
  font-size 24px
  color red
.marquee-wrap
  width 100px
  margin 0 auto
.test-center
  display inline-block
  &__father
    width 100px
    height 100px
    display table-cell
    vertical-align middle
    text-align center
    background-color #f5f5f5
  &__son
    width 50px
    height 50px
    background-color #e2e2e2
    display inline-block
</style>
