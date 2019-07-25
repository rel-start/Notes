# node基础api-path路径

标签（空格分隔）： Node

---

`path` 模块提供用于处理文件路径和目录路径的实用工具

<h3>path使用特点</h3>

`path` 模块的默认操作因 `Node.js` 应用程序运行所在的操作系统而异。具体来说，当在`windows`操作系统下运行时，`path`模块将假定正在使用`windows`风格的路径

<h3>获取文件名 path.basename(p[,ext])</h3>

方法有 `windows` 与 `POSIX`(Unix的标准) 的[差异](http://nodejs.cn/api/path.html)，下面只展示了 `mac` 下的效果

```javascript
path.basename('/foo/bar/baz/asdf/quux.html');
// => 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// => 'quux'
```

<h3>path.delimiter</h3>

提供平台特定的路径定界符

- `;` 用于 Windows
- `:` 用于 POSIX

例如，在 POSIX 上：

```javascript
process.env.PATH;
// => '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'

process.env.PATH.split(path.delimiter);
// => ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']
```

在 Windows 上：
```javascript
process.env.PATH;
// => 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'

process.env.PATH.split(path.delimiter);
// => ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']
// process.env.PATH 环境变量
```

<h3>获取路径 path.dirname(p)</h3>

```javascript
const path = require(path)
path.dirname('/foo/bar/baz/asdf/quux.js')
// => /foo/bar/baz/asdf
```

<h3>文件后缀 path.extname(p)</h3>

```javascript
path.extname('index.html')
// => .html
```

<h3>path.format(pathObject)</h3>

`path.format()` 方法从对象返回路径字符串。与 path.parse() 相反

当为 `pathObject` 提供属性时，注意以下组合，其中一些属性优先于另一些属性：

- 如果提供了 `pathObject.dir`，则忽略 `pathObject.root`。
- 如果 `pathObject.base` 存在，则忽略 `pathObject.ext` 和 `pathObject.name`。

例如，在 POSIX 上：windows上的例子不展示了

```javascript
path.format({
    root: '/ignored',
    dir: '/home/user/dir',
    base: 'file.txt'
})
// => /home/user/dir/file.txt
```

<h3>获取路径字符串的对象 path.parse(p)</h3>

```javascript
path.parse('/home/user/dir/file.txt');
// 返回:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

<h3>拼接文件路径 path.join([...paths])</h3>

```javascript
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// => /foo/bar/baz/asdf/quux
```

<h3>获取规范化路径 path.normalize(p)</h3>

```javascript
path.normalize('/foo/bar//baz/asdf/quux/..');
// 返回: '/foo/bar/baz/asdf'
```

<h3>获取绝对路径 path.reslove([...paths])</h3>

```javascript
path.resolve('/foo/bar', './baz');
// => /foo/bar/baz
path.resolve('/foo/bar', '/baz/file/');
// => /baz/file
path.resolve('wwwroot', 'static_file/png/', '../gif/image.gif');
// 当前工作目录是 /Applications/yd/node-demo
// => /Applications/yd/node-demo/wwwroot/static_file/gif/image.gif
```



