# Scope of JS

标签（空格分隔）： Notes

---
[TOC]


<h2>作用域的种类</h2>
作用域的大小

- 程序级
- 文件级
- 函数级
- 块级

<h2>JavaScript的作用域</h2>

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

<h2>javascript的作用域链</h2>
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

<h2>javascript中的this关键字</h2>
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

<h2>原型对象是什么</h2>
<p>在JavaScript中，每定义一个对象（函数）时，对象中都会包含一些预定义的属性（toString）。其中函数对象的一个属性就是原型对象<code>prototype</code>。普通对象没有prototype，但有<code>__proto__</code>属性</p>

```javascript
function fn(){ }

console.log(typeof fn.prototype); // object
console.log(typeof Function.prototype); // function
console.log(typeof Object.prototype); // object
console.dir(typeof Function.prototype.prototype); // undefined。Function.prototype.__proto__
```

<h2>构造函数</h2>

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