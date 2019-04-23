# ES6 Environment

标签（空格分隔）： Notes

---

相关资料:

- http://es6.ruanyifeng.com/#docs/intro#Babel-%E8%BD%AC%E7%A0%81%E5%99%A8

<h2>ES6环境搭建</h2>

```
npm init    // 初始化npm(会生成 package.json)
```

<h3>1. Babel转码器</h3>
<p><a href="https://babeljs.io/" data-cn="https://www.babeljs.cn/docs/">Babel</a> 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。下面是一个例子。</p>

```
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```

<p>下面的命令在项目目录中，安装 Babel。</p>

```
$ npm install --save-dev @babel/core
```
<br/>

<h4>配置文件.babelrc</h4>
<p>Babel 的配置文件是<code>.babelrc</code>，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件。</p>
<p>该文件用来设置转码规则和插件，基本格式如下。</p>

```
{
  "presets": [],
  "plugins": []
}
```

<p><code>presets</code> 字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。</p>

```
# 最新转码规则
$ npm install --save-dev @babel/preset-env

# react 转码规则
# $ npm install --save-dev @babel/preset-react
```

<p>然后，将这些规则加入<code>.babelrc</code>。</p>

```
{
  "presets": [
    "@babel/env",
    "@babel/preset-react"
  ],
  "plugins": []
}
```
<p>注意，以下所有 Babel 工具和模块的使用，都必须先写好<code>.babelrc</code>。</p>

<h4>命令行转码</h4>
<p>Babel 提供命令行工具@babel/cli，用于命令行转码。</p>
<p>它的安装命令如下。</p>

```
$ npm install --save-dev @babel/cli
```

<p>基本用法如下。</p>

```
# 转码结果输出到标准输出
$ npx babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ npx babel example.js --out-file compiled.js
# 或者
$ npx babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ npx babel src --out-dir lib
# 或者
$ npx babel src -d lib

# -s 参数生成source map文件
$ npx babel src -d lib -s
```


<h2>后面的暂时看不懂 尤其是@babel/polyfill</h2>
