# JS Functional Programming

标签（空格分隔）： Notes

---
[TOC]

<h2>函数式编程思维</h2>
<h3>范畴论Category Theory</h3>

1. 函数式编程是范畴论的数学分支是一门很复杂的数学，认为世界上所有概念体系都可以抽象出一个个范畴
2. 彼此之间存在某种关系概念、事物、对象等等，都构成范畴。任何事物只要找出他们之间的关系，就能定义
3. 箭头表示范畴成员之间的关系，正式的名称叫做"态射"(morphism)。范畴论认为，同一个范畴的所有成员，就是不同状态的"变形"(transformation)。通过"态射"，一个成员可以变形成另一个成员。

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/js-hssbc.png" /></p>

> 1. 所有成员是一个集合<br/>
> 2. 变形关系

<hr/>
<h2>函数式编程的基础理论</h2>

1. 函数式编程（Functional Programming）其实相对于计算机的历史而言是一个非常古老的概念，甚至早于第一台计算机的诞生。函数式编程的基础模型早于第一台计算机的诞生。函数式编程的基础模型来源于 `λ(lambda x=x*2)` 演算，而 λ 演算并非设计于在计算机上执行，它是在20世纪三十年代引入的一套用于研究
函数定义、函数应用和递归的形式系统。
2. 函数式编程不是用函数来编程，也不是传统的面向过程编程。主
旨在于将复杂的函数符合成简单的函数（计算理论，或者递归论，
或者拉姆达演算）。运算过程尽量写成一系列嵌套的函数调用
3. JavaScript 是披着 C 外衣的 Lisp。
4. 真正的火热是随着React的高阶函数而逐步升温。

<h2>函数式编程语言特性</h2>

1. 函数是一等公民。所谓“第一等公民”（first class），指的是函数与其他数据类型一样，处于平等地位，赋值给其他变量，也可以作为参数，传入另一个函数，或者作为别的函数的返回值。
2. 不可改变变量。在函数式编程中，我们通常理解的变量在函数式编程中也被函数代替了：在函数式编程中变量仅仅代表某个表达式。这里所说的'变量'是不能被修改的。所有的变量只能被赋一次初值。
3. `map` & `reduce` 他们是最常用的函数式编程的方法。

<p>上面的总结就是：</p>

1. 函数式“第一等公民”
2. 只用“表达式”，不用“语句”
3. 没有“副作用”
4. 不修改状态
5. 引用透明（函数运行只靠参数）

<hr/>
<h2>函数式编程常用核心概念</h2>
<h3>纯函数</h3>
> - 对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。

```javascript
var xs = [1,2,3,4,5];
// Array.slice是纯函数，因为它没有副作用，对于固定的输入，输出总是固定的
xs.slice(0,3);  // 并不会改变原数组
xs.slice(0,3);

// 脏函数。同样的输入，输出改变了
xs.splice(0,3); // [1,2,3]
xs.splice(0,3); // [4,5]
```

函数式编程优缺点，经典库 `lodash`
```javascript
import _ from 'lodash';
var sin = _.memoize(x => Math.sin(x));
//第一次计算的时候会稍慢一点 
var a = sin(1);
// //第二次有了缓存，速度极快
var b = sin(1);
```
纯函数不仅可以有效降低系统的复杂度，还有很多很棒的特性，比如可缓存性

```javascript
//不纯的 
var min = 18; 
var checkage = age => age > min; 

//纯的，这很函数式 
var checkage = age => age > 18;
```
- 在不纯的版本中，`checkage` 不仅取决于 `age` 还有外部依赖的变量 `min`。
- 纯的 `checkage` 把关键数字 `18` 硬编码在函数内部，扩展性比较差，柯里化优雅的函数式解决。

<h2>纯度和幂等性</h2>

> 幂等性是指执行无数次后还具有相同的效果，同一的参数运行一次函数应该与连续两次结果一致。幂等性在函数式编程中与纯度相关，但有不一致。

`Math.abs(Math.abs(-42))`

<h2>偏应用函数</h2>

> 传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
偏函数之所以“偏”，在就在于其只能处理那些能与至少一个`case`语句匹配的输入，而不能处理所有可能的输入。

