# ES5 strict model

标签（空格分隔）： Notes

---
[TOC]

<h2>浏览器的支持</h2>

- Opera 11.60
- Internet Explorer 9*
    * IE9不支持严格模式 — IE10 添加
- Firefox 4
- Safari 5.1**
    * Safari 5.1 仍不支持 Function.prototype.bind, 尽管 Function.prototype.bind现在已经被Webkit所支持。
- Chrome 13

<p>相关连接</p>

- <a href="http://kangax.github.io/compat-table/es5/">ES5各浏览器的兼容性</a>
- <a href="https://www.npmjs.com/package/es5-shim">es5-shim</a>

<h2>ES5的严格模式</h2>
<h3>为脚本开启严格模式</h3>

```javascript
// 整个脚本都开启严格模式的语法
"use strict";
var v = "嗨！我是严格模式的脚本";
```

<h3>为函数开启严格模式</h3>
<p>同样的，要给某个函数开启严格模式，得把 <code>"use strict"</code>;  (或 <code>'use strict'</code>; )声明一字不漏地放在函数体所有语句之前。</p>

```javascript
function strict(){
  // 函数级别严格模式语法
  'use strict';
  function nested() { return "And so am I!"; }
  return "Hi!  I'm a strict mode function!  " + nested();
}
function notStrict() { return "I'm not strict."; }
```

<h3>使用变量但不声明</h3>

```javascript
"use strict";
                       // 假如有一个全局变量叫做mistypedVariable
mistypedVaraible = 17; // 因为变量名拼写错误
                       // 这一行代码就会抛出 ReferenceError
```
<h3>给不可扩展对象的新属性赋值</h3>

```javascript
"use strict";

var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "ohai"; // 抛出TypeError错误

delete Object.prototype; // 抛出TypeError错误
var obj = {a:1};
delete obj.a;     // 但可以删除对象属性
delete obj;       // 抛出SyntaxError错误
```
<h3>给只读属性赋值</h3>

```javascript
"use strict";

var obj2 = { get x() { return 17; } };
obj2.x = 5; // 抛出TypeError错误
```
<h3>给不可写属性赋值</h3>

```javascript
"use strict";

var obj1 = {};
Object.defineProperty(obj1, 'x', { value: 42, writable: false });
obj1.x = 9;  // 抛出TypeError错误
```
<h3>严格模式要求函数的参数名唯一</h3>

```javascript
"use strict";

function sum(a, a, c){ // !!! 语法错误
  "use strict";
  return a + a + c; // 代码运行到这里会出错
}
```
<h3>严格模式禁止八进制数字语法</h3>

```javascript
"use strict";

var sum = 015 + // !!! 语法错误，严格模式下不允许使用八进制文字。（015）
          197 +
          142;

var a = 0o10; // ES6: 八进制，谷歌不会报错
console.log(a);
var o = { p: 1, p: 2 }; // !!! 语法错误，谷歌不会报错
```
<h3>严格模式禁止设置<code><a href="https://developer.mozilla.org/en-US/docs/Glossary/primitive">primitive</a></code>值的属性</h3>

```javascript
(function () {
  "use strict";

  false.true = "";              //TypeError
  (14).sailing = "home";        //TypeError
  "with".you = "far away";      //TypeError
```
<h3>严格模式禁用 <code>with</code></h3>

```javascript
"use strict";

var obj = {x: 1};
with(obj) { // SyntaxError
  x = 2;
}
console.log(obj.x);
```
<h3>严格模式下的<code>eval</code></h3>
<p>在正常模式下，代码 <code>eval("var x;")</code>会给上层函数或者去全局引入一个新的变量<code>x</code>（覆盖外层的<code>x</code>变量）。在严格模式下 <code>eval</code> 仅仅为被运行的代码创建变量，所以<code>eval</code>不会使得<code>x</code>映射到外部变量或者其他局部变量</p>

```javascript
"use strict";

var x = 17;
var evalX = eval("'use strict'; var x = 42; x");
console.assert(x === 17);
console.assert(evalX === 42);

var eval, arguments;// 严格模式下变量 <code>eval</code> 和 <code>arguments</code> 不能通过程序语法被绑定(<code>be bound</code>) 或赋值
var eval, arguments;
eval = 17;
arguments++;
```
<h3>arguments</h3>
<p>格模式下最好不要是用<code>arguments</code>可以使用 <code>rest</code>参数代替。不在支持<code>arguments.callee</code></p>

```javascript
function f(a){
  "use strict";
  a = 42;
  return [a, arguments[0]];
}
var pair = f(17);
console.assert(pair[0] === 42);
console.assert(pair[1] === 17);
```
<h3>严格模式下的this</h3>
<p>在严格模式下通过<code>this</code>传递给一个函数的值不会被强制转换为一个对象。对一个普通的函数来说，<code>this</code>总会是一个对象：不管调用时<code>this</code>它本来就是一个对象；还是用布尔值，字符串或者数字调用函数时函数里面被封装成对象<code>的this</code>；还是使用<code>undefined</code>或者<code>null</code>调用函数式<code>this</code>代表的全局对象（使用<code>call</code>, <code>apply</code>或者<code>bind</code>方法来指定一个确定的<code>this</code>）。这种自动转化为对象的过程不仅是一种性能上的损耗，同时在浏览器中暴露出全局对象也会成为安全隐患，因为全局对象提供了访问那些所谓安全的<code>JavaScript</code>环境必须限制的功能的途径。所以对于一个开启严格模式的函数，指定的<code>this</code>不再被封装为对象，而且如果没有指定<code>this</code>的话它值是<code>undefined</code>：</p>

```javascript
"use strict";

function fun() { return this; }
console.assert(fun() === undefined);
console.assert(fun.call(2) === 2);
console.assert(fun.apply(null) === null);
console.assert(fun.call(undefined) === undefined);
console.assert(fun.bind(true)() === true);
```
<h3>fun.caller & fun.arguments</h3>

```javascript
function restricted()
{
  "use strict";
  restricted.caller;    // 抛出类型错误
  restricted.arguments; // 抛出类型错误
}
function privilegedInvoker()
{
  return restricted();
}
privilegedInvoker();
```

<h3>严格模式下的关键词</h3>
<p>在严格模式中一部分字符变成了保留的关键字。这些字符包括implements, interface, let, package, private, protected, public, static和yield。在严格模式下，你不能再用这些名字作为变量名或者形参名。ES5还无条件的保留了class, enum, export, extends, import和super关键字，</p>

```javascript
function package(protected){ // !!!
  "use strict";
  var implements; // !!!

  interface: // !!!
  while (true)
  {
    break interface; // !!!
  }

  function private() { } // !!!
}
function fun(static) { 'use strict'; } // !!!
```
<h3>严格模式禁止了不在脚本或者函数层面上的函数声明</h3>

```javascript
"use strict";

if (true) {
  function f(){ console.log('f'); } // !!! 语法错误，谷歌中无错误
  f();
}

for (var i = 0; i < 5; i++){
  function f2() { console.log('f2'+i); } // !!! 语法错误，谷歌中无错误
  f2();
}

function baz() { // 合法
  return function eit() { console.log('eit'); } // 同样合法
}
baz()()
```

<p>相关连接</p>

- <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode">ES5严格模式(MDN web doc)</a>
- <a href="https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/dev-guides/hh673540(v=vs.85)">严格模式</a>