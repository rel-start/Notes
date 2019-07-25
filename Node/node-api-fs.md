# node基础api-fs文件系统

标签（空格分隔）： Node

---

在 node 中文件交互是非常重要的，例如文件的打开、读取、写入文件、以及与其交互等等，这其中围绕着异步模式和同步模式读取的话题。下面就 node 的 `fs` 文件系统操作举例说明。所有案例都是 mac 下完成，window 下是否有路径问题 不得而知

<h2>文件使用特点</h2>

1. 同步的版本将阻塞整个进程，直到它们完成（停止所有连接）
2. 异步文件系统不会阻塞程序的执行，而是在操作完成时，通过回调函数将结果返回，但是无法保证操作的正确性和有效的顺序。


<h2>文件写入</h2>

```
ndfs
  |- source
    |- 1.txt
    |- a.png
    |- a.mp3
```

1.异步文件写入

```javascript
// 引入 fs 模块
const fs = require('fs');

/**
 * @description
 * 异步打开文件操作 fs.open
 * 异步写入文件操作 fs.writeFile
 * 异步关闭文件操作 fs.close
 */

fs.open('source/1.txt', 'r+', (err, fd) => {
	if (err) throw err;
	fs.writeFile(fd, 'node是很有意思的语言！', err => {
		if (err) throw err;
		console.log('写入文件');
		fs.close(fd, err => {
			if (err) throw err;
			console.log('文件已保存并关闭');
		})
	})
});
```

2.同步写入方式

不同的 [文件系统标志](http://nodejs.cn/api/fs.html#fs_file_system_flags) 还是有些差异的

```javascript
const fs = require('fs');

// 打开文件 同步
var fd = fs.openSync('source/1.txt', 'w');

// 写入内容
fs.writeFileSync(fd, '同');

// 保存并关闭
fs.closeSync(fd);
```

<h2>读写操作</h2>

**1.文件读写操作**

```javascript
const fs = require('fs');

/**
 * @description
 * 异步读取操作 fs.readFile
 */

fs.readFile('source/1.txt', 'utf8', (err, data) => {
	if (err) throw err;
	console.log(data);
})
```


**2.图片读写操作**

```javascript
const fs = require('fs');

/**
 * @description
 * 异步读取文件 fs.readFile
 * 异步写入文件 fs.writeFile
 */
 
fs.readFile('source/a.png', (err, data) => {
	if (err) throw err;
	// 文件写入
	fs.writeFile('b.png', data, err => {
		if (err) throw err;
		console.log('写入成功')
	})
})
```

运行后会在`ndfs`目录下产生`b.png`，内容与`a.png`相同

```
ndfs
  |- source
    |- 1.txt
    |- a.png
    |- a.mp3
+ |- b.png
```

**3.视频写入操作**

```javascript
const fs = require('fs');

/**
 * @description
 * 异步读取文件 fs.readFile
 * 异步写入文件 fs.writeFile
 * 创建文件读取流 fs.createReadStream
 * 创建文件写入流 fs.createWriteStream
 * 管道推送数据 readable.pipe（http://nodejs.cn/api/stream.html#stream_readable_pipe_destination_options）
 * 为了最小化内存成本，尽可能通过 fs.createReadStream() 进行流式传输
 */

// 方式一
fs.readFile('source/a.mp3', (err, data) => {
	if (err) throw err;
	// 文件写入
	fs.writeFile('b.mp3', data, err => {
		if (err) throw err;
		console.log('写入成功')
	})
})

// 方式二
let fd = fs.createReadStream('source/a.mp3');
let ws = fs.createWriteStream('c.mp3');
// 将可读流的所有数据通过管道推送到 c.mp3 文件
fd.pipe(ws)
```

运行后会在`ndfs`目录下产生`b.mp3`、`c.mp3`

**4.使用同步文件流写入操作**

```javascript
let ws = fs.createWriteStream('source/1.txt');

ws.on('open', () => {
	console.log('通道打开');

});

ws.on('end', () => {
	console.log('通道关闭')
})
// 写入内容
ws.write('node开始');
ws.write('node1');
ws.write('node2');
ws.write('node结束');
```