```javascript
const partial = (f, ...args) => {
  return (...moreArgs) => {
    f(...args, ...moreArgs);
  }
}

const add3 = (a, b, c) => a + b + c;
// 偏应⽤，先把 '2','3' 调过来，返回一个 fivePlus 函数去处理剩下的参数 '4'
const fivePlus = partial(add3, 2, 3);
fivePlus(4);  // 9

// bind实现
const add1More = add3.bind(null, 2, 3) // (c) => 2 + 3 + c
add1More(4);  // 9
```

<h2>函数的柯里化</h2>

> 柯里化（Curried）通过偏应用函数实现。
传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的函数。（偏应用函数拿函数作为参数，而柯里化不一定）

```javascript
// 纯的，这很函数式（18硬编码到函数里）。上面函数式编程有缺点中的一个例子
var checkage = age => age > 18;

// 我们一起来用柯里化来改他
var checkage = min => (age => age > min);
var checkage18 = checkage(18);
checkage18(20);
```

<p>函数的柯里化code</p>

```javascript
// 柯⾥化之前
function add(x, y) {
  return x + y;
}
add(1, 2) // 3 

// 柯⾥化之后
function addX(y) {
  return function (x) {
    return x + y;
  };
}
addX(2)(1) // 3

----------------------------
// bind传参就是柯里化经典的实现
function foo(p1, p2) {
  this.val = p1 + p2;
}
var bar = foo.bind(null, "p1");
var baz = new bar("p2");
console.log(baz.val); // "p1p2"
```

<p>优缺点</p>

```javascript
import { curry } from 'lodash-es';

var match = curry((reg, str) => str.match(reg));
var filter = curry((f, arr) => arr.filter(f));
var haveSpace = match(/\s+/g);

haveSpace('ffffff'); // null
haveSpace('a b');  // [" "]

filter(haveSpace, ["abcdefg", "Hello World"]); // ["Hello World"]
filter(haveSpace)(["abcdefg", "Hello World"]); // ["Hello World"]

// 相当于
["abcdefg", "Hello World"].filter((item) => item.match(/\s+/g)); // ["Hello World"]
```
事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种对参数的“缓存”，是一种非常高效的编写函数的方法；

<h2>函数组合</h2>

> 纯函数以及如何把它柯里化写出的洋葱代码 `h(g(f(x)))`，为了解决函数嵌套的问题，我们需要用到"函数组合"

这种灵活的组合可以让我们像拼积木一样来组合函数式的代码：
```javascript
const compose = (f, g) => {
  return x => {
    return f(g(x));
  };
}

var first = arr => arr[0];
var reverse = arr => arr.reverse();
var last = compose(first, reverse);
last([1,2,3,4,5]); // 5

/**
 * 执行 last([1,2,3,4,5])
 *
 * - x=[1,2,3,4,5];  f=first;  g=reverse;
 * - g=reverse([1,2,3,4,5])=[5,4,3,2,1]
 * - f=first([5,4,3,2,1])=5
 */
```

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/hszh.png" /></p>

我们定义的`compose`就像双面胶一样，可以把任何两个纯函数结合到一起(包括`componse`)。

```javascript
  const compose = (f, g) => {
    return x => {
      return f(g(x));
    };
  }
  var first = arr => arr[0];

  var reverse = arr => arr.reverse();
  var last = compose(first, reverse);
+ var add1 = x => x + 1;
  last([1, 2, 3, 4, 5]); // 5

+ var res = compose(add1, last);
+ console.log(res([1, 2, 3, 4, 5]));
```

<h2>Point Free</h2>

把一些对象自带的方法转化成纯函数，不要命名转瞬即逝的中间变量。

```javascript
const f = str => str.toUpperCase().split(' ');
```

这个函数中，我们使用了 `str` 作为我们的中间变量，但这个中间变量除了让我们代码变得长了一点以外是毫无意义的。

**下面是优化后的代码**

```javascript
const compose = (f, g) => x => f(g(x));

var toUpperCase = word => word.toUpperCase();
var split = x => (str => str.split(x));

var f = compose(split(' '), toUpperCase);
console.log(f('aaa bbb'));  // ["AAA", "BBB"]
/**
 * 执行 f('aaa bbb')
 *
 * - x='aaa bbb'; g=toUpperCase; f=split(x=' ')
 * - g=toUpperCase('aaa bbb')='AAA BBB'
 * - f='AAA BBB'.split(' ')=["AAA", "BBB"]
 */
```
这种风格能够帮助我们减少不必要的命名，让代码保持简洁和通
用。