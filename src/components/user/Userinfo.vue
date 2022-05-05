<template>
  <div class="userinfo-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>基本资料</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <p>基本资料</p>
      <el-form ref="userinfoRef" :model="userinfoForm" :rules="userinfoRules" label-width="80px">
        <el-form-item label="登录名称" prop="username">
          <el-input v-model="userinfoForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="userinfoForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="userinfoForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editUserinfoBtn" round>修改</el-button>
          <el-button type="info" round>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单信息
      userinfoForm: {
        id: 0,
        nickname: '',
        email: ''
      },
      userinfoRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的非空字符串', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserinfoList()
  },
  methods: {
    async getUserinfoList () {
      const { data: res } = await this.$http.get('/my/userinfo')
      if (res.status !== 0) return this.$message.error('获取信息列表失败！')
      this.userinfoForm = res.data
      // console.log(this.userinfoForm)
    },
    // 修改信息按钮
    editUserinfoBtn () {
      this.$refs.userinfoRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写用户信息!')
        const { data: res } = await this.$http.post('/my/userinfo', this.$qs.stringify(this.userinfoForm))
        if (res.status !== 0) return this.$message.error('修改用户信息失败！')
        this.getUserinfoList()
        this.$message.success(res.message)
      })
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 260px;
}
</style>
