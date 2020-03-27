// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import messagebox from 'element-ui/lib/message-box'
import Carousel from 'element-ui/lib/carousel'
import CarouselItem from 'element-ui/lib/carousel-item'
import Image from 'element-ui/lib/image'

import common from '../common/common'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.uris = process.env.API_URL
Vue.prototype.urim = process.env.APIM_URL
Vue.prototype.uriw = process.env.APIW_URL
Vue.prototype.urio = process.env.APIO_URL
Vue.prototype.utils = common.utils
Vue.prototype.MessageBox = messagebox
Vue.prototype.imguri = process.env.IMG_URL

Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(Image.name, Image)

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
