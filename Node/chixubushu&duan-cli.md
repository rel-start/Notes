# 从0到大论前端持续集成

标签（空格分隔）： Node

---

<h2>Web Components</h2>

- Custom elements（自定义元素）
- Shadow DOM
- HTML templates（HTML模板）

**参考**

- 阮一峰： http://javascript.ruanyifeng.com/htmlapi/webcomponents.html
- MDN： https://developer.mozilla.org/zh-CN/docs/Web/Web_Components

<h3>Custom Elements</h3>

提供⼀一种⽅方式让开发者可以⾃自定义 HTML 元素，包括特定的组成，样式和行。

```javascript
<button-hello>hello</button-hello>
<button is="button-hello">hello world</button>

<script>
class ButtonHelloElement extends HTMLElement {
  constructor() {
    super()
    this.addEventListener('click', () => {
      alert('hello world')
    })
  }
}
customElements.define('button-hello', ButtonHelloElement, {
  extends: 'button'
});
</script>
```

<h2>构建一个自己的 cli </h2>

<h3>Centos 安装node</h3>

因为有些命令需要在 linux、Mac 下运行。我使用 [教程](https://www.jianshu.com/p/7d3f3fa056e8) 第2中方法

在虚拟机中使用 `wget` 下载，[下载源，- -点我](https://nodejs.org/download/release/latest-v10.x/)

```javascript
# cd ~
# wget https://nodejs.org/download/release/latest-v10.x/node-v10.16.0-linux-x64.tar.gz
```

下载完成后使用下面的命令解压到`/usr/local`目录并安装：

```javascript
# sudo tar --strip-components 1 -xzvf node-v10.16.0-linux-x64.tar.gz -C /usr/local
```

检查是否安装成功

```javascript
# node -v
// => 10.16.0
```


<h3>正式写cli</h3>

文件 `duan-cli`的目录：

    .
    ├── bin
        └── yd
    └── package.json

`yd` 文件的内容如下：

`#!/usr/bin/env node` 这种叫`shebang`节点，windows下无法正确运行。
这个链接中查找 [node bin/npm-postinstall](https://shapeshed.com/writing-cross-platform-node/)，好像是解决windows的方法

```javascript
#!/usr/bin/env node
console.log('duandian');
```

`package.json`文件的内容如下：

```javascript
{
  "name": "duan-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "duancli": "./bin/duan"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

配置完上面这些使用`npm link`命令，就可以将`duan-cli`目录打到全局的`node_modules`

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/duan-cli01.png"></p>


```javascript
# duancli
```

当使用`duancli`命令的后，控制台会显示 duandian

继续为`duan`文件添加内容

```javascript
#!/usr/bin/env node
// console.log('duandian');

const program = require('commander');

program.version('0.1.0','-v,--version');
program
  .option('-p, --peppers', 'Add peppers')
  .parse(process.argv);
  
if (program.peppers) console.log('  - peppers');
```

每次编辑完都需要执行下`npm link`，更新全局的包。这样显得有些繁琐，那么可以使用如下命令

```
// 执行下，就会更新所有改动
# node ./bin/duan
// chmod +x ./bin/duan
# duancli
```

编辑完上面文件并更新完全局的`duan`变量，就可以查看效果了。这里需要装`commander`包

```javascript
# duancli -V
// => '0.1.0'

# duancli -p
// => '  - peppers'
```

命令行中执行`duancli --help`，就可以看到我们所有的配置，也就是展示所有`option`

<h4>ASCII文字，SpringBoot自定义启动Banner</h4>

- 链接：https://www.bootschool.net/ascii

更新后的`duan`文件如下，期间需调用用[@darkobits/lolcatjs](https://www.npmjs.com/package/@darkobits/lolcatjs)

```javascript
# npm install -D @darkobits/lolcatjs
```

```javasccript
const Printer = require('@darkobits/lolcatjs').default;
const input = [
  "     _                               _           _         ",
  "  __| |  _   _    __ _   _ __     __| |   __ _  (_) _ __   ",
  " / _` | | | | |  / _` | | '_ \   / _` |  / _` | | | | '_ \ ",
  "| (_| | | |_| | | (_| | | | | | | (_| | | (_| | | | | | | |",
  " \__,_|  \__,_|  \__,_| |_| |_|  \__,_|  \__,_| |_| |_| |_|",
  "                                                           ",
  "                   duancli 0.1.0                           "
].join('\n');

program.version(Printer.default.fromString(input), '-v,--version');
program
  .option('-p, --peppers', 'Add peppers')
  .parse(process.argv);
```

更新全局`duancli`。

```javascript
# node ./bin/duan
```

到这里，执行`duancli -v`，就可以看到以下效果了：

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/duan-cli02.png"></p>

<h4>cli 添加json2ts，以及错误退出相关</h4>

```javascript
...
#!/usr/bin/env node
const program = require("commander");
const Printer = require('@darkobits/lolcatjs');
// 终端字符串样式
const chalk = require("chalk");
const inquirer = require("inquirer");
const input = [
  "     _                               _           _         ",
  "  __| |  _   _    __ _   _ __     __| |   __ _  (_) _ __   ",
  " / _` | | | | |  / _` | | '_ \   / _` |  / _` | | | | '_ \ ",
  "| (_| | | |_| | | (_| | | | | | | (_| | | (_| | | | | | | |",
  " \__,_|  \__,_|  \__,_| |_| |_|  \__,_|  \__,_| |_| |_| |_|",
  "                                                           ",
  "                   duancli 0.1.0                           "
].join('\n');

program.version(Printer.default.fromString(input), "-v,--version");
//命令行的参数
const bindHandler = {
  json2ts() {
    const json2ts = require('json2ts');

    const message = {
      name: '汤烨',
      data: {
        age: 30
      }
    }

    const jsonContent = JSON.stringify(message);
    let result = json2ts.convert(jsonContent);
    console.log(result)
  }
}
program.option("-i,--init", "项目初始化🐶");
program
  .usage("<cmd> [options]")
  .arguments("<cmd> [env]")
  .action((cmd, otherParmas) => {
    const handler = bindHandler[cmd];
    /**
     * 终端执行： duancli init 33
     *    - cmd='inti'; hander=bindHandler['init'] 这个handler就是个函数，所以进入下面的else, 在执行 handler('33')
     *    - bindHandler.hasOwnProperty(cmd)。就是bindHandler上没有cmd这个方法，就会在终端输出 '非常遗憾' 
     */
    if (typeof handler === 'undefined') {
      // https://emojipedia.org/people/
      console.error(chalk.yellow(`非常遗憾 【${comd}】 暂未提供😅`));
      // 1: 错误退出。0：正常退出
      process.exit(1);
    } else {
      handler(otherParmas)
    }
  })
program.parse(process.argv);
```

下面代码是完整替换了`duan`文件，并且添加了很多~

```javascript
#!/usr/bin/env node
const program = require("commander");
const Printer = require('@darkobits/lolcatjs');
// 终端字符串样式
const chalk = require("chalk");
// 常用交互式命令行用户界面的集合
const inquirer = require("inquirer");
// Node.js API之上的Unix shell命令。mkdir
const shelljs = require("shelljs");
// 获取用户主目录的路径
const userHome = require("user-home");
// 优雅的终端微调器。这里是一个 loading 效果
const ora = require("ora");
const input = [
  "     _                               _           _         ",
  "  __| |  _   _    __ _   _ __     __| |   __ _  (_) _ __   ",
  " / _` | | | | |  / _` | | '_ \   / _` |  / _` | | | | '_ \ ",
  "| (_| | | |_| | | (_| | | | | | | (_| | | (_| | | | | | | |",
  " \__,_|  \__,_|  \__,_| |_| |_|  \__,_|  \__,_| |_| |_| |_|",
  "                                                           ",
  "                   duancli 0.1.0                           "
].join('\n');

program.version(Printer.default.fromString(input), "-v,--version");
//命令行的参数
const bindHandler = {
  init() {
    inquirer
      .prompt([
        {
          type: "text",
          "message": "1. 请输入文件夹名称",
          name: "dirname"
        }
      ])
      .then(answers => {
        // /root -> /root/Desktop/
        console.log(userHome,'->', `${userHome}/Desktop/`);
        /**
         * 跟用户交互
         *   - 当用户输入 文件夹名，那么这个文件夹名需要注入到 package.json [name]中，主要用到下面2个
         *   - awk：改 sed：查
         */
        shelljs.cd(`${userHome}/Desktop/`);
        const spinner = ora("👧 downloading.....");
        spinner.start();
        shelljs.mkdir(answers.dirname);
      });
  },
  json2ts() {
    const json2ts = require('json2ts');
    // https://www.npmjs.com/package/mockjs
    const message = {
      name: '汤烨',
      data: {
        age: 30
      }
    }

    const jsonContent = JSON.stringify(message);
    let result = json2ts.convert(jsonContent);
    console.log(result)
  }
}
program.option("-i,--init", "项目初始化🐶");
program
  .usage("<cmd> [options]")
  .arguments("<cmd> [env]")
  .action((cmd, otherParmas) => {
    const handler = bindHandler[cmd];
    /**
     * 终端执行： duancli json2ts 33
     *    - cmd='inti'; hander=bindHandler['init'] 这个handler就是个函数，所以进入下面的else, 在执行 handler('33')
     *    - bindHandler.hasOwnProperty(cmd)。就是bindHandler上没有cmd这个方法，就会在终端输出 '非常遗憾' 
     */
    if (typeof handler === 'undefined') {
      // emoji：  https://emojipedia.org/people/
      console.error(chalk.yellow(`非常遗憾 【${comd}】 暂未提供😅`));
      // 1: 错误退出。0：正常退出
      process.exit(1);
    } else {
      handler(otherParmas)
    }
  })
program.parse(process.argv);
```

`duan-cli`现在的效果

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/duan-cli02.gif"></p>




