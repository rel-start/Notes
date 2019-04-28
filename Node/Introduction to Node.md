# Introduction to Node

标签（空格分隔）： Notes

---

相关连接:
官网: https://nodejs.org/en/
中文官网: http://nodejs.cn/

<h2>Node基本操作命令</h2>
<p>查看node版本</p>

```
$ node -v
``` 

<h2>node环境</h2>
<p>进入node环境<p>

```
$ node
```
<p>退出node环境可以按2次<code>ctrl+c</code>, 或者用以下命令</p>

<p>node环境下可进行运算等(与IDE环境比较类似)</p>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/node-hj.png" /></p>

```
.exit
```
<p>node环境下按<code>tab</code>可以显示代码提示</p>

<hr />
<h2>包管理器npm</h2>

- 官网: https://www.npmjs.com/
- 中文文档: https://www.npmjs.com.cn/
- 淘宝npm镜像: http://npm.taobao.org/

<p>更新 npm</p>

```
# 查看npm版本
$ npm -v
# 最新版本npm
$ npm install npm@latest -g
# 要安装将来发布的版本，请运行：
npm install npm@next -g
```

<p>安装境内的<code>npm</code>镜像 <code>cnpm</code></p>

```
$ npm install cnpm -g
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



