import createApp from './app.js';
console.log('client', createApp)
let {app} = createApp();
app.$mount('#app'); // 客户端渲染可以直接使用client-entry.js
