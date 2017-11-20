{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#vuex}}  //vuex为true的时候就会写入这些
import Vuex from 'vuex'
import store from  './store/store'
Vue.use(Vuex)
{{/vuex}}

// 性能埋点，必须
import ZZPerf from '@zz/perf/src/vue'
Vue.use(ZZPerf,{
  projectPrefix:'{{ hump name }}'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }
  {{/if_eq}}
})
