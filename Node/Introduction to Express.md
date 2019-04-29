# Introduction to Express

标签（空格分隔）： Notes

---
[TOC]

<h3><a href="https://www.runoob.com/nodejs/nodejs-express-framework.html">Express</a>初始化</h3>

```javascript
$ npm init

// 安装 supervisor热启动。https://www.npmjs.com/package/supervisor
$ npm install supervisor -g
// 启动 app.js
$ supervisor app.js

// 安装 express
$ npm install express --save
```

<h3>第一个Express</h3>

```javascript
var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
   res.send('Hello World');
});
 
var server = app.listen(8081, function () {
   console.log('接口已启动');
});
```

<h3>请求和响应</h3> 

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log(req.query);   // { username: 'bb', name: 'dd' }
  res.send(`Hello ${req.query.name}`);
});

var server = app.listen(8081, () => console.log('接口已启动'));
```
<p>上面的代码。当用户在浏览器中输入 <code>localhost:8081/?username=bb&name=dd</code>，那么页面上回输出<code>Hello dd</code>，以及控制台中输出<code>{ username: 'bb', name: 'dd' }</code></p>

```javascript
const express = require('express');
const app = express();

app.get('/index/:id', (req, res) => {
  console.log(req.params);
  res.json({
    id: `Hello ${req.params.id}`
  });
});

var server = app.listen(8081, () => console.log('接口已启动'));
```
<p>上面的代码。当用户在浏览器中输入 <code>localhost:8081/index/home</code>，那么页面上回输出<code>{"id":"Hello home"}</code>，以及控制台中输出<code>{ id: 'home' }</code></p>

<h3>静态文件<sup>仓库中有代码展示（Express01）</sup></h3>
<p>我们整个的目录如下所示：</p>

```
package.js
package-lock.js
node_modules

public
public/scripts
public/stylesheets
views
app.js
```

<i class="icon-file"></i> index.html
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
    <link rel="stylesheet" href="stylesheets/index.css">
</head>
<body>
    hello
    <script src="scripts/index.js"></script>
</body>
</html>
```

<i class="icon-file"></i> index.js
```javascript
console.log(123);

function fn(){ }
fn();
```

<i class="icon-file"></i> index.css
```
body { margin: 0; background-color: black; color: #fff; }
```

<i class="icon-file"></i> app.js
```javascript
const express = require('express');
const app = express();

// GET /stylesheets/index.css
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile( __dirname + "/views/" + "index.html" );
});

var server = app.listen(8081, () => {
  console.log('接口已启动');
});
```
<p>在Express应用程序中的<a href="http://www.expressjs.com.cn/4x/api.html#res.render">express.static</a>中间件</p>

<h3>表单提交</h3>

```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer(); // 用于分析多部分/表单数据

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // 用于分析应用程序/json
app.use(bodyParser.urlencoded({ extended: true })); // 用于分析应用程序/x-www-form-urlencoded

app.get('/index', (req, res) => {
  res.sendFile(__dirname + "/views/" + "index.html");
});

app.post('/index', upload.array(), function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
  
});

var server = app.listen(8081, () => {
  console.log('接口已启动');
});
```
<p>上面代码块中 <code><a href="https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md">multer</a></code> 需要本地安装 <code>npm install multer --save</code>，以及<code><a href="http://www.expressjs.com.cn/4x/api.html#req.body">req.body</a></code></p>