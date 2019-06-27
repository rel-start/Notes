# node-koa-swig books

标签（空格分隔）： Test

---

[TOC]

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

// 静态文件服务中间件。https://github.com/koajs/static
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

需要安装的包
```javascript
# npm install --save-dev cross-env
# npm install supervisor -g
```

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

<h2>9. 错误处理 404 500</h2>

这里错误处理的中间件的位置在 `middlewares/errorHandler.js`，其代码如下:

```javascript
const errorHandler = {
  error(app) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        ctx.status = error.status || 200;
        ctx.body = '服务器错误';
      }
    });
    
    app.use(async (ctx, next) => {
      await next();
      if (ctx.status !== 404) { return }
      
      // 404业务的变动长时间的404搜索引擎会给你降权
      ctx.status = 404;
      // 腾讯公益404
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
    })
  }
}

module.exports = errorHandler;
```

在入口`app.js`，挂载上面这个错误中间件，下面是入口文件的代码：

```javascript
...
const errorHandler = require('./middlewares/errorHandler');

// 静态资源
app.use(serve('./assets'));

...
// 先让它next 再次的判断当前的业务情况
errorHandler.error(app);
require('./controllers')(app);

...
```

现在，如果在浏览器中键入`http://localhost:3333/1234`就会跳出腾讯公益404效果。因为当前没有`/1234`路由

<h2>10. log4日志中间件的引入</h2>

