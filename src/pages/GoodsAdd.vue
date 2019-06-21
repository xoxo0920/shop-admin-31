<template>
    <div>
<el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="所属类型">
                <!-- //下拉选择框 -->
                <el-select v-model="form.category_id" placeholder="请选择活动区域">
                    <el-option 
                        v-for="(item, index) in categorys" 
                        :key="index"
                        :label="item.title" 
                        :value="item.category_id">
                    </el-option>
                </el-select>
            </el-form-item>

    <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
    </el-form-item>

<!-- 多选项 -->
<el-form-item label="推荐类型">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
</el-form-item>

  <el-form-item label="内容标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>


  <el-form-item label="副标题">
    <el-input type="textarea" v-model="form.sub_title"></el-input>
  </el-form-item>


  <!--图片上传功能  -->
  <el-form-item label="图片标题">
     <!-- action:上传地址 -->
     <!-- show-file-list:是否支持多张图片上传 -->
     <!-- on-success:上传成功后的回调函数 -->
     <!-- before-upload：上传之前执行的函数 -->
  <el-upload
  class="avatar-uploader"
  action="http://localhost:8899/admin/article/uploadimg"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <!-- 图片预览 -->
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <!-- 加号图标 -->
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
 </el-form-item>

 <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
    </el-form-item>    

 <!-- 上传多张图片 -->
<el-form-item label="图片相册">
  <!-- list-type:声明当前图片相册的方式显示 -->
  <!-- on-preview:预览的事件处理函数 -->
  <!-- on-remove:删除图片触发的事件 -->
  <!-- on-success:上传成功后的回调函数 -->
    <el-upload
    action="http://localhost:8899/admin/article/uploadimg"
    list-type="picture-card"
    :on-success="handleCartSuccess"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</el-form-item>

<el-form-item label="内容摘要">
        <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

  <!-- 富文本编辑器 -->
  <el-form-item label="内容描述">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">添加商品</el-button>
    <el-button>取消</el-button>
  </el-form-item>

</el-form>
    </div>
</template>

<script>
//导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//导入富文本编辑器的组件
import { quillEditor } from 'vue-quill-editor'
export default {
      components: {
        quillEditor
      },
     data() {
      return {
        form: {
          category_id:"",
          status:false,
          is_top:false,
          is_hot:false,
          title:"",
          sub_title:"",
          imgList:[],
          goods_no:"",
          stock_quantity:"",
          market_price:"",
          sell_price:"",
          fileList:[],//多张图片
          content:"",
          zhaiyao:"",


          is_slide:false//不属于商品添加的

        },
        //所属类别的数组
        categorys:[],
        imageUrl:'',//预览图片的地址
        dialogImageUrl: '',//多张图片预览时候的图片地址
        dialogVisible: false,//弹窗是否显示
      }
    },
    methods: {
      //图片上传

      //上传成功后的回调函数
        handleAvatarSuccess(res, file) {
          //设置图片地址
        this.imageUrl = URL.createObjectURL(file.raw);
        //把上传成功的结果赋值给from.imglist
        this.form.imgList = [res]
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        //判断图片大小有没大于2m
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        //如果返回false不会上传
        return isLt2M;
      },
      //多张图片删除的事件
       handleRemove(file, fileList) {
        console.log(file, fileList);
        // 把删除之后的列表赋值给this.form.fileList
        const files = fileList.map(v =>{
          console.log(v.response)
          //response是删除的id
          return v.response;
        })
        console.log(files)
        this.form.fileList = files;
      },
      //图片的预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //上传多张图片成功后的回调函数
      handleCartSuccess(res,file,fileList){
        // 把fileList的数组中的每一项中response属性提取出来
        console.log(fileList)
        const files = fileList.map(v =>{
          return v.response
        })
        console.log(files)
        this.form.fileList = files
      },
      //提交数据
      onSubmit(){
        //调用$axios提交数据提交到添加商品的接口
        this.$axios({
          url:"http://localhost:8899/admin/goods/add/goods",
          method:"POST",
          data:this.form,
          //处理session跨域
          withCredentials: true
        }).then(res =>{
          console.log(res)
          const {message,status} = res.data
          if(status === 0){
            console.log(123)
            //成功的提示
            this.$message.success(message)
            //返回上一页
            this.$router.back()
          }else{
            //返回到登录页
            this.$router.push("/login")
          }
        })
      }
    },
    mounted(){
        //请求类别数据
        this.$axios({
            url:"http://localhost:8899/admin/category/getlist/goods",
            method:"GET"
        }).then(res =>{
            // console.log(res.data)
            const {message,status} = res.data
            //将所有类型的数据保存到categorys
             this.categorys = message;
        })
    },
}
</script>

<style>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
