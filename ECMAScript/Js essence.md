# Js essence

标签（空格分隔）： Notes

---
[TOC]

<h2>JS 精粹1</h2>
<h3><a href="">Object.prototype.toString.call(obj)检测对象类型</a></h3>

```javascript
function isNumber(obj){
  return Object.prototype.toString.call(obj) === '[object Number]';
}

console.log(isNumber(1));
```

<h3>继承</h3>

```javascript
/**
 * 寄生组合式继承
 */
function inherits(child, parent) {
  var _prototype = Object.create(parent.prototype);
  _prototype.constructor = child.prototype.constructor;
  child.prototype = _prototype;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function () {
  return this.name;
}

function English(name, age, language) {
  Person.call(this, name, age);
  this.language = language;
}
inherits(English, Person);

English.prototype.introduce = function () {
  console.log('Hi, I am ' + this.getName());
  console.log('I speak ' + this.language);
}

var e = new English('ty', 25, 'english');
e.introduce();

/**
 * ES6 继承
 */
class People {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name;
  }
}

class English extends People {
  constructor(name, age, language) {
    super(name, age);
    this.language = language;
  }

  introduce() {
    console.log('Hi, I am ' + this.getName());
    console.log('I speak ' + this.language);
  }
}
```

<h3><a href="https://segmentfault.com/a/1190000014127816">Label Statement</a></h3>

```javascript
loop: {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      console.log(j);
      if (j == 1) {
        break loop;
      }
    }
  }
}
```

<h4>语句与表达式</h4>

```javascript
var x = { a: 1 };
{ a: 1 };
{ a: 1, b: 2 };
```

<h4>立即执行函数</h4>

```javascript
(function () { }());
(function () { })();
[function () { }()];

~ function () { }();
! function () { }();
+ function () { }();
- function () { }();

delete function () { }();
typeof function () { }();
void function () { }();
new function () { }();
new function () { };

var f = function () { }();

1, function () { }();
1 ^ function () { }();
1 > function () { }();
```

<h3>高阶函数</h3>
<p>高阶函数是把函数当作参数或者返回值是函数的函数</p>
<h4>回调函数</h4>

```javascript
[1, 2, 3, 4].forEach(function (item) {
  console.log(item);
});
```

<h4>闭包</h4>
闭包由两部分组成

- 函数
- 环境：函数创建时作用域内的局部变量

```javascript
function makeCounter(int){
  var init = int || 0;

  return function(){
    return ++init;
  };
}
var counter = makeCounter(10);
console.log(counter()); // 11
console.log(counter()); // 12
```

<h4>惰性函数</h4>

```javascript
function eventBinderGenerator() {
  if (window.addEventListener) {
    return function (element, type, handler) {
      element.addEventListener(type, handler, false);
    }
  } else {
    return function (element, type, handler) {
      element.attachEvent('on' + type, handler.bind(element, window.event));
    }
  }
}
// 只有第一次判断，之后都用返回函数
var addEvent = eventBinderGenerator();
```

<h4>柯里化</h4>
<p>一种允许使用部分参数生成函数的方式</p>

```javascript
function isType(type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  }
}

var isNumber = isType('Number');
console.log(isNumber(1));
console.log(isNumber('s'));

var isArray = isType('Array');
console.log(isArray(1));
console.log(isArray([1, 2, 3]));
```

```javascript
function f(n) {
  return n * n;
}

function g(n) {
  return n * 2;
}

console.log(f(g(5)));

function pipe(f, g) {
  return function () {
    return f.call(null, g.apply(null, arguments));
  }
}

var fn = pipe(f, g);
console.log(fn(5));
```

<h4>反柯里化</h4>

```javascript
Function.prototype.uncurry = function () {
  return this.call.bind(this);
}
// push通用化
var push = Array.prototype.push.uncurry();

var arr = [];
push(arr,1);
push(arr,2);
push(arr,3);
console.log(arr);
```

<h2>JS 作用域</h2>
<h3>作用域的种类</h3>
作用域的大小

- 程序级
- 文件级
- 函数级
- 块级

<h3>JavaScript的作用域</h3>

- 全局作用域
- 函数作用域
- 块级作用域（ES6）

```javascript
var global = 1; // 全局作用域
function do() {
  var inner = 2;    // 函数作用域
  globalA = 3;  // 全局作用域，严格模式下报错
}
```

<h3>javascript的作用域链</h3>
<p>什么是作用域？</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;在JavaScript中，函数也是对象，函数对象和其他对象一样，拥有可以通过代码访问的属性和一系列仅供JavaScript引擎访问的内部属性。其中一个内部属性是<code>[[Scope]]</code>，由ECMA-262标准第三版定义，该内部属性包含了函数被创建的作用域中对象的集合，这个集合被称为函数的作用域，它决定了那些数据能被函数访问。</p>

```javascript
var text = 'aaa';

function fn(){
  debugger;
  console.log(text);
  var text = 'bbb';
  console.log(text);
  return function nfn(){
    return 'a';
  }
}
fn();
console.dir(fn);
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/scope-of-js__s.png" /></p>

<h3>javascript中的this关键字</h3>
<p>this指向哪里？</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;在JavaScript中，<code>this</code>指向函数执行时的当前对象</p>

<h3>this的使用场景</h3>

- 普通函数中
    - 严格模式：undefined
    - 非严格：全局对象（window）
- 构造函数中：对象的实例
- 对象方法：对象本身
- 使用方法：`content`为`object`就指向这个对象，非对象指向`window`
    - fn.call(content, arg1, arg2, ...,agN)
    - fn.apply(content, [arg1, arg2, ...,agN])
    - function(){}.bind(content)

```javascript
if (!('user' in window)) {
  console.log(1);       // 未打印
  var user = 'ty';
}
console.log(user);
```
<p>上面代码的输出为<code>undefined</code>。<code>if</code> 并非js的作用域所以<code>user</code>已经被提前声明了，但<code>!('user' in window)</code> 不为 <code>true</code>，所以未被赋值。如果使用<code>let</code>就会报错</p>

```javascript
var obj = {
  user: 'ty',
  getName: function(){
    debugger;
    return this.user
  }
};

