const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    port: 8000,
    proxy: {
        '/api': {
            target: "http://localhost:9000",
            changeOrigin: true,//如果需要跨域
            ws:false,
            pathRewrite: { '^/api': '' }
        }

    }
},
})
