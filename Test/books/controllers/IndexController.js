class IndexController {
  constructor() { }

  async actionIndex(ctx, next) {
    // 入口app.js中 app.context.render 已经为 ctx 添加了 render 属性
    // koa-swig 模板渲染
    ctx.body = await ctx.render('books/index', {
      data: "Home Page2"
    });
  }
}

module.exports = IndexController;