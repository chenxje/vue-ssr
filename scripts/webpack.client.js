const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = merge(base, {
    entry: {
        client: path.resolve(__dirname, '../src/client-entry.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html'
            // 默认的名字叫index.html
        }),
    ],
    devServer: {
        publicPath: "",
        contentBase: "./dist", // 服务启动在哪一个文件夹下
        open: true, // 启动服务时，自动打开浏览器
        port: 8088, // 端口号
        // proxy 跨域时模拟接口代理
        hot: true, // devServer开启Hot Module Replacement的功能
        hotOnly: true // 即便HMP的功能没有生效，浏览器也不能自动刷新
    },
})