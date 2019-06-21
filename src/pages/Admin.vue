<template>
  <el-container>

      <el-aside width="auto">
        <Menu :isShow="isShow"/>
          <!-- aside -->
        </el-aside>
      <el-container>
        <el-header>
          <Header  @click="handleChangeShow"/>
          </el-header>
        <el-main>
          <Mianbao/>
          
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    
</template>

<script>
//引入头部组件
import Header from "../components/Header.vue"
//引入面包屑组件
import Mianbao from "../components/Mianbao.vue"
//引入左边菜单栏组件
import Menu from "../components/Menu.vue"
export default {
    data(){
      return{
        //控制菜单展开收起
        isShow:false
      }
    },
    components:{
      Header,
      Mianbao,
      Menu
    },
    methods:{
      handleChangeShow(){
        this.isShow = !this.isShow
      }
    }
};
</script>

<style>
    .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #001529;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
  }
  /* 重新修改高 */
   body > div >.el-container {
        position: absolute;
        top:0;
        bottom:0;
        width:100%;
    }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