当前需要安装[log4](https://www.npmjs.com/package/log4js)包：

```javascript
# npm install log4
```

然后在入口`app.js`应用上`log4`

```javascript
const log4js = require('log4js');

// 静态资源
app.use(serve('./assets'));
// 日志
log4js.configure({
  appenders: { cheese: { type: 'file', filename: './log4/cheese.log' } },  // 日志文件放置log4目录下
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

...

const logger = log4js.getLogger('cheese');
// 先让它next 再次的判断当前的业务情况
errorHandler.error(app, logger);

...
```

上面代码中，我将返回的错误信息变量`logger`传入了`errorHandler`类中，下面是错误处理中间件 `middlewares/errorHandler.js`的片段

```javascript
const errorHandler = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        // 如果node挂了 及时的查错。绑定手机 qq及时通知自己
        logger.error(error);
        
        ctx.status = error.status || 200;
        ctx.body = '服务器错误';
      }
    });
    
    ...
  }
}

...
```

这样我们就完成了将日志`log4`引入项目。
接下来测试下，在`controllers/indexController.js`加入一个未命名的变量`aaa`

```javascript
class IndexController {
  constructor(){}

  async actionIndex(ctx, next) {
    // -----------------------------
    console.log(aaa)
    ...
  }
}

module.exports = IndexController;
```

在命令行中键入`npm run dev`。就会发现页面中显示`服务器错误`，并且`log4`目录下多了个`cheese.log`文件，其显示效果如下。

```javascript
[2019-06-27T09:41:32.500] [ERROR] cheese - ReferenceError: aaa is not defined
    at actionIndex (C:\Users\TF\Desktop\books2\controllers\IndexController.js:5:17)
    at dispatch (C:\Users\TF\Desktop\books2\node_modules\koa-simple-router\index.js:186:18)
    at Router._lookup (C:\Users\TF\Desktop\books2\node_modules\koa-simple-router\index.js:198:12)
    at C:\Users\TF\Desktop\books2\node_modules\koa-simple-router\index.js:138:21
    at dispatch (C:\Users\TF\Desktop\books2\node_modules\koa-compose\index.js:42:32)
    at app.use (C:\Users\TF\Desktop\books2\middlewares\errorHandler.js:16:13)
    at dispatch (C:\Users\TF\Desktop\books2\node_modules\koa-compose\index.js:42:32)
    at app.use (C:\Users\TF\Desktop\books2\middlewares\errorHandler.js:5:15)
    at dispatch (C:\Users\TF\Desktop\books2\node_modules\koa-compose\index.js:42:32)
    at serve (C:\Users\TF\Desktop\books2\node_modules\koa-static\index.js:53:15)
```

<h2>11. 请求数据并灌到 swig</h2>

首先到`config/index.js`中的`config`变量中挂请求地址。
例如. `http://localhost:801/yii-basic-app-2.0.21/web/index.php?r=books/index`

```javascript
...

let config = {
  "viewDir": join(__dirname, '..', 'views'),
  "staticDir": join(__dirname, '..', 'assets'),
  "baseUrl": "http://localhost:801/yii-basic-app-2.0.21/web/index.php?r="
};

...
```

接着，我们来写一个请求脚本，放在`utils/SafeRequest.js`中，代码如下：

```javascript
const config = require('../config');
// https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
const fetch = require('node-fetch');

class SafeRequest {
  constructor(url) {
    this.url = url;
    this.baseUrl = config.baseUrl;
  }

  fetch() {
    let result = {
      code: 0,
      message: "",
      data: [],
    };

    return new Promise((resolve, reject) => {
      let ydfetch = fetch(this.baseUrl + this.url);
      ydfetch
        .then(res => res.json())
        .then(json => {
          result.data = json;
          resolve(result);
        })
        .catch(error => {
          result.code = 1;
          result.message = "node-fetch请求数据失败";
          reject(result);
        });
    })
  }
}

module.exports = SafeRequest;
```

这里我们用了`node-fetch`包，需要`npm install node-fetch`。这个包似 [window.fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)。

上面代码`fetch()`函数返回的格式：`{code: 0, message: '', data: data}`


<h2>12. 实现 Books 数据模型以及网站文档 jsdoc</h2>

这里直接上代码

```javascript
/**
 * @fileoverview 实现 Books 数据模型
 * @author tangye@2278331650@qq.com
 */

const SafeRequest = require('../utils/SafeRequest');
class Books {
  /**
   * Books类 获取后台有关于图书相关的数据类
   * @class
   */
  /**
   * @constructor
   * @param {object} app Ko2执行的上下文
   */

  constructor(app){
    this.app = app;
  }

  /**
   * 获取后台全部列表
   * @param {*} options 配置项
   * 
   * @example
   * return new Promise
   * getData(options)
   */
  getData(options) {
    const safeRequest = new SafeRequest(options.url);
    return safeRequest.fetch();
  }
}

module.exports = Books;
```

然后安装 `jsdoc` 包

```javascript
# npm install jsdoc --save-dev
```

以及`pageage.json`设置启动脚本

```javascript
"scripts": {
  "docs": "jsdoc ./**/*.js -d ./docs/jsdoc",
  ...
}
```

现在，只需要`npm run docs`就可以在`doc/jsdoc`目录下生产网站文档了。不过 `./**/*.js` windows环境下找不到，需要在 mac 或者 linux 执行 `npm` 命令

<h2>13. 渲染页面</h2>

页面是`controllers/BooksController.js`来渲染出数据，代码如下：

```javascript
const Books = require('../models/Books');

class BooksController {
  constructor() { }

  async actionList(ctx, next) {
    const books = new Books();

    // 请求接口：http://localhost:801/yii-basic-app-2.0.21/web/index.php?r=books/index
    const result = await books.getData({
      url: "books/index"
    });

    const {booksTitles, booksVal} = BooksController.getFilterBooks(result.data);

    // 渲染页面到 books目录下的list.html
    ctx.body = await ctx.render('books/list', {
      booksTitles,
      booksVal
    });
  }

  // 用于过滤 Books 数据
  static filterBooksData(data) {
    const arr = [];
    for (let book of data) {
      const o = {};
      for (let [key, val] of Object.entries(book)) {
        if (key == 'id' || key == 'isbn' || key == 'create_date') {
          continue;
        }
        o[key] = val;
      }
      arr.push(o);
    }
    return arr;
  }

  // 得到过滤后 Books 列表
  static getFilterBooks(data){
    const arr = BooksController.filterBooksData(data);

    const booksVal = [];
    for (let x of arr) {
      booksVal.push(Object.values(x));
    }

    return {
      booksTitles: Object.keys(arr[0]),
      booksVal
    };
  }
}

module.exports = BooksController;
```

上面代码需要在添加一个页面。 `views/books/list.html`，下面是页面的一部分，[swig模板](https://www.jianshu.com/p/f0bffc42c1ce)

```javascript
...

{% block content %}
<div class="box">
  <div class="box_head">
    {% for val in booksTitles %}
    <div class="box_options">[[val]]</div>
    {% endfor %}
  </div>

  <div class="box_body">
    {% for item in booksVal %}
    <div class="box_content">
      {% for val in item %}
      <div class="box_item">[[val]]</div>
      {% endfor %}
    </div>
    {% endfor %}
  </div>
</div>
{% endblock %}
```
