# ES5 practice

标签（空格分隔）： Notes

---
[TOC]

<h3>var变量提升</h3>
下面代码输出 `undefined`

```javascript
var a = 25;
(function () {
  alert(a);
  var a = 30;
})();
```

<hr/>
<h3>函数提升</h3>

函数提升要比变量提升高

```javascript
(function () {
  var a = 20;
  function a() { };
  var b = c = a;
  console.log(a);
})();
console.log(c);

// --------------------------------
// 上述代码相当于
(function () {
  function a() { };
  var a;
  a = 20;
  var b = a;
  c = a;
  console.log(a);
})();
console.log(c);
```

**条件判断中的函数提升**
```javascript
function duan() {
  console.log(1);
}
(function () {
  if (false) {
    function duan() {
      console.log(2);
    }
  }
  duan();
})();

// --------------------------------
// 相当于
function duan() {
  console.log(1);
}
(function () {
  var duan; // 函数作用域内提升
  if (false) {
    function duan() {
      console.log(2);
    }
  }
  duan();
})();
```

<hr/>
<h3>当var与function一起提升时</h3>

**例1**
```javascript
console.log(a); // => function a(){}
a();    // => alert(10)
var a = 3;

function a() {
  alert(10);
}
console.log(a); // => 3
a = 6;
a();    // => a is not a function
console.log(a); // 上面一行注释掉的话，输出 6

// --------------------------------
// 上述的代码相当于下面的样子
var a;
function a(){ alert(10); }  // 函数提升比较高？？感觉函数在var之后 执行结果也一样。
a();
a = 3;

console.log(a);
a = 6;
a();
console.log(a);
```

**当成为函数表达式，只有内部能拿到函数**
```javascript
(function a() {
  console.log(a); // function a() {}
})();

console.log(a); // 报错

var q = function test(){
  console.log(test);  // function test() {}
}
q();
console.log(test); // 报错
```

**例2**
```javascript
console.log(a); // undefined
console.log(typeof yideng(a));  // TypeError: yideng is not a function
var flag = true;
if (!flag) {
  var a = 1;
}
if (flag) {
  // 词法作用域
  function yideng(a) {
    yideng = a; // 函数内部不能改变函数体
    console.log('yideng1');
  }
} else {
  function yideng(a) {
    yideng = a;
    console.log('yideng2');
  }
}

yideng(a);  // yideng1

// ---------------------------------------
// 相当于
var yideng, a;
console.log(a);
console.log(typeof yideng(a));

var flag = true;
if (!flag) a = 1;
if (flag) {
  yideng = function (a) {
    yideng = a;
    console.log('yideng1');
  }
} else {
  yideng = function (a) {
    yideng = a;
    console.log('yideng2');
  }
}

yideng(a);

{
  a = 30;
  // TDZ：暂时性死区
  const a;
}
```

**例3**
```javascript
function yideng(a, b, c) {
  // 这里的 this 指向 arguments.length
  console.log(this.length);
  console.log(this.callee.length);
  // this = arguments
  // this.callee = function fn(d){}
}

function fn(d) {
  arguments[0](10, 20, 30, 40, 50);
  // 相当于 arguments.yideng
  // arguments = [yideng,10,20,30]
}

fn(yideng, 10, 20, 30);
```

**函数在块级与非块级作用域下的一些区别**

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/js-block01.gif" /></p>
块级作用域下：函数 `a` 中改变函数体 `a=b`，也就是该 block 下的a被改变，全局作用域下还是 a: function a(){}。

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/js-block02.gif" /></p>
函数内部改变自己 只在该作用域下有效，

<hr/>
<h3>函数声明式的名字相关</h3>

```javascript
var q = function (){} // 当前函数的 name 属性为 q

var q = function test(){  // 当前函数的 name 属性为 test
  test = 0;   // 这里无法改变 test
  console.log(test);  // => function test() {}
}

q.name; // test
q();
console.log(test);  // ReferenceError: test is not defined
```

<hr/>
<h3>箭头函数的this 与 立即执行函数</h3>

```javascript
this.a = 20;
var test = {
  a: 40,
  init: () => {
    console.log(this.a);
    function go() {
      this.a = 60;
      console.log(this.a);
    }
    go.prototype.a = 50;
    return go;
  }
};

var p = test.init();
p();
new(test.init())(); // 立即执行函数
```

上面代码的执行结果为：`20 60 60 60`。
1. `var p = test.init()`中的this指向的是window（箭头函数的this指向的是父级作用域），而js只有函数所用于和块级作用域，对象`test`不属于作用域。
2. `p()`执行的是`go`函数，并且`p`是由window调用的所以指向window。而`go`函数内部改变了`window`下`a`的值为`60`，所以输出的是`60`
3. `new(test.init())()`分为2块。第一块是内部的`test.init()`结果为`60`，上面已经把`window.a`改为`60`；第二块执行返回的函数`go`

<hr/>
<h3>一个简单闭包</h3>

```javascript
function f1() {
  var N = 0;
  function f2() {
    N += 1; // 这里把N变量锁住了，就是函数套函数，f2管理外部的N
    console.log(N);
  }
  return f2;
}

var result = f1();
result();
result();
result();   // 然后它不知道什么时候停止
result = null;  // 所以要手动停止防止闭包引起的内存泄漏
```
上述代码的执行结果为：1 2 3。

```javascript
function Product() {
  var name; // 闭包可以将变量变成私有的
  this.setName = function (value) { // 通过set设置
    name = value;
  }

  this.getName = function (){ // 通过get获取
    return name;
  }
}

var s = new Product();
s.setName('hello');
s.getName();  // hello
```

<hr/>
<h3>同步队列与异步队列</h3>

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>

