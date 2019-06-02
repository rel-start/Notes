# ES6 usage

标签（空格分隔）： Notes

---

<h2>let 和 const 命令</h2>

```javascript
const a = 'a';
let b = '橙子';
b = '橘子';
console.log(a, b);
```
<h3>ES6 声明变量的六种方法</h3>
ES5 只有两种声明变量的方法：`var`命令和`function`命令。ES6 除了添加`let`和`const`命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。

<h2>变量的解构赋值</h2>

```javascript
# 数组的解构
const s = ["香蕉", "苹果", "橘子"];
const [first,second,three] = s;
console.log(first,second,three);

# 对象的解构
function fn(){
  return {
    a: "Hello",
    b: 2
  }
}

const result = fn();
const {b,a} = result;
console.log(a,b);
```

<h2>字符串的扩展</h2>
<h3>模板字符串</h3>

```javascript
const s = "hello";
const e = "world";
const c = `foor ${s} ${3} bar`;
console.log(c); // 'foor hello world bar'
```

<h3>标签模板</h3>
<p>模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）</p>

```javascript
alert`123`
// 等同于
alert(123)
```
<p>标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。</p>

<p>但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。</p>

```javascript
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

简单的一个例子(`test` 函数采用 rest 参数的写法):

```javascript
const s = "hello";
const e = "world";
const c = test `foor ${s} ${e} bar`;
console.log(c);

function test(strs, ...values) {
  console.log(strs);  // ["foor ", " ", " bar", raw: Array(3)]
  console.log(values);    //  ["hello", "world"]
}
```

<h2>数组/对象的扩展</h2>
<h3>扩展运算符</h3>

```javascript
const s = 'abcd';
const test = [1,2,3,...s];
const k = 'arr';
const result = {
  [k+1]: 1,
  s,
  test,
  q() {
    console.log('企鹅');
  }
}
console.log(result);    // {arr1:1, s:'abcd', test:[1,2,3,'a','b','c','d'], q:fn}
result.q(); // 企鹅
```

<h2>对象的扩展</h2>
<h3>super 关键字</h3>
<p>super: 指向当前对象的原型对象。</p>

```javascript
const eat = {
  getEat(){
    return '栗子';
  }
}

const drink = {
  getDrink(){
    return '啤酒';
  }
}

let sunday = {
  __proto__:eat,
  getDrink(){
    return super.getEat() + 'aa'
  }
}
// sunday.__proto__ = eat;
console.log(sunday.getEat());   // '栗子'
// console.log(sunday);
console.log(sunday.getDrink()); // '栗子aa'
```

<h2>对象的新增方法</h2>
<h3>Object.is()</h3>

```javascript
console.log(NaN == NaN); // false
console.log(Object.is(NaN,NaN)); // true
```

<h3>__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()</h3>

```javascript
const eat = {
  getEat(){
    return '栗子';
  }
}

const drink = {
  getDrink(){
    return '啤酒';
  }
}

let sunday = Object.create(eat);
// console.log(sunday.getEat());
/**
 * Object.getPrototypeOf()方法返回[[Prototype]]指定对象的原型（即内部属性的值）。
 */
// console.log(Object.getPrototypeOf(sunday));

/**
 * Object.setPrototypeOf(obj, prototype)
 * obj: 要设置原型的对象
 * prototype: 对象的新原型(对象或null)
 */
console.log(Object.setPrototypeOf(sunday, drink));
console.log(sunday);
console.log(sunday.getDrink());
```
<br/><br/><br/><br/><br/><br/><br/><br/>
阮一峰es6入门
<h2>函数的扩展</h2>
<h3>函数参数的默认值</h3>

<hr />
<h4>基本用法</h4>
<p>ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法。</p>

```javascript
function log(x, y){
  y = y || 'World';
  console.log(x,y);
}

log('Hello');       //'Hello World'
log('Hello', 'China');  // 'Hello China
log('Hello', '');   // 'Hello World'
```
<p>上面代码检查函数<code>log</code>的参数<code>y</code>有没有赋值，如果没有，则指定默认值为<code>World</code>。这种写法的缺点在于，如果参数<code>y</code>赋值了，但是对应的布尔值为<code>false</code>，则该赋值不起作用。就像上面代码的最后一行，参数<code>y</code>等于空字符，结果被改为默认值。</p>

<p>为了避免这个问题，通常需要先判断一下参数<code>y</code>是否被赋值，如果没有，再等于默认值。</p>

```javascript
if (typeof y === 'undefined') y = 'World';
```
<p>ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。</p>

```javascript
function log(x, y = 'World'){
  console.log(x, y);
}

