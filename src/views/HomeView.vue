<template>
  <div class="home">
    <div id="login-box">
      <h1>登录</h1>
      <el-form ref="loginForm" :rules="loginRules" :model="loginData" label-width="80px">
        <el-form-item label="Username" prop="username">
          <el-input v-model.trim="loginData.username" name="username" class="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model.trim="loginData.password" name="password" class="el-icon-lock"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="loginBtn">登录</el-button>
      <el-button type="primary" @click="register">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginData: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginBtn () {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return this.$message.error('请填写正确的用户信息！')
        const { data: res } = await this.$http.post('/api/login', this.loginData)
        console.log(res)
        if (res.status !== 0) {
          return this.$message.error('登陆失败！')
        }
        this.$message.success(res.message)
        window.sessionStorage.setItem('token', res.token)
        this.$router.push('/home')
        // const { data: res } = await this.$http({
        //   url: '/api/login',
        //   method: 'post',
        //   data: this.$qs.stringify(this.loginData),
        //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        // })
      })
    },
    register () {
      this.$router.push('/reg')
    }
  }
}
</script>
<style  scoped>
html {
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  position: relative;
}
.home {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  overflow: hidden;
}
.el-icon-lock:before,
.el-icon-user:before {
  position: absolute;
  top: 30%;
}

#login-box {
  width: 30%;
  height: auto;
  text-align: center;
  background: #00000060;
  padding: 20px 50px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%);
}
#login-box h1 {
  color: #fff;
}
#login-box .form .item {
  margin-top: 15px;
}
#login-box .form .item i {
  font-size: 18px;
  color: #fff;
}
#login-box .form .item input {
  width: 180px;
  font-size: 18px;
  border: 0;
  border-bottom: 2px solid #fff;
  padding: 5px 10px;
  background: #ffffff00;
  color: #fff;
}
#login-box button {
  margin-top: 20px;
  margin-left: 40px;
  width: 125px;
  height: 40px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
  border: 0;
  border-radius: 15px;
}
</style>
