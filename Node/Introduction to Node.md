# Introduction to Node

标签（空格分隔）： Notes

---
[TOC]

相关连接:

- 官网: https://nodejs.org/en/
- 中文官网: http://nodejs.cn/

<h3>Node基本操作命令</h3>

```javascript
// 查看node版本
$ node -v

// 运行文件
$ node ./index.js

// node调试. chrome调试页面(chrome://inspect/)
$ node --inspect-brk index.js
``` 

<h3>Node环境</h3>

```javascript
// 进入REPL环境, 该环境下可以使用js语法。下面的命令需在node环境下
$ node

// 退出当前终端
ctrl + c

// 退出 Node REPL
ctrl + c 按下两次
ctrl + d

// 查看输入的历史命令
向上/向下

// 列出当前命令
tab键

// 列出使用命令
$ .help

// 退出多行表达式
$ .break

// 退出多行表达式
$ .clear

// 保存当前的 Node REPL 会话到指定文件
$ .save filename

// 载入当前 Node REPL 会话的文件内容
$ .load filename
```
<p>node环境下可进行运算等(与<code>IDE</code>环境比较类似)</p>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/node-hj.png" /></p>

<h3>node回调</h3>
<h4>什么是回调</h4>

- 函数调用方式分为三类: 同步调用、回调和异步调用
- 回调是一种双向调用模式
- 可以通过回调函数来实现回调

<h4>阻塞与非阻塞</h4>

- 阻塞和非阻塞关注的是程序在等待调用结果（消息，返回值）时的状态
- 阻塞就是做不完不准回来（等待函数返回一个值），我等着
- 非阻塞就是你先做，我现在看看有其他事没有，完了告诉我一声（函数被调用马上返回，函数内部还在继续工作，被调用函数做完在通知我）

<p>以下是一个简单阻塞代码，前提是有<code>data.txt</code>其内容为 <code>aaa</code></p>

```javascript
// 阻塞代码
var fs = require('fs');
var data = fs.readFileSync('data.txt');
console.log(data);
console.log('读取成功');
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/node-zs01.png" /></p>
<p>以下是个非阻塞代码展示</p>

```javascript
// 非阻塞代码
var fs = require('fs');
fs.readFile('data.txt', function(err, data) {
  if (err) return console.error(err);
  console.log(data.toString());
});
console.log('读取成功');
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/node-fzs01.png" /></p>

<h3>事件驱动模型<sup>事件驱动IO | 非阻塞IO</sup></h3>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/node-sjqdmx.png" /></p>

```javascript
// 引入Event模块并创建eventsEmitter对象
const events = require('events');
const eventEmitter = new events.EventEmitter();

// 绑定事件函数
const conncHander = function conncted() {
  console.log('conncted被调用了');
}
eventEmitter.on('connection', conncHander); // 完成事件绑定

// 触发事件
eventEmitter.emit('connection');
```
<h3>模块化的概念与意义</h3>

- 为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统
- 模块是Node.js应用程序的基本组成部分
- 文件和模块是一一对应的。一个Node.js文件就是一个模块
- 这个文件可能是JavaScript代码、JSON或者编译过的C/C++扩展
- Node.js中存在4类模块（原生模块和3种文件模块）

<h4>Node.js的模块加载流程</h4>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/node-mkjzlc.png" /></p>

- 从文件模块缓存中加载
- 从原生模块加载
- 从文件加载

<p>require方法加载模块</p>

- require方法接受一下集中参数的传递：
- http、fs、path等，原生模块
- ./mod或../mod，相对路径的文件模块
- /pathtomodule/mod，绝对路径的文件模块
- mod，非原生模块的文件模块

<p>以下是自定义文件模块的一个小案例，简单说明了如何导出模块(<code>hello.js</code>文件)、以及加载模块(<code>main.js</code>文件)</p>

<i class="icon-file"></i> main.js
```javascript
const Hello = require('./hello.js');

const hello = new Hello();
hello.setName('断点');
hello.sayHello();
```

<i class="icon-file"></i> hello.js
```javascript
// 模块的主要逻辑
function Hello(){
  var name;
  this.setName = function (argName){
    name = argName;
  }

  this.sayHello = function (){
    console.log(`Hello ${name}`);
  }
}

// 对模块进行导出
module.exports = Hello;
```
<h4><a href="https://www.runoob.com/nodejs/nodejs-router.html">Node路由</a></h4>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/node-lu.png"/></p>
<p>下面是一个路由的小案例，<a href="https://www.runoob.com/nodejs/node-js-get-post.html">Node.js GET POST请求</a></p>

<i class="icon-file"></i> index.js
```javascript
var server = require("./server");
var router = require("./router");

// server.js文件模块中通过 module.exports 导出
// router.js 文件通过 exports.route 输出
server(router.route);
```

<i class="icon-file"></i> server.js
```javascript
var http = require("http");
var url = require("url");

function start(route) {
  http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;

    route(pathname, response);
  }).listen(8888);
  console.log("Server has started.");
}

module.exports = start;
```

<i class="icon-file"></i> router.js
```javascript
function route(pathname, response) {
  if (pathname == '/') {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
  } else if (pathname == '/index/home') {
    response.end('index');
  } else {
    response.end('404');
  }
}

exports.route = route;
```
<h4><a href="https://www.runoob.com/nodejs/nodejs-global-object.html">Node.js 全局对象</a></h4>

<h4><a href="https://www.runoob.com/nodejs/nodejs-restful-api.html">Node.js RESTful API</a></h4>


<hr />
<h2>包管理器npm</h2>

- 官网: https://www.npmjs.com/
- 中文文档: https://www.npmjs.com.cn/
- 淘宝npm镜像: http://npm.taobao.org/

<p>更新 npm</p>

```javascript
// 查看npm版本
$ npm -v

// 最新版本npm
$ npm install npm@latest -g

// 要安装将来发布的版本，请运行：
npm install npm@next -g
```

<h3>npm常用包以及<a href="https://www.cnblogs.com/itlkNote/p/6830682.html">一些命令</a></h3>

```javascript
// 安装境内的cnpm包
$ npm install cnpm -g

// 清除缓存
$ npm cache clean --force

// 列出安装的软件包
$ npm ls

// 初始化npm, 会生成一个package.json
$ npm init

// npm子命令
$ npm help

// npm install命令使用手册
$ npm help install

// -------------------------------------

// 全局安装nrm
$ npm install nrm -g

// 卸载全局nrm
$ npm uninstall -g nrm

// 查看可用镜像源
$ nrm ls

// 将镜像源切换成淘宝
$ nrm use taobao

// 查看所有npm jquery包
$ npm search jquery
```

<h3>第一个最基本的web服务<code>server.js</code></h3>

```javascript
var http = require('http');
http.createServer(function (req, res){
  // 定义HTTP头
  res.writeHead(200, {'Content-Type': 'text/plan'});

  // 发送相应数据
  res.end('Hello World!\n');
}).listen(8000);

// 服务运行后输出一行信息
console.log('server is running...');
```
<p>在终端输入<code>node server.js</code></p>

```
$ node server.js
```
<p>等到终端打印 <code>server is running...</code>. 就可以在浏览器<code>http://localhost:8000/</code>看到服务返回的信息了</p>



