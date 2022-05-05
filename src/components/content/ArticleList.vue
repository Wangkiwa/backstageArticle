<template>
  <div class="ArticleList-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <p>文章列表</p>
      <!-- 级联选择器 -->
      <div class="block">
        <el-cascader placeholder="所有分类" :options="cateList" :props="cateProps" v-model="cateSelect" @change="cateSelectChange" clearable></el-cascader>
        <el-cascader placeholder="所有状态" :options="statusProps" v-model="statusSelect" @change="statusSelectChange" clearable class="middle"></el-cascader>
        <el-button type="primary" @click="screenList">筛选</el-button>
      </div>
      <!-- 表格区域 -->
      <el-table :data="ArticleList" border style="width: 100%">
        <el-table-column prop="title" label="文章标题" width="380"></el-table-column>
        <el-table-column prop="cate_name" label="分类" width="180"></el-table-column>
        <el-table-column prop="pub_date" label="发布时间">
          <template slot-scope="scope">
            <!-- {{scope.row.pub_date | dateFormat }} -->
            {{dayFrom(scope.row.pub_date)}}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editListBtn(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="removeListBtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="pageSizeChange" @current-change="handleCurrentChange" :current-page="queryParams.pagenum" :page-sizes="[2, 3, 5, 10]" :page-size="this.queryParams.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 修改的dialog -->
    <el-dialog title="修改文章列表" :visible.sync="editListVisible" width="50%">
      <el-form :model='editListData' ref="editListRefDialog" :rules="editListRulesDialog" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="editListData.title"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-cascader placeholder="所有状态" :options="editStatusProps" v-model="editStatusSelect" clearable class="middle" @change="editlistDialogChange"></el-cascader>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="uploadFile">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editListVisible = false">取 消</el-button>
        <el-button type="primary" @click="editListDialogBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      //   分类的数据
      cateList: [],
      statusList: [],
      //  分类的显示数据
      cateProps: {
        value: 'Id',
        label: 'name'
      },
      //  状态的数据
      statusProps: [
        {
          value: '已发布',
          label: '已发布'
        },
        {
          value: '草稿',
          label: '草稿'
        }
      ],
      editStatusSelect: '',
      editStatusProps: [
        {
          value: '已发布',
          label: '已发布'
        },
        {
          value: '草稿',
          label: '草稿'
        }
      ],
      //  所有分类绑定的数据
      cateSelect: '',
      //  所有状态绑定的数据
      statusSelect: '',
      queryParams: {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: ''
      },
      ArticleList: [],
      total: 0,
      //  修改文章列表Dialog
      editListVisible: false,
      editListData: {
        Id: 0,
        title: '',
        cate_id: 0,
        content: '',
        cover_img: '',
        state: ''
      },
      imageUrl: '',
      editListRulesDialog: {
        cover_img: [{ required: true, message: '请选择要修改的文章封面！', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getArticleList()
    this.getArticleCate()
  },
  methods: {
    // 获取文章列表
    async getArticleList () {
      const { data: res } = await this.$http.get('/my/article/list', {
        params: {
          pagenum: this.queryParams.pagenum,
          pagesize: this.queryParams.pagesize,
          cate_id: this.queryParams.cate_id,
          state: this.queryParams.state
        }
      })
      if (res.status !== 0) return this.$message.error('获取文章列表失败')
      this.ArticleList = res.data
      this.statusList = res.data
      this.total = res.total
    },
    // 获取文章分类
    async getArticleCate () {
      const { data: res } = await this.$http.get('/my/article/cates')
      if (res.status !== 0) return this.$message.error(res.message)
      this.cateList = res.data
    },
    //  所有分类选中状态
    cateSelectChange () {
      this.queryParams.cate_id = this.cateSelect.join()
      this.getArticleList()
    },
    //  所有状态的数据
    statusSelectChange () {
      this.queryParams.state = this.statusSelect.join()
      this.getArticleList()
    },
    //  筛选按钮
    async screenList () {
      this.getArticleList()
    },
    //  修改文章列表
    async editListBtn (value) {
      this.editListVisible = true
      const { data: res } = await this.$http.get('/my/article/' + value.Id)
      if (res.status !== 0) return this.$message.error(res.message)
      // Id: 0,
      // title: '',
      // cate_id: 0,
      // content: '',
      // cover_img: '',
      // state: ''
      this.editListData.Id = res.data.Id
      this.editListData.title = res.data.title
      this.editListData.cate_id = res.data.cate_id
      this.editListData.content = res.data.content
      console.log(res.data.cover_img)
      this.imageUrl = 'http://www.liulongbin.top:3007' + res.data.cover_img
      // this.editListData.cover_img = 'http://www.liulongbin.top:3007' + res.data.cover_img
      this.editListData.state = res.data.state
      console.log(this.editListData)
      this.editStatusSelect = res.data.state
    },
    dayFrom (day) {
      return dayjs(day).format('YYYY-MM-DD  HH:mm:ss')
    },
    //  每页显示数据的改变
    pageSizeChange (newSize) {
      this.queryParams.pagesize = newSize
      this.getArticleList()
    },
    // 当前页面的改变
    handleCurrentChange (newNum) {
      this.queryParams.pagenum = newNum
      this.getArticleList()
    },
    // 删除文章列表
    async removeListBtn (value) {
      const resultConfirm = await this.$confirm('您确定要删除该文章数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(resultConfirm)
      console.log(value.Id)
      if (resultConfirm !== 'confirm') return this.$message.info('已取消删除！')
      const { data: res } = await this.$http.get('/my/article/delete/' + value.Id)
      if (res.status !== 0) return this.$message.error(res.message)
      const totalPage = Math.ceil((this.total - 1) / this.queryParams.pagesize) // 总页数
      this.queryParams.pagenum = this.queryParams.pagenum > totalPage ? totalPage : this.queryParams.pagenum
      this.queryParams.pagenum = this.queryParams.pagenum < 1 ? 1 : this.queryParams.pagenum
      this.$message.success('删除文章数据成功！')
      this.getArticleList()
    },
    //  修改文章按钮
    editListDialogBtn () {
      this.$refs.editListRefDialog.validate(async valid => {
        if (!valid) return this.$message.error('请选择要修改的文章封面！')
        const formData = new FormData()
        // formData.append('Id', this.editListData.Id)
        Object.keys(this.editListData).forEach(k => formData.append(k, this.editListData[k]))
        const { data: res } = await this.$http.post('/my/article/edit', formData)
        if (res.status !== 0) return this.$message.error('修改文章失败')
        //  清空显示图片
        this.imageUrl = ''
        //  关闭对话框
        this.editListVisible = false
        //  清空图片
        // this.editListData.cover_img = ''
        this.$message.success('修改文章成功!')
        this.getArticleList()
      })

      // console.log(res)
      // const { data: res } = await this.$http({
      //   url: '/my/article/edit',
      //   method: 'post',
      //   data: formData
      //   // headers: {
      //   //   'Content-Type': 'multipart/form-data'
      //   // }
      // })
    },
    //  修改文章的状态变化
    editlistDialogChange () {
      this.editListData.state = this.editStatusSelect.join()
    },
    //  上传成功的操作
    handleAvatarSuccess (res, file) {
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.editListData.cover_img = file.raw
      console.log(this.imageUrl)
    },
    // :on-success="handleAvatarSuccess"
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
    },
    //  覆盖默认的上传行为，可以自定义上传的实现
    uploadFile (item) {
      this.editListData.cover_img = item.file
      const fr = new FileReader()
      fr.readAsDataURL(item.file)
      fr.onload = e => {
        console.log(e.target)
        this.imageUrl = e.target.result
      }
    }
  }
}
</script>

<style scoped>
.middle {
  margin: 0 5px;
}
.el-table {
  margin-top: 12px;
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
</style>
