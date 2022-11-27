import Vue from 'vue'
import App from './App.vue'
//1. 按需引入表格
import ElementUI from 'element-ui';
//2. 引入样式库
import 'element-ui/lib/theme-chalk/index.css';
//3. 引入路由组件
import VueRouter from 'vue-router';
//4. 引入路由器
import router from '@/router';
//5.引入store
import store from './store'
//引入axios
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = '/api/'

Vue.config.productionTip = false

// 原型上挂载axios， 所有组件都可以通过this.$http来请求
Vue.prototype.$http = axios

//6. 使用表格
Vue.use(VueRouter)
Vue.use(axios)
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')