log('Hello');       //'Hello World'
log('Hello', 'China');  // 'Hello China
log('Hello', '');   // 'Hello '
```
<p>可以看到，ES6 的写法比 ES5 简洁许多，而且非常自然。下面是另一个例子。</p>

```javascript
function Point(x=0, y=0){
  this.x = x;
  this.y = y;
}

const p = new Point();
console.log(p);     // Point {x: 0, y: 0}
```
<p>除了简洁，ES6 的写法还有两个好处：首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；其次，有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。</p>

<p>参数变量是默认声明的，所以不能用let或const再次声明。</p>

```javascript
function fn(x = 5){
  let x = 1;  // 标识符 'x' 已声明
  const x = 2;  // 标识符 'x' 已声明
}
```
<p>上面代码中，参数变量x是默认声明的，在函数体中，不能用let或const再次声明，否则会报错。</p>

<p>另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。</p>

```javascript
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```
<p>上面代码中，参数<code>p</code>的默认值是<code>x + 1</code>。这时，每次调用函数<code>foo</code>，都会重新计算x + 1</code>，而不是默认p</code>等于 100。</p>

<hr />
<h4>与解构赋值默认值结合使用</h4>

```javascript
function foo({x, y = 5}){
  console.log(x, y);
}

foo({});    // undefined 5
foo({x: 1});    // 1 5
foo({x: 1, y: 2});  // 1 2
foo();      // Uncaught TypeError: Cannot destructure property `x` of 'undefined' or 'null'.
```
<p>上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数<code>foo</code>的参数是一个对象时，变量<code>x</code>和<code>y</code>才会通过解构赋值生成。如果函数<code>foo</code>调用时没提供参数，变量<code>x</code>和<code>y</code>就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。</p>

```javascript
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5
```
<p>上面代码指定，如果没有提供参数，函数<code>foo</code>的参数默认为一个空对象。</p>

<p>下面是另一个解构赋值默认值的例子。</p>

```javascript
function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}

fetch('http://example.com', {});    // GET

fetch('http://example.com');    // 报错
```
<p>上面代码中，如果函数<code>fetch</code>的第二个参数是一个对象，就可以为它的三个属性设置默认值。这种写法不能省略第二个参数，如果结合函数参数的默认值，就可以省略第二个参数。这时，就出现了双重默认值。</p>

```javascript
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}

fetch('http://example.com');    // GET
```
<p>上面代码中，函数<code>fetch</code>没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量<code>method</code>才会取到默认值<code>GET</code>。</p>

<p>作为练习，请问下面两种写法有什么差别？</p>

```javascript
function m1({ x = 0, y = 0 } = {}) {
  return [x, y];
}

