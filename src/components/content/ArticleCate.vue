<template>
  <div class="ArticleCate-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="clearfix">
        <div class="cateList-top">
          <span>文章分类管理</span>
          <el-button type="primary" @click="addArticleList">添加类别</el-button>
        </div>
        <template>
          <el-table :data="CateList" style="width: 100%" stripe border>
            <el-table-column type="index" label="#" width="180">
            </el-table-column>
            <el-table-column prop="name" label="分类名称" width="340">
            </el-table-column>
            <el-table-column prop="alias" label="分类别名" width="340">
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="removeCate(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-card>
    <!-- 添加文章类别 -->
    <el-dialog title="添加文章分类" :visible.sync="addArticleCate" width="50%">
      <el-form ref="addCateRef" :model="addCateRuleForm" :rules="addCateRules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addCateRuleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="alias">
          <el-input v-model="addCateRuleForm.alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCateBtn">确 定</el-button>
        <el-button @click="cancelAdd">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改文章分类 -->
    <el-dialog title="修改文章分类" :visible.sync="editArticleCate" width="50%">
      <el-form ref="editCateRef" :model="editCateRuleForm" :rules="addCateRules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="editCateRuleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="alias">
          <el-input v-model="editCateRuleForm.alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editCateBtn">确 定</el-button>
        <el-button @click="editCancelAdd">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      CateList: [],
      addArticleCate: false,
      editArticleCate: false,
      addCateRuleForm: {
        name: '',
        alias: ''
      },
      editCateRuleForm: {
        Id: 0,
        name: '',
        alias: ''
      },
      addCateRules: {
        name: [{ required: true, message: '请填写分类名称', trigger: 'blur' }],
        alias: [{ required: true, message: '请填写分类别名', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getArticleCateList()
  },
  methods: {
    async getArticleCateList () {
      const { data: res } = await this.$http.get('/my/article/cates')
      if (res.status !== 0) {
        return this.$message.error('获取文章分类失败！')
      }
      this.CateList = res.data
    },
    addArticleList () {
      this.addArticleCate = true
    },
    // 点击添加类别
    addCateBtn () {
      this.$refs.addCateRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整信息！')
        // const { data: res } = await this.$http.post('/my/article/addcates', {
        //   name: this.addCateRuleForm.name,
        //   alias: this.addCateRuleForm.alias
        // })
        const { data: res } = await this.$http({
          url: '/my/article/addcates',
          method: 'post',
          data: this.$qs.stringify(this.addCateRuleForm)
        })
        // url: '/api/login',
        //   method: 'post',
        //   data: this.$qs.stringify(this.loginData),
        console.log(res)
        if (res.status !== 0) return this.$message.error(res.message)
        this.addArticleCate = false
        this.$refs.addCateRef.resetFields()
        this.getArticleCateList()
      })
    },
    // 取消添加
    cancelAdd () {
      this.addArticleCate = false
      this.$refs.addCateRef.resetFields()
    },
    // 删除文章分类
    async removeCate (value) {
      console.log(value.Id)
      const confirmResult = await this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      const { data: res } = await this.$http.get('/my/article/deletecate/' + value.Id)
      if (res.status !== 0) return this.$message.error('删除失败！')
      this.$message.success('删除成功！')
      this.getArticleCateList()
    },
    // 修改文章分类
    edit (value) {
      this.editCateRuleForm.Id = value.Id
      this.editCateRuleForm.name = value.name
      this.editCateRuleForm.alias = value.alias
      this.editArticleCate = true
    },
    //  修改文章分类
    editCateBtn () {
      this.$refs.editCateRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整信息！')
        // this.$qs.stringify
        const { data: res } = await this.$http.post('/my/article/updatecate', this.$qs.stringify(this.editCateRuleForm))
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success('修改文章分类成功！')
        this.editArticleCate = false
        this.getArticleCateList()
      })
    },
    //  取消修改文章分类
    editCancelAdd () {
      this.editArticleCate = false
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 12px;
}
.cateList-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
