<template>
  <div class="pwd-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>重置密码</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <p>修改密码</p>
      <el-form :model="pwdForm" :rules="pwdFormRules" ref="pwdFormRef" label-width="100px">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="pwdForm.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="pwdForm.newPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="re_pwd">
          <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='changepwd'>修改密码</el-button>
          <el-button @click='$refs.pwdFormRef.resetFields()'>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === this.pwdForm.oldPwd) {
        callback(new Error('新旧密码不能相同!'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次的密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 表单的数据对象
      pwdForm: {
        oldPwd: '',
        newPwd: '',
        re_pwd: ''
      },
      pwdFormRules: {
        oldPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changepwd () {
      this.$refs.pwdFormRef.validate(async valid => {
        if (!valid) return this.message.error('校验密码失败')
        const { data: res } = await this.$http.post('/my/updatepwd', this.$qs.stringify(this.pwdForm))
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success('修改密码成功，请重新登录！')
        window.sessionStorage.removeItem('token')
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
</style>
