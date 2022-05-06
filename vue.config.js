const { defineConfig } = require('@vue/cli-service')

const BASE_URL = process.env.NODE_ENV === 'production' ? '/dist/' : './'
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: BASE_URL,
  lintOnSave: false,
  devServer: { // webpack-dev-server配置
    host: 'localhost',
    port: 8081, // 配置本项目运行端口
    proxy: { // 配置代理服务器来解决跨域问题
      '/api': {
        target: 'http://localhost:8081', // 配置要替换的后台接口地址
        changOrigin: true, // 配置允许改变Origin
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

})
