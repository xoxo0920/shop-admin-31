<template>
  <div class="mianbao">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in info" :key=index>
          {{item}}
      </el-breadcrumb-item> 
          <!-- <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">商品列表</el-breadcrumb-item> --> 

    </el-breadcrumb>
  </div>
</template>

<script>
export default {
   data(){
     return {
       info:[]
     }
   },
   watch:{
     $route(){
      //  console.log(this.$route.matched)
       this.getRouter()
       console.log(this.info)
     }
   },
   methods:{
     getRouter(){
          // 获取到matched的每一项的meta信息
       const arr = this.$route.matched;
       let info = []
       //循环到每一项
       arr.forEach(v => {
          info.push(v.meta)
       });
       this.info = info
       console.log(this.info)
     }
   },
   mounted(){
    //  console.log(this.$route.matched)
     this.getRouter()
   }
}
</script>

<style scoped>
  .mianbao{
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    margin-bottom:20px;
  }
</style>
