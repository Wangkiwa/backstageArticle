<template>
  <div class="avatar-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>更换头像</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- el-card -->
    <el-card>
      <p>更换头像</p>
      <el-form ref="avatarRef" :model="avatarData" label-width="80px">
        <el-form-item>
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :http-request="avatarSuccess">
            <img v-if="avatarData.avatar" :src="avatarData.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary" @click="uploadAvatar">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

  name: 'refresh',
  inject: ['reload'],
  data () {
    return {
      avatarData: {
        avatar: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(file)
    },
    avatarSuccess (item) {
      console.log(item.file)
      if (item.file) {
        //  将图片转为BASE64
        // 1.创建对象
        const fr = new FileReader()
        // 2. 读文件
        fr.readAsDataURL(item.file)
        // 3.获取结果
        fr.onload = e => {
          this.avatarData.avatar = e.target.result
        }
      } else {
        this.avatarData.avatar = ''
      }
    },
    async uploadAvatar () {
      const { data: res } = await this.$http.post('/my/update/avatar', this.$qs.stringify(this.avatarData))
      if (res.status !== 0) this.$message.error('更换头像失败！')
      this.$message.success('更新头像成功!')
      this.reload()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.el-button {
  margin-top: 15px;
}
</style>
