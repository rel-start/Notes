# node基础api-events事件循环

标签（空格分隔）： Node

---

说起node的事件驱动模型首先我们来搞清楚几个概念CPU，线程、进程、调度、事件驱动

<h3>CPU</h3>

- CPU 是中央处理器，是计算机的核心
- CPU 通过和寄存器，高速缓存，以及内存交互来执行程序
- `32`位 CPU 最多寻址`4g`内存，而`64`位 CPU 目前来说没有上限

<h3>进程、线程与协程</h3>

- 进程（Process）的目的就是担当分配系统资源（CPU时间，内存）的实体。
- 线程（Thread）是操作系统能够进行运算调度的最小单位
- 协程是一种用户态的轻量级线程，无法利用多核资源
- IO密集型应用的发展：多进程->多线程->事件驱动->协程
- CPU密集型应用的发展：多进程->多线程
- 调度和切换的时间：进程->线程->协程
  

<h3>事件驱动模型</h3>

- 事件驱动模型是为了解决高并发（如Node，Nginx)
- 操作系统在调度时较少的切换上下文，没有线程同步等问题

**Node事件驱动模型**

1、每一个 I/O 工作被添加到事件队列中，线程循环地处理队列上的工作任务，当执行过程中遇到来堵塞(读取文件、查询数据库)时，线程不会停下来等待结果，而是留下一个处理结果的回调函数，转而继续执行队列中的下一个任务。这个传递到队列中的回调函数在堵塞任务运行结束后才被线程调用

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/event20190707.png"></p>

2、Node 在启动进程中会创建一个循环，每次循环运行就是一个Tick周期，每个Tick周期中会从事件队列查看是否有事件需要处理，直到事件队列全部执行完毕，node应用就会终
3、Node 对于堵塞 I/O 使用线程池来在操作，通过取其中一个子线程线程来执行复杂任务，而不占用主循环线程。当堵塞任务执行完毕通过添加到事件队列中的回调函数来处理接下来的工作，这样就防止堵塞 I/O 占用空闲资源，这就是所谓的非阻塞式 I/O

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/event-loop20190707.png"></p>

**事件队列调度（通过回调函数将任务添加事件队列中）**

1. 内置的事件和事件监听器（http、server的一些事件）
2. 异步堵塞 I/O 库(db处理、fs处理等)
3. 定时器setTimeout、setInterval
4. 全局对象process的.nextTick()API
5. 自定义的事件和监听器

**内置事件(举例)**

```javascript
// 引入 events 模块
let events = require('events');

// 创建事件对象
let eventEmitter = new events.EventEmitter();

// 创建事件处理程序
let connectHandler = function connected() {
   // 开始触发事件 
   eventEmitter.emit('start');
}

// 绑定事件处理程序
eventEmitter.on('connection', connectHandler);
eventEmitter.on('start', function(){});

// 触发事件处理程序
eventEmitter.emit('connection');

console.log("程序执行完毕。");
```