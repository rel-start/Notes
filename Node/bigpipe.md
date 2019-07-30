# bigpipe

标签（空格分隔）： Node

---

<h3>先使用koa实现简单的服务</h3>

```javascript
const Koa = require('koa');
const app = new Koa();
const router = require('koa-simple-router');

app.use(router(_ => {
  _.get('/', async (ctx, next) => {
    // 相当于nodejs：ctx.res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    ctx.status = 200;
    ctx.type = 'html'
    ctx.res.write('loading...');
    ctx.res.write('123<br/>');
    ctx.res.write('456<br/>');
    // 替代ctx.body = '123456'
    ctx.res.end();
  })
}));

app.listen(8085, () => {
  console.log('8085端口启动');
});
```

上面用[response.write()](http://nodejs.cn/api/http.html#http_response_write_chunk_encoding_callback)的方式替代了`ctx.body`

<h3>实现一段段传输</h3>

这里我们用了`setTimeout`做下延迟

```javascript
...
  const task1 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('<br/> 第一次传输 ');
      }, 2000);
    });
  }

  const task2 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('<br/> 第二次传输 ');
      }, 3000);
    });
  }

  app.use(router(_ => {
    _.get('/', async (ctx, next) => {
      // 相当于nodejs：ctx.res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      ctx.status = 200;
      ctx.type = 'html'
      ctx.res.write('loading...');
      const result1 = await task1();
      ctx.res.write(result1);
      const result2 = await task2();
      ctx.res.write(result2);
      ctx.res.end();
    })
  }));
...
```

达成的效果如下：

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/bigpipe01.gif"></p>

<h3>将task灌到页面上</h3>

```javascript
const Koa = require('koa');
const app = new Koa();
const router = require('koa-simple-router');
const fs = require('fs');

const task1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('<br/> 第一次传输 ');
    }, 2000);
  });
}

const task2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('<br/> 第二次传输 ');
    }, 3000);
  });
}

app.use(router(_ => {
  _.get('/', async (ctx, next) => {
    // 相当于nodejs：ctx.res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    ctx.status = 200;
    ctx.type = 'html';
    const file = fs.readFileSync('./index.html', 'utf-8');
    ctx.res.write(file);
    const result1 = await task1();
    ctx.res.write(result1);
    const result2 = await task2();
    ctx.res.write(result2);
    ctx.res.write('</body></html>');
    ctx.res.end();
  })
}));

app.listen(8085, () => {
  console.log('8085端口启动');
});
```

`index.html`：页面底部需要在node里面闭合，也就是闭合`</body></html>`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="app">
    核心页面
    <section>
      <div id="part1">loading...</div>
      <div id="part2">loading...</div>
    </section>
  </div>
```

原先要实现的效果是`第一次输出`需要在`#part1`中展示出来。从下面的效果图中可以看出，`第一次输出`不在指定块，这不是我们想要的效果

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/bigpipe02.gif"></p>

接下来我们来改动下2个文件。

<h3>数据输出到模板的指定模块</h3>

`index.html`

```html
...

<div id="app">
    核心页面
    <section>
      <div id="part1">loading...</div>
      <div id="part2">loading...</div>
    </section>
  </div>

  <script>
    function addHtml(name, content) {
      document.getElementById(name).innerHTML = content;
    }
  </script>
```

模板也只多个`addHtml`函数。那么后台只要调用这个方法就可以在指定位置灌数据了

`app.js`

```javascript
...
const task1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`<script>addHtml('part1', '<br/> 第一次传输')</script>`);
    }, 2000);
  });
}

const task2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`<script>addHtml('part2', '<br/> 第二次传输')</script>`);
    }, 3000);
  });
}
...
```

实现的效果如下：

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/bigpipe03.gif"></p>

上面我们的2个`task`是串行的，第一个执行完才能执行下一个，就是2秒后在等3秒才能显示`task2`

<h3>实现并行输出</h3>

```javascript
...
app.use(router(_ => {
  _.get('/', async (ctx, next) => {
    ctx.status = 200;
    ctx.type = 'html';
    const file = fs.readFileSync('./index.html', 'utf-8');
    ctx.res.write(file);
    await Promise.all([
      task1().then(result1 => {
        ctx.res.write(result1);
      }),
      task2().then(result2 => {
        ctx.res.write(result2);
      })
    ]);
    // const result1 = await task1();
    // ctx.res.write(result1);
    // const result2 = await task2();
    // ctx.res.write(result2);
    ctx.res.write('</body></html>');
    ctx.res.end();
  })
}));
...
```

上面使用了`Promise.all()`，现在的化等`task1`执行后只要等1秒就执行`task2`

<h3>解决模板页面的问题</h3>

利用`stream`边读边吐

```javascript
...
app.use(router(_ => {
  _.get('/', async (ctx, next) => {
    ctx.status = 200;
    ctx.type = 'html';
    const stream = fs.createReadStream(join(__dirname, 'index.html'));
    stream.on('data', (chunk) => {
      console.log('🍎', chunk);
      // 这里暂时没弄懂为什么没有下面这个Promise.all() 会报错write after end
      ctx.res.write(chunk);
    });
    // stream.pipe(ctx.body);
    ...
  })
}));
...
```