var getNameFn = obj.getName;
console.log(getNameFn());   // undefined
console.log(obj.getName()); // 'ty'
```
<p>上面代码中：想要表达的是谁调用并执行，<code>this</code>就指向谁，<code>getNameFn()</code>在<code>window</code>下执行的所以结果为<code>undefined</code></p>

<h3>原型对象是什么</h3>
<p>在JavaScript中，每定义一个对象（函数）时，对象中都会包含一些预定义的属性（toString）。其中函数对象的一个属性就是原型对象<code>prototype</code>。普通对象没有prototype，但有<code>__proto__</code>属性</p>

```javascript
function fn(){ }

console.log(typeof fn.prototype); // object
console.log(typeof Function.prototype); // function
console.log(typeof Object.prototype); // object
console.dir(typeof Function.prototype.prototype); // undefined。Function.prototype.__proto__
```

<h3>构造函数</h3>

- 使用new关键字调用的函数
- 构造函数可以实例化一个对象
- 返回值，默认返回类的实例
- 特殊情况：
    - 没有返回值（返回这个实例）
    - 简单数据类型（返回这个实例）
    - 对象类型（返回对象）
    
```javascript
function Person(){
  this.name = 1;
  return { name: 2 };
}

var p = new Person();
p;  // { name: 2 }
```

<h3>原型链是如何实现的？</h3>

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
}

var xuz = new Person('cl');
xuz.getName();  // cl
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/scope-of-js-yxl.png" /></p>

```javascript
function Person1(name) {
  this.name = name;
}

Person1.sl = function () { }
var p1 = new Person1('ty');
p1.go = 2;
Person1.prototype.getName = function () {
  return this.name;
}

class Person {
  constructor(name) {
    this.name = name;
    this.setName = function () { }
  }
  getName() {
    return this.name;
  }
  name222 = function () { }
  static id = 1;
}
Person.sl = function () { }
var p = new Person('cl');
p.go = 1;
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/scope-of-js-yxl2.png" /></p>

<h3>原型链对象中的constructor</h3>

- 每个原型对象prototype中都有一个constructor属性，默认指向函数本身
- 每个函数的constructor都指向Function。`Array.constructor === Function`

```javascript
Person.prototype.constructor === Person;    // true
Function.prototype.constructor === Function;    // true
Object.prototype.constructor === Object;    // true
Object.constructor === Function;    // true
```

练习一
```javascript
function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    }
  }
}

var a = fun(0);
a.fun(1); a.fun(2);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);
c.fun(2); c.fun(3);
```

练习一的解题过程如下(跳过a的)：
<table>
  <caption>var b</caption>
  <tr>
    <th></th>
    <th>第一次</th>
    <th>第二次</th>
    <th>第三次</th>
    <th>第四次</th>
  </tr>
  <tr>
    <td>外Fun</td>
    <td>
      <p>n:0</p>
      <p>o:undefined</p>
    </td>
    <td>
      <p>n:1</p>
      <p>o:0</p>
    </td>
    <td>
      <p>n:2</p>
      <p>o:1</p>
    </td>
    <td>
      <p>n:3</p>
      <p>o:2</p>
    </td>
  </tr>
  <tr>
    <td>内Fun</td>
    <td></td>
    <td>
      <p>m:1</p>
      <p>n:0</p>
    </td>
    <td>
      <p>m:2</p>
      <p>n:1</p>
    </td>
    <td>
      <p>m:3</p>
      <p>n:2</p>
    </td>
  </tr>
</table>

<table>
  <caption>var c</caption>
  <tr>
    <th></th>
    <th>第一次</th>
    <th>第二次</th>
  </tr>
  <tr>
    <td>外Fun</td>
    <td>
      <p>n:0</p>
      <p>o:undefined</p>
    </td>
    <td>
      <p>n:1</p>
      <p>o:0</p>
    </td>
  </tr>
  <tr>
    <td>内Fun</td>
    <td></td>
    <td>
      <p>m:1</p>
      <p>n:0</p>
    </td>
  </tr>
</table>

<table>
  <caption>c.fun(2)</caption>
  <tr>
    <th></th>
    <th>第一次</th>
  </tr>
  <tr>
    <td>外Fun</td>
    <td>
      <p>n:2</p>
      <p>o:1</p>
    </td>
  </tr>
  <tr>
    <td>内Fun</td>
    <td>
      <p>m:2</p>
      <p>n:1（这是从c变量传过来的）</p>
    </td>
  </tr>
</table>
<table>
  <caption>c.fun(3)</caption>
  <tr>
    <th></th>
    <th>第一次</th>
  </tr>
  <tr>
    <td>外Fun</td>
    <td>
      <p>n:2</p>
      <p>o:1</p>
    </td>
  </tr>
  <tr>
    <td>内Fun</td>
    <td>
      <p>m:3</p>
      <p>n:1（这是从c变量传过来的）</p>
    </td>
  </tr>
</table>