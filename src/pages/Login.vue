<template>
<div class="form-wrapper">
<el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form">

  <el-form-item label="账号" prop="username">
    <el-input v-model="form.username"></el-input>
  </el-form-item>

  <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" type="password"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
         username:"",
         password:"",
        },
        rules:{
          username:[
            { required: true, message: '请输入用户账号', trigger: 'blur' }
          ],
          password:[
            {
              required: true, message: '请输入密码', trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      //登录事件,提交账号密码到服务器
      onSubmit() {
        //提交到后台数据
        const data = {
          uname:this.form.username,
          upwd:this.form.password
        }
       console.log(data)
        // 验证表单
          // this.$refs.form.validate((valid) => {
          this.$refs.form.validate((valid)=> {
            //验证通过
            if(valid){
                this.$axios({
                 url:"http://localhost:8899/admin/account/login",
                 method:"POST",
                 data, 
                 //处理跨域
                 withCredentials: true
                }).then(res=>{
                  console.log(res)
                  //解构赋值
                  const {message,status} = res.data
                  //登录成功
                  if(status === 0){
                    this.$router.push("/")
                  }
                  if(status === 1){
                    this.$message.error(message)
                  }
                })
            }
          })
      }
    }
  }
</script>

<style>
  .form-warpper{
    width: 100%;
    position: absolute;
    top:0;
    bottom: 0;
  }
  .form{
    width: 500px;
    position: absolute;
    left:50% ;
    margin-left: -250px;
    top:50%;
    margin-top: -95px
  }
</style>
