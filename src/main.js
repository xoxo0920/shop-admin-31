import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

// 1.引入element-ui
import ElementUI from 'element-ui';
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

//设置全局组件
Vue.use(ElementUI)

//给原型对象绑定一个新的方法
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
