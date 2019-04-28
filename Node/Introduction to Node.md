# Introduction to Node

标签（空格分隔）： Notes

---

相关连接:

- 官网: https://nodejs.org/en/
- 中文官网: http://nodejs.cn/

<h2>Node基本操作命令</h2>
<p>查看node版本</p>

```java
$ node -v
``` 

<h2>Node环境</h2>
进入REPL环境, 该环境下可以使用js语法
```
$ node
```
退出当前终端
```
ctrl + c
```
```java
# 进入REPL环境, 该环境下可以使用js语法
$ node
# 退出当前终端
ctrl + c
# 退出 Node REPL
ctrl + c 按下两次
# 退出 Node REPL
ctrl + d
# 查看输入的历史命令
向上/向下
# 列出当前命令
tab键
# 列出使用命令
$ .help
# 退出多行表达式
$ .break
# 退出多行表达式
$ .clear
# 保存当前的 Node REPL 会话到指定文件
$ .save filename
# 载入当前 Node REPL 会话的文件内容
$ .load filename
```
<p>node环境下按<code>tab</code>可以显示代码提示</p>

<p>node环境下可进行运算等(与<code>IDE</code>环境比较类似)</p>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/node-hj.png" /></p>

<h3>node相关命令</h3>

```java
$ node ./index.js
# node调试. chrome调试页面(chrome://inspect/)
$ node --inspect-brk index.js
```

<hr />
<h2>包管理器npm</h2>

- 官网: https://www.npmjs.com/
- 中文文档: https://www.npmjs.com.cn/
- 淘宝npm镜像: http://npm.taobao.org/

<p>更新 npm</p>

```java
# 查看npm版本
$ npm -v
# 最新版本npm
$ npm install npm@latest -g
# 要安装将来发布的版本，请运行：
npm install npm@next -g
```

<h3>npm常用包以及<a href="https://www.cnblogs.com/itlkNote/p/6830682.html">一些命令</a></h3>

```java
# 安装境内的cnpm包
$ npm install cnpm -g

# 清除缓存
$ npm cache clean --force
# 列出安装的软件包
$ npm ls
# 初始化npm, 会生成一个package.json
$ npm init

# 全局安装nrm
$ npm install nrm -g
# 卸载全局nrm
$ npm uninstall -g nrm
# 查看可用镜像源
$ nrm ls
# 将镜像源切换成淘宝
$ nrm use taobao
# 查看所有npm包
$ nrm use npm
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



