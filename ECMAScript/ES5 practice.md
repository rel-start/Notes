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
```
上述的代码相当于下面的样子

```javascript
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

