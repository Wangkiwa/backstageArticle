<template>
  <div class="ArticleSend-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-form :model="pubForm" label-width="80px" ref="sendformRef" :rules="sendformRed">
        <el-form-item label="文章标题" prop="title">
          <el-input placeholder="请输入文章标题" v-model="pubForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="pubForm.cate_id" placeholder="请选择分类" clearable>
            <el-option v-for="item in options" :key="item.Id" :label="item.name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容">
          <quill-editor ref="editorRef" v-model="pubForm.content" class="editor"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" class="img-item" prop="cover_img">
          <!-- 用来显示封面的图片 -->
          <img v-if="preview" :src="preview" alt="" class="cover-img" ref="imgRef" />
          <img v-else src="../../../src/assets/cover.jpg" alt="" class="cover-img" ref="imgRef" />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input @change="onCoverChange" type="file" style="display: none;" accept="image/*" ref="iptFile" />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click='$refs.iptFile.click()'>+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="pubArt('已发布')" type="primary">发布</el-button>
          <el-button @click="pubArt('草稿')" type="info">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      preview: '', // 做预览的 url
      content: '',
      options: [],
      cate_id: '',
      pubForm: {
        title: '',
        cate_id: '',
        content: '',
        cover_img: '', // 提交给服务器的 blob 二进制
        state: ''
      },
      sendformRed: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
        cover_img: [{ required: true, message: '请选择文章封面', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getArticleCate()
  },
  methods: {
    async getArticleCate () {
      const { data: res } = await this.$http.get('/my/article/cates')
      this.options = res.data
    },
    pubArt (state) {
      // 将状态进行保存
      this.pubForm.state = state
      this.$refs.sendformRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整信息')
        const fd = new FormData()
        Object.keys(this.pubForm).forEach(k => fd.append(k, this.pubForm[k]))
        const { data: res } = await this.$http.post('/my/article/add', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        if (res.status !== 0) return this.$message.error('发布文章失败！')
        if (this.pubForm.state === '已发布') {
          this.$message.success('发布文章成功!')
          console.log(this.pubForm)
          // 清空图片
          this.preview = ''
          // 重置表单
          this.$refs.sendformRef.resetFields()
        } else {
          this.$message.info('已存为草稿!')
          // 清空图片
          this.preview = ''
          // 重置表单
          this.$refs.sendformRef.resetFields()
        }
      })
    },
    //  图片发生变化时，监听事件
    onCoverChange (e) {
      //  获取用户选择的文件
      const file = e.target.files[0]
      console.log(file)
      if (file) {
        // 由于 img 的 src 只能设置 BASE64 或 URL
        // 方案有两种: 转成 BASE64 或 URL
        // FileReader --> BASE64
        // A. 将文件转成 BASE64
        // // 1. 创建对象
        // const fr = new FileReader()
        // // 2. 读文件
        // fr.readAsDataURL(file)
        // // 3. 获取结果
        // fr.onload = e => {
        //   // 4. 设置给 img 的 src
        //   this.cover = e.target.result
        // }
        // BASE64 的缺点: 体积增大 33% 左右
        // B. 将文件对象转成 URL
        // 该方法是原生 WEBAPI 的方法, 作用是将文件对象转成 URL
        // URL 的生命周期和当前窗口绑定
        this.preview = URL.createObjectURL(file)
        // file 对象就是 blob 的子类对象, 所以可以直接传递给后台
        console.log(this.preview)
        this.pubForm.cover_img = file
      } else {
        // 清除预览
        this.preview = ''
        // 清除用户选择的文件
        this.pubForm.cover_img = ''
      }
    }
  }
}
</script>

<style  scoped>
.quill-editor {
  height: 300px;
}
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
.img-item {
  margin-top: 140px;
}
.cover-img {
  width: 320px;
  height: 200px;
  object-fit: cover;
}
</style>
