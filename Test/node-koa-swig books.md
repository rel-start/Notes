# node-koa-swig books

标签（空格分隔）： Test

---

**目录结构**

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/TEXT_node-koa-swig(books).png"></p>

<h2>1. 起步</h2>

初始化`npm`，并且安装 [koa](https://koa.bootcss.com/#context)
```javascript
# npm init -y

# npm install koa
```

<h2>2. 启动简单的 node 服务</h2>

在 `app.js` 中键入如下代码
当命令行下键入 `node ./app.js` 可以看到: '图书管理平台启动成功'

```javascript
const Koa = require('koa');
const app = new Koa();

app.listen(1342, () => {
  console.log('图书管理平台启动成功')
});
```

<h2>3. 配置文件</h2>

```javascript
const { extend } = require("lodash");
const { join } = require("path");

let config = {
  "viewDir": join(__dirname, '..', 'views'),
  "staticDir": join(__dirname, '..', 'assets')
}

// 开发模式
if (process.env.NODE_ENV == 'development') {
  const localConfig = {
    port: 8081
  }
  config = extend(config, localConfig);
}

// 生产模式
if (process.env.NODE_ENV == 'production') {
  const prodConfig = {
    port: 80
  }
  config = extend(config, prodConfig);
}

module.exports = config;
```

<h2>4. 配置路由等中间件</h2>

> 所需的库 [koa-static](https://github.com/koajs/static) [koa-swig](https://github.com/koa-modules/swig) [koa-simple-router](https://github.com/gyson/koa-simple-router)

配置静态文件服务、`koa-swig`模板中间件。[koa中间件目录](https://github.com/koajs/koa/wiki)
在 `app.js` 中键入如下代码

```javascript
...
const serve = require('koa-static');
const render = require('koa-swig');
const co = require('co');
const config = require('./config');

app.use(serve('./assets'));

// koa-swig 中间件
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  // cache: 'memory', // disable, set to false
  varControls: ["[[", "]]"],    // 模板代码块格式
  ext: 'html',
  writeBody: false
}));

// 加载模块 controllers/index.js，并传入 app
require('./controllers')(app);

app.listen(config.port, () => {
  console.log('图书管理平台启动成功')
});
```

`controllers/index.js` 加载路由控件[koa-simple-route](https://github.com/gyson/koa-simple-router)

```javascript
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
```

上面引用到的 `controllers/IndexController.js`，代码如下

```javascript
class IndexController {
  constructor() { }
  
  async actionIndex(ctx, next) {
    ctx.body = 'Home Page2';
  }
}

module.exports = IndexController;
```

接下来就是启动，根部录下的`package.json` 配置启动脚本。
这里用了热启动 [supervisor](https://www.npmjs.com/package/supervisor)，以及 [cross-env](https://github.com/kentcdodds/cross-env)。当您使用NODE_ENV=production类似设置环境变量时，大多数Windows命令提示将会阻塞 。

```javascript
...
"scripts": {
  "dev": "cross-env NODE_ENV=development supervisor ./app.js"
}
...
```

配置完就可以启动了 `npm run dev`。`http://localhost:8088/`下可以看到页面中输出`Home Page`

<h2>5. 替换成html页面</h2>

`controllers/IndexController.js`中页面主体由 `swig` 模板替代，并把函数改为 async 函数

```javascript
...

async actionIndex(ctx, next) {
  // 入口app.js中 app.context.render 已经为 ctx 添加了 render 属性
  // koa-swig 模板渲染
  ctx.body = await ctx.render('books/index', {
    data: "Home Page2"
  });
}

...
```

模板页面：`views/layouts/layout.html`下的页面代码如下

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8" />
  <title>{% block title %}{% endblock %}</title>
  {% block stylesheet %}{% endblock %}
</head>

<body>
  {% block content %}{% endblock %}
  {% block scripts %}{% endblock %}
</body>

</html>
```

index页面：`views/books/index.html`下的页面代码如下
这是`{% block title %}aa{% endblock %}` swig 模板的格式，可以替换`layout.html`（extends layout）中图样区域的内容为 `aa`

```html
{% extends '../layouts/layout.html' %}

{% block title %}vues页面{% endblock %}

{% block stylesheet %}
  <link rel="stylesheet" href="/stylesheet/index.css">
{% endblock %}

{% block content %}
  [[data]]
{% endblock %}

{% block scripts %}
  <script src="/scripts/index.js"></script>
{% endblock %}
```

上面代码引用的`assets/scripts/index.js`代码如下

```javascript
const data = "京程一灯";
export default data;
```

`assets/stylesheet/index.css`代码如下

```css
body { background-color: bisque; color: chocolate; }
```

在此启动服务`npm run dev`，就可以在页面上看到`swg`模板渲染 `Home Page2`。这个完全就是 ssr 渲染

<h2>6. systemjs配置模块加载器</h2>

[&lt;script type="module"&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)在浏览器支持 module 的情况下，可以用`import`接受 `export`的数据

```html
...

{% block scripts %}
  <script type="module">
    import("/scripts/index.js").then(_ => {
      console.log(_.default)
    });
  </script>
  <!-- <script src="/scripts/index.js"></script> -->
{% endblock %}
```

上面代码会在控制台中输出：`京程一灯`

**利用 systemjs 起到同样功能**

[BootCDN](https://www.bootcdn.cn/)
```javascript
...

{% block scripts %}
  <script type="nomodule">
    import("/scripts/index.js").then(_ => {
      console.log(_.default)
    });
  </script>
  <script type="module" src="https://cdn.bootcss.com/systemjs/3.1.6/system.min.js"></script>
  <script type="module">
    System.import("/scripts/index-bundle.js").then(_ => {
        console.log(_.default);
    })
  </script>
{% endblock %}
```

<h2>7. 利用 babel 转码代替上一小节</h2>

所需的包`@babel/core` `@babel/cli`

如何编译[官网](https://babeljs.io/docs/en/babel-cli#docsNav)有详细的说明

```javascript
# npm install --save-dev @babel/core @babel/cli
```

这里还需安装依赖 [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env#docsNav) ，智能预设`babel`如何编码。

```javascript
# npm install --save-dev @babel/preset-env
```

并且提供 `.babelrc` 代码如下。这里用到了 `"modules": "systemjs"`

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": "systemjs"
      }
    ]
  ]
}
```

接下来就是编码，根部录下的 package.json 配置启动脚本 `build`。

```javascript
...

"scripts": {
    "dev": "cross-env NODE_ENV=development supervisor ./app.js",
    "build": "babel ./assets/scripts/index.js -o ./assets/scripts/index-bundle.js"
  }

...
```

配置完可以再命令行执行`npm run build`，将会在生成一个 `index-bundle.js` 文件。
然后将 `views/books/index.html` 中引用编译后的这文件就行，也可以输出`京城一灯`

```javascript
<script src="/scripts/index-bundle.js"></script>
```

<h2>8. vue模板</h2>

然后来试下 vue.js。`views/books/index.html`代码如下

```javascript
...

{% block content %}
[[data]]

<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
{% endblock %}

{% block scripts %}
...
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
<script>
  var app6 = new Vue({
    el: '#app-6',
    data: {
      message: 'Hello Vue!'
    }
  })
</script>
{% endblock %}
```

效果如图：
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/TEXT_node-koa-swig01.gif"></p>