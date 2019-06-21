import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import VueRouter from "vue-router"

// 1.引入element-ui
import ElementUI from 'element-ui';
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
//导入vuex的store
import store from "./store"
//引入登录组件
import Login from "./pages/Login.vue"
//引入后台其它组件
import Admin from "./pages/Admin.vue"
import GoodsList from "./pages/GoodsList.vue"
import CategoryList from "./pages/CategoryList.vue"
import GoodsAdd from "./pages/GoodsAdd.vue"
import GoodsEdit from "./pages/GoodsEdit.vue"
//设置ElementUI组件
Vue.use(ElementUI)
//设置路由组件
Vue.use(VueRouter) 
//创建路由实例
const routes = [
  {path:"/",redirect: "/admin/goods-list",meta: "首页"},
  {path:'/login',component:Login,meta: "首登录"},
  {path:'/admin',component:Admin,meta: "后台管理",children:[
    {
      path:"goods-list",component:GoodsList,meta: "商品列表"
    },
    { 
      path:"category-list",component:CategoryList,meta: "栏目列表"
    },
    {path:"goods-add",component:GoodsAdd,meta:"新增商品"},
    {path:"goods-edit/:id",component:GoodsEdit,meta:"编辑商品"}
  ]}
]
//；路由实例
const router = new VueRouter({
  routes
})
//路由守卫
//from:页面的来源
//to：去哪个页面
//netx：可以接收参数，参数是url可以跳转到该url。如果不传参数会跳转到from页面
//next（）方法是必须要调用额
router.beforeEach((to,from,next) =>{
  //判断是否是登录
  axios({
    url: "http://localhost:8899/admin/account/islogin",
    method:"Get",
     //处理session跨域
     withCredentials: true
  }).then( res =>{
    console.log(res)
    const {code} = res.data
    //访问的页面是登录页
    if(to.path === "/login"){
      //如果已经登录了
      if(code === "logined"){
        next("/admin/goods-list")
      }else{
        next()
      }
    }else{
      //非登录页
      //是否是登录的，如果已经登录
      if( code === "logined"){
        next()
      }else{
        next("/login")
      }
    }
  })
})
//给原型对象绑定一个新的方法
Vue .prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //绑定到根实例
  router,
  //仓库的对象
  store
}).$mount('#app')