function m2({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}

// 函数没有参数的情况
m1();  // [0, 0]
m2();  // [0, 0]

// x 和 y 都有值的情况
m1({ x: 3, y: 8 });    // [3, 8]
m2({ x: 3, y: 8 });    // [3, 8]

// x 有值，y 无值的情况
m1({ x: 3 });  // [3, 0]
m2({ x: 3 });  // [3, undefined]

// x 和 y 都无值的情况
m1({}); // [0, 0];
m2({}); // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

<hr/>
<h4>参数默认值的位置</h4>
<p>通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。</p>

```javascript
// 例一
function fn(x = 1, y) {
  return [x, y];
}

fn(); // [1, undefined]
fn(2); // [2, undefined])
// fn(, 1);   // 语法不通过
fn(undefined, 1);  // [1, 1]

// 例二
function fn(x, y = 5, z) {
  return [x, y, z];
}

fn();  // [undefined, 5, undefined]
fn(1); // [1, 5, undefined]
// fn(1, , 2);   // 语法不通过
fn(1, 5, 2);   // [1, 5, 2]
```
<p>上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入<code>undefined</code>。</p>

<p>如果传入<code>undefined</code>，将触发该参数等于默认值，<code>null</code>则没有这个效果。</p>

```javascript
function fn(x = 5, y = 6) {
  console.log(x, y);
}
fn(undefined, null);    // 5 null
```
<p>上面代码中，<code>x</code>参数对应<code>undefined</code>，结果触发了默认值，<code>y</code>参数等于<code>null</code>，就没有触发默认值。</p>

<hr />
<h3>rest参数</h3>
<p>ES6 引入 <code>rest</code> 参数（形式为<code>...变量名</code>），用于获取函数的多余参数，这样就不需要使用<code>arguments</code>对象了。<code>rest</code> 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。</p>

```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```
<p>上面代码的<code>add</code>函数是一个求和函数，利用 <code>rest</code> 参数，可以向该函数传入任意数目的参数。</p>

<p>下面是一个 <code>rest</code> 参数代替<code>arguments</code>变量的例子。</p>

```javascript
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```
<p>上面代码的两种写法，比较后可以发现，rest 参数的写法更自然也更简洁。</p>

<p><code>arguments</code>对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用<code>Array.prototype.slice.call</code>先将其转为数组。<code>rest</code> 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。下面是一个利用 <code>rest</code> 参数改写数组<code>push</code>方法的例子。</p>

```javascript
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)
```
<p>注意，<code>rest</code> 参数之后不能再有其他参数（即只能是最后一个形参），否则会报错。</p>

```javascript
// 报错
function f(a, ...b, c) {
  // ...
}
```
<p>函数的<code>length</code>属性，不包括 <code>rest</code> 参数。</p>

```javascript
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```

<hr />
<h3>4.name 属性</h3>
<p>函数的<code>name</code>属性，返回该函数的函数名。</p>

```javascript
function foo() {}
foo.name // "foo"
```
<p>这个属性早就被浏览器广泛支持，但是直到 ES6，才将其写入了标准。</p>

<p>需要注意的是，ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5 的<code>name</code>属性，会返回空字符串，而 ES6 的<code>name</code>属性会返回实际的函数名。</p>

```javascript
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"
```
<p>上面代码中，变量<code>f</code>等于一个匿名函数，ES5 和 ES6 的<code>name</code>属性返回的值不一样。</p>

<p>如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的<code>name</code>属性都返回这个具名函数原本的名字。</p>

```javascript
const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"
```
<p><code>Function</code>构造函数返回的函数实例，<code>name</code>属性的值为<code>anonymous</code>。</p>

```javascript
(new Function).name // "anonymous"
```
<p><code>bind</code>返回的函数，<code>name</code>属性值会加上<code>bound</code>前缀。</p>

```javascript
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```

<hr />
<h3>5.箭头函数</h3>
<h4>使用注意点</h4>
<p>箭头函数有几个使用注意点。</p>

1. 函数体内的 `this` 对象,就是定义时所在的对象, 而不是使用时所在的对象.
2. 不可以当作构造函数, 也就是说, 不可以使用 `new` 命令,否则会抛出一个错误.
3. 不可以使用 `arguments` 对象, 该对象在函数体内不存在. 如果要用, 可以用 reset 参数代替.
4. 不可以使用 `yield` 命令, 因此箭头函数不能用作 Generator 函数.

<p>上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。</p>

```javascript
function foo(){
  setTimeout(() => {
    console.log('id: ', this.id);
  }, 100);
}

var id = 21;
foo.call({ id: 40 });   // id: 40
```
<p>上面代码中，<code>setTimeout</code>的参数是一个箭头函数，这个箭头函数的定义生效是在<code>foo</code>函数生成时，而它的真正执行要等到 100 毫秒后。如果是普通函数，执行时<code>this</code>应该指向全局对象<code>window</code>，这时应该输出<code>21</code>。但是，箭头函数导致<code>this</code>总是指向函数定义生效时所在的对象（本例是<code>{id: 40}</code>），所以输出的是<code>40</code>。</p>
<p>箭头函数可以让<code>setTimeout</code>里面的<code>this</code>，绑定定义时所在的作用域，而不是指向运行时所在的作用域。下面是另一个例子。</p>

```javascript
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  setInterval(() => {
    // console.log(this.s1);
    this.s1++
  }, 1000);

  setInterval(function (){
    // console.log(this.s2);
        
    this.s2++;
  });
}

var timer = new Timer();
setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
```
<p>上面代码中, <code>Timer</code>函数内部设置了两个定时器, 分别使用了箭头函数和普通函数. 前者的<code>this</code>绑定定义时所在的作用域(即<code>Timer</code>函数), 后者的<code>this</code>指向运行时所在的作用域（即全局对象）。所以，3100 毫秒之后，<code>timer.s1</code>被更新了 3 次，而<code>timer.s2</code>一次都没更新。</p>

<p>箭头函数可以让<code>this</code>指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM 事件的回调函数封装在一个对象里面。</p>

```javascript
const handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click', event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log(`Handling ${type} for ${this.id}`); // Handling click for 123456
  }
};
handler.init();
```

<p>上面代码的<code>init</code>方法中,使用了箭头函数,这导致这个箭头函数里面的<code>this</code>,总是指向<code>handler</code>对象. 否则回调函数运行时，<code>this.doSomething</code>这一行会报错，因为此时this指向document对象。</p>
<p>所以，箭头函数转成 ES5 的代码如下。</p>

```javascript
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```
<p>上面代码中，转换后的 ES5 版本清楚地说明了，箭头函数里面根本没有自己的<code>this</code>，而是引用外层的<code>this</code>。</p>
<p><code>this</code>指向的固定化，并不是因为箭头函数内部有绑定<code>this</code>的机制，实际原因是箭头函数根本没有自己的<code>this</code>，导致内部的this就是外层代码块的<code>this</code>。正是因为它没有<code>this</code>，所以也就不能用作构造函数。</p>

```javascript
function foo(){
  return () => {
    return () => {
      return () => {
        console.log('id: ', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f()()();   // id: 1
var t2 = f.call({id: 2})()();   // id: 1
var t3 = f().call({id: 3})();   // id: 1
var t4 = f()().call({id: 4});   // id: 1
```
<p>上面代码之中，只有一个<code>this</code>，就是函数<code>foo</code>的<code>this</code>，所以<code>t1</code>、<code>t2</code>、<code>t3</code>都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的<code>this</code>，它们的<code>this</code>其实都是最外层<code>foo</code>函数的<code>this</code>。</p>

<p>除了<code>this</code>，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：<code>arguments</code>、<code>super</code>、<code>new.target</code>。</p>

```javascript
function fn(){
  setTimeout(() => {
    console.log('args: ', arguments);   // args: [2,3,4,5]
  }, 100);
}
 fn(2,3,4,5);
```
<p>上面代码中，箭头函数内部的变量<code>arguments</code>，其实是函数<code>foo</code>的<code>arguments</code>变量。</p>

<p>另外，由于箭头函数没有自己的<code>this</code>，所以当然也就不能用<code>call()</code>、<code>apply()</code>、<code>bind()</code>这些方法去改变<code>this</code>的指向。</p>

```javascript
var result = (function fn(){
  return [
    (() => this.x).bind({ x: 'innner' })()
  ]
}).call({ x: 'outer' });

console.log(result);    // ["outer"]
```

<p>上面代码中，箭头函数没有自己的<code>this</code>，所以<code>bind</code>方法无效，内部的<code>this</code>指向外部的<code>this</code>。</p>

<h3>不适用场合</h3>
<p>由于箭头函数使得<code>this</code>从“动态”变成“静态”，下面两个场合不应该使用箭头函数。</p>

<p>第一个场合是定义对象的方法，且该方法内部包括<code>this</code>。</p>

```javascript
window.lives = 1;

const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
    console.log(this.lives);    // 0
  }
};

cat.jumps();


const pig = {
  lives: 123,
  p() {
    console.log(this.lives);  // 123
  }
};
```
<p>上面代码中，<code>cat.jumps()</code>方法是一个箭头函数，这是错误的。调用<code>cat.jumps()</code>时，如果是普通函数，该方法内部的<code>this</code>指向<code>cat</code>；如果写成上面那样的箭头函数，使得<code>this</code>指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致<code>jumps</code>箭头函数定义时的作用域就是全局作用域。</p>

<p>第二个场合是需要动态<code>this</code>的时候，也不应使用箭头函数。</p>

```javascript
document.addEventListener('click', () => {
  this.classList.toggle('on');    // this = Window
});
```
<p>上面代码运行时，点击按钮会报错，因为<code>button</code>的监听函数是一个箭头函数，导致里面的<code>this</code>就是全局对象。如果改成普通函数，<code>this</code>就会动态指向被点击的按钮对象。</p>
<strong>另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。</strong>