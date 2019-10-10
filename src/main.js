// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import messagebox from 'element-ui/lib/message-box'


Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.uris = process.env.API_URL
Vue.prototype.uriw = process.env.APIW_URL
Vue.prototype.urio = process.env.APIO_URL
Vue.prototype.MessageBox = messagebox

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
