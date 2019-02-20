import Vue from 'vue';

if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true;
}

export default (app, store) => {
  store = store || {};
  new Vue({
    el: '#app',
    store,
    components: { app },
  });
};