<script>
var list_li = document.getElementsByTagName('li');
for (var i = 0; i < list_li.length; i++) {
  list_li[i].onclick = function () {
    console.log(i); // e.target.innerHTML
  }
}
</script>
```
先执行同步在执行异步。事件是放在异步队列中，等`for`循环跑完`i=5`。在点击的时候就只会输出`5`。可以使用闭包把变量锁住。

```javascript
{} + []
// 相当于
{}; + []

console.log({}+[])
// 相当于。()是表达式
[object Object] + ''
```

<hr/>
<h3>按引用、值传递</h3>

```javascript
function test(m){ // m是按值传递
  m = {v:5} // 如果是这样，函数外面调用 m.v 输出undefined
  // m.v = 5; // 而这样的话，调用 m.v 输出 5
}

var m = {k: 30};
test(m);
console.log(m.v); // undefined
```


<hr/>
<h3>为什么while(true)会死循环</h3>

```javascript
<button id="text">按钮</button>
$('#text').click(function (){
  console.log(1);
});
setTimeout(function(){
  console.log(2);
},0);
while(true){
  console.log(3)
};
```
上述代码：`while`是在同步队列，事件、`setTimeout`在异步队列中，当同步队列堵塞，那么`click`、`setTimeout`永远不会执行

<h3>GC回收</h3>

```javascript
function Student(val) {
  this.val = val;
}
let ty = new Student('ty');
let cl = new Student('cl');
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/gc01.png" /></p>

```javascript
function Student(val) {
  this.val = val;
}
let ty = new Student('ty');
let cl = new Student('cl');

// 这里 gc 不一定会立马执行(这里代码比较少，立马gc了)。解决办法 WeakMap
ty = null;
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/gc02.png" /></p>

**闭包 与 gc**
```javascript
function Student(val) {
  this.val = val;
}
let TFactory = function (name) {
  let ty = new Student(name);
  return function () {  // 这个匿名函数还存在堆里，回收不了
    console.log(ty);
  };
}

let p1 = new TFactory('张三');
p1();
p1 = null;  // 这里 gc 不回收
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/gc03.png" /></p>

```javascript
function Student(val) {
  this.val = val;
}
let TFactory = function (name) {
  let ty = new Student(name);
  // ty = null;  这里置为 null 就回收了
  return function () {
    console.log(ty);
    ty = null;  // 这里 gc 也不回收
  };
}

let p1 = new TFactory('张三');
p1();
```

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/gc04.gif" /></p>
JS执行外面都有一个匿名函数包裹，相当于Java的 `mian`，因为js的执行机制所以 `function test(){}` 就是一个闭包(外面会包裹一个匿名函数)。如果正常C `function test(){}` 不是闭包

<h3>Lexical Scope</h3>

`eval()`不会解绑词法作用域，万一 `xxbb` 用到了呢

```javascript
function t1() {
  return function test() {
    var xxbb = 'yideng';
    function aa (){ var b; }
    debugger;
    return function () {
      eval("");
    }
  }
}
t1()()();
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/eval01.png" /></p>

控制台 `Memory` 面板下获取堆快照

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/eval03.png" /></p>

以及没有 `eval` 的对比
```javascript
function t1() {
  return function test() {
    var xxbb = 'yideng';
    function aa (){ var b; }
    debugger;
    return function () {
      // eval("");
    }
  }
}
t1()()();
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/eval02.png" /></p>

**解绑 eval 绑定作用的问题**
eval 前面加个 window

```javascript
function t1() {
  return function test() {
    var xxbb = 'yideng';
    return function () {
      window.eval("");
    }
  }
}
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/eval04.png" /></p>

**new Function相关**

```javascript
var a = "Hello";

function init() {
  var a = "World";
  var test = new Function("console.log(a)");
  // => Hello。new Function 会吧函数绑定到全局词法作用域
  var test = new Function(console.log(a));
  // => World
  test();
}
init();
```

**with**
一旦 `with` 放弃当前所有变量回收，现在浏览器好像删掉了
```javascript
var a = 1;
var obj = {
  apple: "hello",
  next: undefined
};

with(obj) {
  next: 'world'
}
console.log(obj.next);
console.log(next);
```


<hr/>
<h3>练习</h3>
<h4>等级分配</h4>
一句话算出0-100之间学生的学生等级，如果90-100输出为1等生、80-90为2等生以此类推。

```javascript
10 - Math.floor(98/10) = 1
```

<h4>一句话遍历变量a</h4>
禁止使用for 一句话遍历 var a = 'abc'

```javascript
var a = 'abc';
var arr = [new Set(a)];
var arr2 = Array.prototype.slice.call(a);
// => ['a','b','c']
```

<h4>window的length</h4>

```javascript
function fn() {
  console.log(this.length);
}

var yideng = {
  length: 5,
  method: function (fn) {
    fn(); // 这里 window.fn()，那么上面 this.length 是 iframe 的数量
    arguments[0](); // arguments 是获取调用当前方法的实参集合，yideng.method(fn,1) 有2个实参
    // arguments.fn
  }
}
```




1. 立即执行函数
2. 闭包 内部函数可以访问外部函数的变量，把函数返回出去
    - 闭包可以保护内部的变量 闭包造成内存泄漏==null
3. 原型链
    - 构造函数里的属性的优先级比原型链的要高
    - 面向对象编程的时候 JS没有类的概念 可以用函数替代
    - constructor 实际就是对应的那个函数
    - prototype 按引用传递的 Object.create 创建对应原型链的副本
4. 数值/字符串/布尔类型 按值传递。其他都是按引用传递 对象、数组
5. 改变this的方法 call apply bind
6. 函数提升 变量提升。函数提升级别要比变量提高

