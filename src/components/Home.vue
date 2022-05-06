<template>
  <el-container class="home-container">
    <el-header>
      <h1>个人博客系统</h1>

      <div class="userInfo header-userInfo">
        <el-dropdown size="medium" type="info" plain>

          <el-button class="sele-center">
            <i class="el-icon-user"></i>个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="userinfoDropBtn">修改资料</el-dropdown-item>
            <el-dropdown-item @click.native="updateAvatarDropBtn">更换头像</el-dropdown-item>
            <el-dropdown-item @click.native="regPwdDropBtn">重置密码</el-dropdown-item>
            <el-dropdown-item @click.native="exitBtn">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <div class="userInfo">
          <a href="javascript:;">
            <img v-if="dataList.user_pic" :src="this.dataList.user_pic" alt="">
            <img v-else src="../../src/assets/logo.png" alt="">
          </a>
          <span>欢迎您&nbsp;{{this.dataList.username}}</span>
        </div>
        <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
          <el-menu-item index="/welcome">
            <template slot="title">
              <i class="el-icon-money"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-postcard"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="cate">
              <template slot="title">
                <i class="el-icon-folder-opened"></i>
                <span>文章分类</span>
              </template>
            </el-menu-item>
            <el-menu-item index="list">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>文章列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="send">
              <template slot="title">
                <i class="el-icon-folder-add"></i>
                <span>文章发布</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item index="info">
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>基本资料</span>
              </template>
            </el-menu-item>
            <el-menu-item index="avatar">
              <template slot="title">
                <i class="el-icon-camera"></i>
                <span>更换头像</span>
              </template>
            </el-menu-item>
            <el-menu-item index="pwd">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>重置密码</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      dataList: {}
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 修改资料
    userinfoDropBtn () {
      this.$router.push('/info')
    },
    // 修改头像
    updateAvatarDropBtn () {
      this.$router.push('/avatar')
    },
    //  重置密码
    regPwdDropBtn () {
      this.$router.push('/pwd')
    },
    //  退出
    exitBtn () {
      // 清除token
      window.sessionStorage.removeItem('token')
      this.$router.push('/')
    },
    async getUserList () {
      const { data: res } = await this.$http.get('/my/userinfo')
      if (res.status !== 0) {
        return this.$message.error('获取列表信息失败！')
      }
      this.dataList = res.data
      console.log(this.dataList)
    }
  }
}
</script>

<style scoped>
.el-aside {
  height: 100%;
  background-color: #545c64;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.exit {
  height: 40px;
}
.el-header h1 {
  color: aliceblue;
}
.home-container {
  width: 100%;
  height: 100%;
}
.el-menu {
  border: none;
}
.userInfo {
  height: 56px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #282b33;
}
.userInfo a {
  display: block;
  width: 60px;
  height: 56px;
  overflow: hidden;
  box-sizing: border-box;
  background-size: cover;
  border-radius: 50%;
}
.userInfo a img {
  width: 100%;
  height: 100%;
  box-shadow: 10px 10px 10px #000000;
}
.userInfo span {
  text-align: center;
  line-height: 56px;
  color: #fff;
}
.el-dropdown {
  margin: 15px 14px 0;
}
.header-userInfo span {
  font-size: 14px;
}
.el-dropdown-item {
  width: 100%;
  height: 100%;
  background-color: rebeccapurple;
}
.el-dropdown-item .el-button {
  border: 0 none;
  outline: none;
  width: 100%;
  height: 100%;
}
.header-userInfo span {
  margin-left: 15px;
}
.sele-center {
  background-color: #373d41;
  border: none;
  color: #eee;
}
.el-icon-user {
  margin-right: 8px;
}
</style>
