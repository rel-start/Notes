const router = require('koa-simple-router');
const IndexController = require('./IndexController');
const indexController = new IndexController();


module.exports = (app) => {
  // koa-simple-router 中间件
  app.use(router(_ => {
    _.get('/', indexController.actionIndex);
    // seo 真静态>伪静态>动态
    _.get('/index.html', indexController.actionIndex);
  }))
}