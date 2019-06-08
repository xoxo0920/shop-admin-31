import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import VueRouter from "vue-router"

// 1.引入element-ui
import ElementUI from 'element-ui';
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
//引入登录组件
import Login from "./pages/Login.vue"
//引入首页组件
import Admin from "./pages/Admin.vue"

//设置全局组件
Vue.use(ElementUI)
//设置路由组件
Vue.use(VueRouter) 
//创建路由实例
const routes = [
  {path:'/login',component:Login},
  {path:'/',component:Admin}
]

const router = new VueRouter({
  routes
})
//给原型对象绑定一个新的方法
Vue .prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //绑定到根实例
  router
}).$mount('#app')
