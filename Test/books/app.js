const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const render = require('koa-swig');
const co = require('co');
const config = require('./config');



// koa-swig 中间件
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  // cache: 'memory', // disable, set to false
  varControls: ["[[", "]]"],
  ext: 'html',
  writeBody: false
}));

// 静态文件服务中间件
app.use(serve('./assets'));

// 默认找 controllers/index.js
require('./controllers')(app);

app.listen(config.port, () => {
  console.log('图书管理平台启动成功')
});