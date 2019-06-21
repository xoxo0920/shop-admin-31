<template>
<div>
    <!-- 商品列表的头部 -->
    <el-row type="flex" justify="space-between">
      <div>
        <el-button @click="handleToGoodsAdd">新增</el-button>
        <el-button type="danger" @click="handleDeleteMore">删除</el-button>
      </div>
      <!-- 搜索输入框 -->
      <div class="input-search">
        <!-- 把值绑定到searchValue -->
    <el-input placeholder="请输入内容" class="input-with-select" v-model="searchValue">
      <el-button slot="append" icon="el-icon-search" @click="handleSearch"
      ></el-button>
    </el-input>
    </div>
    </el-row>

      <!-- 商品列表的表格 -->
    <!-- data是表格的数据 -->
    <!-- selection-change：选择每一项的时候触发的事件 -->
      <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%;margin-top:20px"
    @selection-change="handleSelectionChange">

    <!-- type="selection"：表格可以选择 -->
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <!-- 自定义模板 -->
    <!-- template的slot-scoped的值模板的scope -->
    <!-- scope.row是每一项数据的对象 -->
    <el-table-column
      label="标题"
      width="300">
       <template slot-scope="scope">
                    <el-row type="flex" align="middle">
                        <img :src="scope.row.imgurl" class="goods-img"/>
                        <div>
                            {{scope.row.title}}
                        </div>
                    </el-row>
      </template>
    </el-table-column>

    <el-table-column
      prop="categoryname"
      label="类型"
      width="120">
    </el-table-column>

    <el-table-column
      prop="sell_price"
      label="价格"
      show-overflow-tooltip>
    </el-table-column>

    <!-- 编辑和删除按钮 -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


  <!-- 分类功能 -->
  <!-- size-change:显示条数数据 -->
  <!-- current-change:页数切换 -->
  <!-- current-page:当前的页数 -->
  <!--  page-sizes:条数的选项-->
  <!-- page-size:当前的条数 -->
  <!-- layout:默认布局 -->
  <!-- total:数据全部条数 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>

<script>
export default {
   data() {
      return {
        tableData: [
          {
            id: 103,        
            title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
            is_top: 1,
            is_hot: 1,
            is_slide: 1,      
            categoryname: "男装",
            img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
            imgurl:"http://127.0.0.1:8899/upload/201504/20/thumb_201504200214471783.jpg",
            goods_no: "NZ0000000002",
            stock_quantity: 200,
            market_price: 1000,
            sell_price: 800   
        }
        ],
        //这是一个选中的商品
        selectGoods:[],
        //搜索关键字
        searchValue:"",
        pageIndex:1,//默认的页面，随着页面的切换而变换
        total:0,//这是总条数
        pageSize:5,//页面显示条数
      }
    },
    mounted(){
      this.getList()
    },

    methods: {
      //跳转到新增商品页
      handleToGoodsAdd(){
        this.$router.push("/admin/goods-add")
      },
      //用来请求列表数据的
      getList(){
        this.$axios({
        url:`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`,
        method:"Get"
      }).then(res =>{
        console.log(res)
        console.log(res.data)
        const data = res.data
        //商品列表的数据
        this.tableData = data.message;
        //总条数
        this.total = data.totalcount
      })
      },
      //选择每一项的时候触发
      handleSelectionChange(val) {
        // console.log(val)
        this.selectGoods = val;
      },
      //编辑商品
      handleEdit(goods){
      //  console.log(goods)
       this.$router.push("/admin/goods-edit/" + goods.id)
      },
      //搜索商品
      handleSearch(){
        //获取输入框的值,赋值给searchvalue
        this.getList()
      },
      //删除商品
      handleDelete(goods){
         //获取的商品的id
        const id = goods.id
        //调用删除商品的接口
        this.$axios({
          url:`http://localhost:8899/admin/goods/del/${id}`,
          method:"GET"
        }).then(res =>{
          const {message,status} = res.data
          //删除成功
          if(status ===0){
            this.$message.success(message)

            //调用一下刷新页面的
            this.getList()
            //删除失败
          }else{
            this.$message.error(message);
            
          }
        })
      },
      //条数的切换
      handleSizeChange(val) {
        //保存当前的条数
        this.pageSize = val;

        this.getList()
      },
      //页数的切换
      handleCurrentChange(val) {
        //保存当前页面
        this.pageIndex = val ;
        //重新发送请求
        this.getList()
      },
      handleDeleteMore(){
        //获取的id
        const arr =this.selectGoods.map(v =>{
          return v.id
        })
        console.log(arr)
        const ids = arr.join(",")
        //调用商品删除接口
        this.$axios({
          url:`http://localhost:8899/admin/goods/del/${ids}`,
          method:"GET"
        }).then(res =>{
          const {message,status} = res.data
          //删除成功
          if(status ===0){
            this.$message.success(message)

            //调用一下刷新页面的
            this.getList()
            //删除失败
          }else{
            this.$message.error(message);
            
          }
        })
      }
    },
};
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .input-search{
      width:200px;
  }
  .goods-img{
      width:60px;
      height:60px;
      /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
      flex-shrink: 0;
      margin-right:5px;
  }
</style>
