<template>
  <div class="app">
    <div class="Reguster">
      <div id="login-box">
        <h1>注册</h1>
        <el-form ref="regForm" :model="regForm" :rules="rulesForm" label-width="80px">
          <el-form-item label="Username" prop="username">
            <el-input name="username" v-model.trim="regForm.username" class="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input name="password" v-model.trim="regForm.password" class="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="checkPass">
            <el-input name="password" v-model.trim="regForm.checkPass" class="el-icon-lock"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="actionBtn">登录</el-button>
        <el-button type="primary" @click="regBtn">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      regForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      rulesForm: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 注册
    regBtn () {
      this.$refs.regForm.validate(async valid => {
        if (!valid) return this.$message.error('请填写正确信息！')
        // const { data: res } = await this.$http.post('/api/reguser', {
        //   username: this.regForm.username,
        //   passowrd: this.regForm.password
        // })
        const { data: res } = await this.$http({
          url: '/api/regUser',
          method: 'post',
          data: this.$qs.stringify(this.regForm)
        })
        console.log(res)
        if (res.status !== 0) {
          return this.$message.error('注册失败！')
        }
        // 注册成功
        this.$message.success('注册成功！')
        this.$router.push('/')
      })
    },
    // 登录页面跳转
    actionBtn () {
      this.$router.push('/')
    }
  }
}
</script>

<style  scoped>
html {
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  position: relative;
}
.app {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-image: linear-gradient(-225deg, #b6cee8 0%, #f578dc 100%);
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
