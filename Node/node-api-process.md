# node基础api-process进程

标签（空格分隔）： Node

---

`process` 对象是一个全局变量，它提供有关当前 Node 进程的信息并对其进行控制。作为一个全局变量，它始终可共 Node 应用程序使用，无需使用 `require()`。

<h2>Master-Worker模式（主从模式）</h2>

主从模式主要用于在分布式架构中并行处理业务的模式，具有良好的可伸缩性和稳定性，主进程（master）负责和管理工作进程（worker），工作进程（worker）负责具体的业务逻辑。

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/master-worker20190707.png"></p>

**worker.js**

```javascript
/**
 * 创建工作进程
 * worker.js
 */
 
// 引入http模块
const http = require('http');

// 创建服务
const server = http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end('Hello World');
});

// 指定域名
const domain = '127.0.0.1';

// 随机创建端口
const port = Math.round((1 + Math.random()) * 1000);
console.log(`🍎 port= ${port}`)

// 监听启动服务
server.listen(port, domain);
```

**master.js**

```javascript
/**
 * 创建主进程
 * master.js
 */

// 引入核心模块child_process创建子进程
const childProcess = require('child_process');

// 引入os模块，得到cpu数量
const cpus = require('os').cpus();

// 根据cpu数量去复制对应的 node 的进程数量
for (let i = 0; i < cpus.length; i++) {
  childProcess.fork('./worker.js');
}
```

<h2>进程间通信</h2>

说起进程通信，其实我们都熟悉浏览器的 JavaScript 主线程与 UI 渲染，共用一个线程。两个是互斥关系，当 UI 渲染时 JS 引擎线程暂时挂起。所以为了解决这个问题 HTML5 提出 `WebWork API` 主线程之间通过`onmessage()`和`postMessage()`进行通行，使 JS 阻塞较为严重的计算不影响主线程上的 UI 渲染。

在 node 中为了实现父子进程通讯，父子之间将会创建`IPC`通道，通过`IPC`通道，父子进程才能通过`message`和`send()`传递函数

**IPC原理创建实现示意图**

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/ipc20190707.png"></p>

<h2>IPC通道创建、连接</h2>

1. 父进程在实际创建子进程之前，首先创建`IPC`通道并监听，然后在创建子进程
2. 通过环境变量（NOE_CHAMMEL_FD）通知子进程`IPC`通道的文件描述符
3. 子进程启动过程中通过文件描述符连接已经存在的`IPC`通道
4. 建立连接后就可以在内核中完成双向通信，不经过网络层
5. 在 Node 中，IPC 被抽象成为`Stream`对象，调用`send()`发送数据，通过`messge`事件接收数据

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/ipc-create20190707.png"></p>

**naster.js**

```javascript
/**
 * 创建父进程
 * master.js
 */

// 引入核心模块child_process创建子进程
const childProcess = require('child_process');

// 复制进程
const n = childProcess.fork(__dirname + '/worker.js')

// 监听message
n.on('message', m => {
	console.log(`🍌${m.hello} - ${m.foo}`)
})

n.send({hello: 'world'})
```

**worker.js**

```javascript
/**
 * 创建子进程
 * worker.js
 */
 
// 监听messge
process.on('message', m => {
	console.log(`🍎${m.hello} - ${m.foo}`)
})

// 发送数据
process.send({foo: 'bar'});
```

输出：

    🍎world - undefined
    🍌undefined - bar
    
    
<h2>句柄传递</h2>

通过上述我们简单的了解到进程之间通信原理，但是我们想要通过监听一个端口，主进程将所有的请求交由子进程处理，上述通信远远不够的，所以可以通过 `Node句柄传递` 来实现

主进程将请求发送给工作进程

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/process-send20190707.png"></p>

主进程发送完句柄并关闭监听

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/process-on20190707.png"></p>

**master.js**

```javascript
// 引入核心模块child_process创建子进程
const cp = require('child_process');

// 复制进程
// http://nodejs.cn/api/child_process.html#child_process_subprocess_send_message_sendhandle_options_callback
const child1 = cp.fork(__dirname + '/worker.js');
const child2 = cp.fork(__dirname + '/worker.js');

// 打开服务使用的服务对象发送数据
const server = require('net').createServer();
server.listen(1337, () => {
  child1.send('server', server);
  child2.send('server', server);
  console.log(`🍎${server.address()}`)
  // 主进程发送完成句柄关闭监听
  server.close();
})
```

**worker.js**

```javascript
// 引入http模块
const http = require('http');

// 创建服务
const server = http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end(`pid is ${process.pid}`);
})

// 子进程
process.on('message', (m, tcp) => {
	console.log(`🍊${m} ----- ${tcp}`)
	if (m == 'server') {
		tcp.on('connection', socket => {
			console.log(`🚗${socket}`)
			server.emit('connection', socket);
			// socket.end('由子进程处理');
		})
	}
})
```

输出：

    🍎[object Object]
    🍊server ----- [object Object]
    🍊server ----- [object Object]
    🚗[object Object]
    🚗[object Object]