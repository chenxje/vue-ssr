const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const VueServerRenderer = require('vue-server-renderer')
const static = require('koa-static')

const fs = require('fs');
const path = require('path')
const serverBundle = fs.readFileSync(path.resolve(__dirname, 'dist/server.bundle.js'), 'utf8')
const template = fs.readFileSync(path.resolve(__dirname, 'dist/server.html'), 'utf8');


// 根据实例  创建一个渲染器 传入打包后的js 和 传入模板文件
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
    template
})

// 请求到localhost:3000/ 根据请求url参数  -》 {url:ctx.url}，传给serverBundle   则 会根据服务端的打包的.js 路由系统 渲染出一份有该路由完整dom解构的页面
router.get('/', async (ctx) => {
    console.log('跳转')
    ctx.body = await new Promise((resolve, reject) => {
        render.renderToString({url:ctx.url},(err, html) => { // 如果想让css生效 只能使用回调的方式
            if (err) reject(err);
            resolve(html)
        })
    })
    //    const html = await render.renderToString(); // 生成字符串
    //    console.log(html)
})

// 当用户访问一个不存在的路径的服务端路径 我就返回给你首页，你通过前端的js渲染的时候，会重新根据路径渲染组件

// 只要用户刷新就会像服务器发请求
router.get('/(.*)',async (ctx)=>{
    console.log('跳转')
    ctx.body = await new Promise((resolve, reject) => {
        render.renderToString({url:ctx.url},(err, html) => { // 通过服务端渲染 渲染后返回
            if (err && err.code == 404) resolve(`not found`);
            console.log(html)
            resolve(html)
        })
    })
})


// 当客户端发送请求时会先去dist目录下查找
app.use(static(path.resolve(__dirname,'dist'))); // 顺序问题
app.use(router.routes());

// 保证先走自己定义的路由 在找静态文件
app.listen(3000);
