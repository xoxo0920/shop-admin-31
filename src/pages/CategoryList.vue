<template>
  <div>
      <!-- data：组件接受的数据 -->
      <!-- show-checkbox：是否显示选择框 -->
      <!-- node-key：类似for循环中的：key -->
      <!-- default-expand-all：默认展开全部 -->
      <!-- expand-on-click-node：是否在点击节点的时候展开或者收缩节点 -->
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
    <!-- { node, data }:相当于{ node, data } = scope -->
    <!-- scope.data：代表每一行的数据对象 -->
    <!-- scope.node：代表每一行的数据对象  值包括id和label-->
      <span class="custom-tree-node" slot-scope="{ node,data }">
        <span>{{ data.title }}</span>
        <span>
          <input  :value="data.sort_id" @blur="handleBlur($event,data)" />
        </span>
        <span>
          <el-button type="text" size="mini">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
      }
    },

    methods: {
      handleBlur(event,data){
        console.log(data,event.target.value)
        //如果修改前后的值是相等的，不执行下面编辑
        if(data.sort_id == event.target.value){
            // console.log(data.sort_id)
            // console.log(event.target.value)
            return
        }
        //通过弹窗询问是否编辑
        var res = window.confirm("是否编辑?")
        if(res){
          this.$axios({
            url:"http://localhost:8899/admin/category/edit/" + data.category_id,
            method:"POST",
            data:{
              ...data,
              //使输入框得到值覆盖sort_id
              sort_id:event.target.value
            },
             //处理session跨域
          withCredentials: true
          }).then(res =>{
            // console.log(res)
            this.getList()
            this.$message.success("修改成功")
          })
        }
      },
      //请求列表数据
      getList(){
          this.$axios({
          url:"http://localhost:8899/admin/category/getlist/goods",
          method:"Get",
        }).then(res =>{
          // console.log(res.data)
          const {message,status} = res.data
          if(status === 0){
            //把列表的值赋值给data，渲染到树形控件
            this.data = message
          }
        })
      }
    },
    mounted(){
      this.getList()
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .custom-tree-node input{
    width: 70px;
    height: 20px !important;
  }
</style>
