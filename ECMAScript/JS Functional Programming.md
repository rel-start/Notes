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

**上面的总结就是：**

> 1. 函数式“第一等公民”
> 2. 只用“表达式”，不用“语句”
> 3. 没有“副作用”
> 4. 不修改状态
> 5. 引用透明（函数运行只靠参数）

<hr/>
<h2>函数式编程常用核心概念</h2>
<h3>纯函数</h3>

> 对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。

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

<h3>纯度和幂等性</h3>

> 幂等性是指执行无数次后还具有相同的效果，同一的参数运行一次函数应该与连续两次结果一致。幂等性在函数式编程中与纯度相关，但有不一致。

`Math.abs(Math.abs(-42))`

<h3>偏应用函数</h3>

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

<h3>函数的柯里化</h3>

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

<h3>函数组合</h3>

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

<h3>Point Free</h3>

把一些对象自带的方法转化成纯函数，不要命名转瞬即逝的中间变量。

```javascript
const f = str => str.toUpperCase().split(' ');
```

这个函数中，我们使用了 `str` 作为我们的中间变量，但这个中间变量除了让我们代码变得长了一点以外是毫无意义的。

**下面是优化后的代码**

```javascript
const compose = (f, g) => {
return x => {
  return f(g(x));
};
}

// 暴露出来，可以多处复用
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

<h3>声明式与命令式代码</h3>

> 命令式代码的意思就是，我们通过编写一条又一条指令去让计算机执行一些动作，这其中一般都会涉及到很多繁杂的细节。而声明式就要优雅很多了，我们通过写表达式的方式来声明我们想干什么，而不是通过一步一步的指示。

```javascript
//命令式
let CEOs = [];
for(var i = 0; i < companies.length; i++)
 CEOs.push(companies[i].CEO)
}

//声明式
let CEOs = companies.map(c => c.CEO);
```

<h3>函数式编程优缺点</h3>

> 1. 函数式编程的一个明显的好处就是这种声明式的代码，对
于无副作用的纯函数，我们完全可以不考虑函数内部是如何实
现的，专注于编写业务代码。优化代码时，目光只需要集中在
这些稳定坚固的函数内部即可。
> 1. 相反，不纯的函数式的代码会产生副作用或者依赖外部系
统环境，使用它们的时候总是要考虑这些不干净的副作用。在
复杂的系统中，这对于程序员的心智来说是极大的负担。

<hr/>
<h2>惰性求值、惰性函数、惰性链</h2>

惰性函数：重写函数
```javascript
function eventBinderGenerator() {
  if (window.addEventListener) {
    // 重写，就不需要判断了
    return function (element, type, handler) {
      element.addEventListener(type, handler, false);
    }
  } else {
    // 重写
    return function (element, type, handler) {
      element.attachEvent('on' + type, handler.bind(element, window.event));
    }
  }
}
```

<hr/>
<h2>高阶函数</h2>

> 函数当参数，把传入的函数做一个封装，然后返回这个封装函数，达到更高程度的抽象

```javascript
// 命令式 reduce
var add = (a, b) => a + b;
var math = (func, array) => func(array[0], array[1]);

math(add, [1, 2])  // 3
```

相当于 `reduce` 的功能

```javascript
var res = [1, 2].reduce((a, b) => a + b);
// => 3


var sum = fn => (arr => arr.reduce(fn));
var add = (a, b) => a + b;
var aa = sum(add);
var bb = aa([1,2]);
```

**高阶函数**

> - 它是一等公民
> - 它已一个函数作为参数
> - 已一个函数作为返回结果

<hr/>
<h2>尾递归优化<sup><a href="http://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96">url</a></sup> <sup><a href="https://en.wikipedia.org/wiki/Tail_call">维基百科</a></sup></h2>

函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归需要保存大量的调用记录，很容易发生栈溢出错误，如果使用尾递归优化，将递归变成循环，那么只需要保存一个调用记录，这样就不会发生栈溢出错误了。

```javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
```

上面代码是一个阶乘函数，计算`n`的阶乘，最多需要保存n个调用记录，复杂度 `O(n)` 。

如果改写成尾递归，只保留一个调用记录，复杂度 `O(1) `。

```javascript
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
} // 尾调用自身

factorial(5, 1) // 120
```

还有一个比较著名的例子，就是计算 Fibonacci 数列，也能充分说明尾递归优化的重要性。

非尾递归的 Fibonacci 数列实现如下。

```javascript
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时
```

尾递归优化过的 Fibonacci 数列实现如下。

```javascript
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity

/**
 * f(6)
 * Fibonacci2(6,1,1)
 * Fibonacci2(5,1,2)
 * Fibonacci2(4,2,3)
 * Fibonacci2(3,3,5)
 * Fibonacci2(2,5,8)
 * Fibonacci2(1,8,13)
 */
```
ES6强制使用尾递归

<h3>尾调用与尾递归的区别</h3>

> - 尾调用是最后一部调用另外一个函数
> - 尾递归是最后一部调用自身

**`indexOf`实现取字符串中有多少个`'wo'`**

```javascript
function howmany(str, reg) {
  // reg 为空字符串或 不是字符串，直接返回 0
  if (reg === '' || typeof reg !== 'string') return 0;

  return (function fn(index, counter = 0) {
    if (index === -1) {
      return counter;
    }

    return fn(str.indexOf(reg, index + 1), ++counter);
  })(str.indexOf(reg));
}

/**
 * howman函数：(howman)str='wofdsfadsfwow'; (howman)reg='wo'
 * 第1次.(howman)fn函数：str.indexOf(reg)='wofdsfadsfwow'.indexOf('wo')=0; 也就是(fn)index=0; counter=0
 *     - 进入fn函数：return fn('wofdsfadsfwow'.indexOf('wo'), 1)
 * 第2次.(howman)fn函数：index=10; counter=1
 *     - 进入fn函数：return fn('wofdsfadsfwow'.indexOf('wo'), 11)
 * 第3次.(howman)fn函数：index=-1; counter=2
 *     - 最终返回 2
 */

console.log(howmany('wofdsfadsfwow', 'wo'));
```

<h3>递归函数的改写</h3>
尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。比如上面的例子，阶乘函数 `factorial` 需要用到一个中间变量`total`，那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数`5`和`1`？

两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。

```javascript
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5) // 120
```

上面代码通过一个正常形式的阶乘函数`factorial`，调用尾递归函数`tailFactorial`，看起来就正常多了。

函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

```javascript
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120
```

上面代码通过柯里化，将尾递归函数`tailFactorial`变为只接受一个参数的`factorial`。

第二种方法就简单多了，就是采用 ES6 的函数默认值。

```javascript
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
```

上面代码中，参数`total`有默认值`1`，所以调用时不用提供这个值。

总结一下，递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。对于其他支持“尾调用优化”的语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

<hr/>
<h2>尾递归优化的实现</h2>
尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？回答是可以的，就是自己实现尾递归优化。

它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

下面是一个正常的递归函数。

```javascript
function sum2(x, y) {
  console.trace('sum22222222222');
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
}
sum2(1, 100000);
// => Uncaught RangeError: Maximum call stack size exceeded
```

**`sum2(1,4);`的堆栈跟踪**

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/wdyyh1.png" /></p>

上面代码中，`sum`是一个递归函数，参数x是需要累加的值，参数`y`控制递归次数。一旦指定`sum`递归 `100000` 次，就会报错，提示超出调用栈的最大次数。

蹦床函数（trampoline）可以将递归执行转为循环执行。

```javascript
function trampoline(f) {
  // if (f && f instanceof Function) { f = f(); }
  // 1. if 只做判断，判断一次之后，便不会再回来了。
  // 这里改用 if 的话，一次执行函数就 return。返回的是 fn 函数

  // 2. while 的话，循环，直到结果为false，才跳出来。
  // 只有到 f 不为函数才能执行到 return。也就是下面的 sum 函数 return x 才行
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

function sum(x, y) {
  console.trace();
  if (y > 0) {
    // bind 的话应该是 只会跟踪 2 个栈。
    // 不用 bind 也就失去效果了
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}

trampoline(sum(1,5));
// => 100001
```

蹦床函数并不是真正的尾递归优化，下面的实现才是。

**`trampoline(sum(1,5));`的堆栈跟踪**

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/wdyyh2.png" /></p>


```javascript
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];
  

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum1 = tco(function(x, y) {
  console.trace('================');
  if (y > 0) {
    return sum1(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum1(1, 100000);

/** sum(1, 5)
  * 执行 tco() = fn accumulator();
  *  - 第1：{tco>accumulator}。 args: [1, 5]; accumulated.length = 2; f=ddd(1, 5); this=window; active=true
  *  - 第2：{ddd>sum1}。  sum1(2, 4); sum1 = tco() 返回的函数(惰性函数)，没有active=false这一步了; 还没有跳出 while
  *  - 第3：当前还没跳出 while。但 accumulated 又被push为 [2,4]，这次没有进入 if。回到原来的 while 循环中，accumulated.length = 1
  *  - 又继续类似 操作第2 第3，直到 sum1(6, 0)；
  *  - 第4：{tco=accumulator}。value = f.apply(this, [6,0]) = x = 6; accumulated.length=0，跳出 while 循环了
  *  - 接下来 active = false; return 6;
  */
```

**`sum1(1, 5);`的堆栈跟踪**

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/wdyyh3.png" /></p>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/ctdg.png" /></p>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/xsdg.png" /></p>

<h2>尾递归问题？</h2>

1. 尾递归的判断标准是函数运行【最后一步】是否调用自身，而不是 是否在函数的【最后一行】调用自身，最后一行调用其他函数 并返回叫尾调用。
2. 按道理尾递归调用调用栈永远都是更新当前的栈帧而已，这样完全避免了爆栈的危险。但是现如今的浏览器并未完全支持☹原因有二①在引擎层面消除递归是一个隐式的行为，程序员意识不到。②堆栈信息丢失了 开发者难已调试。
3. 既然浏览器不支持我们可以把这些递归写成while~

<h2>闭包</h2>

> 如下例子，虽然外层的 makePowerFn 函数执行完毕，栈上的调用
帧被释放，但是堆上的作用域并不被释放，因此 power 依旧可以
被 powerFn 函数访问，这样就形成了闭包

```javascript
function makePowerFn(power) { 
 function powerFn(base) {
 return Math.pow(base, power);
 }
 return powerFn;
}
var square = makePowerFn(2); 
square(3); // 9
```

<hr/>
<h2>范畴与容器</h2>

> 1. 我们可以把“范畴”想象成是一个容器，里面包含两样东西。值（value）、值得变形关系，也就是函数。
> 2. 范畴论使用函数，表达范畴之间的关系。
> 3. 伴随着范畴论的发展，就发展出一整套函数的运算方法。这套方法起初只用于**数学运算**，后来有人将它在计算机上实现了，就变成了今天的”函数式编程"。
> 4. 本质上，函数式编程只是范畴论的运算方法，跟数理逻辑、微积分、、行列式是同一类东西，都是数学方法，只是碰巧它能用来写程序。为什么函数式编程要求函数必须是纯的，不能有副作用？因为它是一种数学运算，原始目的就是求值，不做其他事情，否则就无法满足函数运算法则了。

> 1. 函数不仅可以用于同一个范畴之中值的转换，还可以用于将一个范畴转成另一个范畴。这就涉及到了函子（Functor）。
> 2. 函子是函数式编程里面最重要的数据类型，也是基本的运算单位和功能单位。它首先是一种范畴，也就是说，是一个容器，包含了值和变形关系。比较特殊的是，它的变形关系可以依次作用于每一个值，将当前容器变形成另一个容器。

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/fcyrq.png" /></p>

<h2>容器、Functor（函子）</h2>

`$(...)` 返回的对象并不是一个原生的DOM对象，而是对于原生对象的一种封装，这在某种意义上就是一个“容器”（但它并不函数式）。

> - `Functor`（函子）遵守一些特定规则的容器类型。
> - 任何具有`map`方法的数据结构，都可以当作函子的实现。
> - `Functor` 是一个对于函数调用的抽象，我们赋予容器自己去调用函数的能力。把东西装进一个容器，只留出一个借口 `map` 给容器外的函数，`map` 一个函数时，我们让容器自己来运行这个函数，这样容器就可以自由地选择何时何地如何操作这个函数，以致于拥有惰性求值、错误处理、异步调用等等非常牛掰的特性。

**例1**
```javascript
var Container = function (x) {
  this.__value = x;
}
// 函数式编程一般约定，函子有一个of方法
Container.of = x => new Container(x);
// 一般约定，函子的标志就是容器具有map方法。该方法将容器里面的每一个值，映射到另一个容器
Container.prototype.map = function (f) {
  return Container.of(f(this.__value));
}

Container.of(3)                 // 结果 Container {__value: 4}
    .map(x => x + 1)            // 结果 Container {__value: 4}
    .map(x => 'Result is ' + x);   // 结果 Container {__value: 'Result is 4'};
```
上述代码中，产生了 3 个函子(就是3个`new Container`)

**map**
```javascript
class Functor { 
 constructor(val) { 
 this.val = val; 
 } 
 map(f) { 
 return new Functor(f(this.val)); 
 } 
} 
(new Functor(2)).map(function (two) { 
 return two + 2; 
}); 
// => Functor {val: 4}
```
上面最后一行，有点像数组的 `arr.map()`。`arr`也是个对象

> - 上面的代码中，`Functor`是一个函子，它的`map`方法接受函数`f`作为参数，然后返回一个新的函子，里面包含的值是被`f`处理过的`(f(this.val))`。
> - 一般约定，函子的标志就是容器具有`map`方法。该方法将容器里面的每一个值，映射到另外一个容器。
上面的例子说明，函数编程里面的运算，都是通过函子完成，即运算不直接针对值，而是针对这个值得容器----函子。函子本身具有对外接口（`map`方法），各种函数就是运算符，通过接口接入容器，引发容器里面的值得变形。
> - 因此，学习函数式编程，实际上就是学习函子的各种运算。由于可以把运算方法封装在函子里面，所以又衍生出各种不同类型的函子，有多少种运算，就有多少种函子。函数式编程就变成了运用不同的函子，解决实际问题。

<hr/>
<h3>of 方法</h3>

> - 你可能注意到了，上面生成新的函子的时候，用了
new命令。这实在太不像函数式编程了，因为new命令是
面向对象编程的标志。 。
> - 函数式编程一般约定，函子有一个of方法，用来生成新
的容器

```javascript
class Functor {
  constructor(val) {
    this.val = val;
  }

  map(f) {
    return new Functor(f(this.val));
  }

  static of(x){
    return new Functor(x);
  }
}
Functor.of(2).map(function (two) {
  return two + 2;
});
// => Functor {val: 4}
```

<hr/>
<h3>Maybe 函子(if)</h3>

```javascript
Functor.of(null).map(x => x.toUpperCase());
// => TypeError: Cannot read property 'toUpperCase' of null

class Maybe extends Functor {
  map(f) {
    return this.val ? Maybe.of(f(this.val)) : Maybe.of(null);
  }

  static of (x) {
    return new Maybe(x);
  }
}

Maybe.of(null).map(x => x.toUpperCase());
// => // Maybe(null)
```

下面容器我们称之为 Maybe（原型来⾃于Haskell）
```javascript
class Maybe extends Functor {
  map(f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.val));
  }
    
  isNothing() {
    return (this.val === null || this.val === undefined);
  }

  static of (x) {
    return new Maybe(x);
  }
}
```

<hr/>
<h3>错误处理、Either</h3>

> 1. 我们的容器能做的事情太少了，`try/catch/throw` 并不是纯的(err参数)，因为它从外部接管了我们的函数，并且这个函数时抛弃了它的返回值。
> 2. `Promise` 是可以调用 `catch` 来集中处理错误的。
> 3. 事实上 `Either` 并不只是用来做错误处理的，它表示了逻辑或，范畴学里的 `coproduct`。

<hr/>
<h3>Either</h3>
条件运算符 `if...else` 是最常见的运算之一，函数编程里面，使用 `Either` 函子表达。`Either` 函子内部有两个值：左值（left）和右值（Right）。右值是正常情况下使用的值，左值是右值不存在时使用的默认值。

```javascript
class Either extends Functor { // 感觉这里不需要继承，因为所有方法都是重写
  constructor(left, right) {
    super(); delete this.val;
    this.left = left;
    this.right = right;
  }

  map(f) {
    // Right有值 就右值执行函数，反之给 Left 调用
    return this.right ? Either.of(this.left, f(this.right)) : Either.of(f(this.left), this.right);
  }

  static of (left, right) {
    return new Either(left, right);
  }
}

var addOne = x => x + 1;

Either.of(5, 6).map(addOne);
// => Either {left: 5, right: 7}
Either.of(5, null).map(addOne);
// => Either {left: 6, right: null}

// currentUser.address为空，用 Left值 代替
var currentUser = {};
var updateField = x => x;
Either.of({
  address: 'xxx'
}, currentUser.address).map(updateField);
// => Either {left: {address: 'xxx'}, right: undefined}
```
代替 `try...catch`

**错误处理、Either**
```javascript
var Left = function (x) {
  this.__value = x;
}
var Right = function (x) {
  this.__value = x;
}
Left.of = function (x) {
  return new Left(x);
}
Right.of = function (x) {
  return new Right(x);
}

Left.prototype.map = function (f) {
  return this;
}
Right.prototype.map = function (f) {
  return Right.of(f(this.__value));
}
```

`Left` 和 `Right` 唯一的区别就在于 `map` 方法的实现，`Right.map` 的行为和我们之前提到的 `map` 函数一样。但是 `Left.map` 就很不同了：它不会对容器做任何事情，只是很简单地把这个容器拿进来又扔出去。这个特性意味着，`Left` 可以用来传递一个错误消息。

```javascript
var getAge = user => user.age ? Right.of(user.age) : Left.of("ERROR!");
getAge({name: 'stark', age: '21'}).map(age => 'Age is ' + age);
// => Right {__value: "Age is 21"}
getAge({name: 'stark'}).map(age => 'Age is ' + age);
// => Left {__value: "ERROR!"}
```

`Left` 可以让调用链中任意一环的错误立刻返回到调用链的尾部，这给我们错误处理带来了很大的方便，再也不用一层又一层的 `try/catch`。

<hr/>
<h3>AP函子</h3>

> 函子里面包含的值，完全可能是函数。我们可以想象这样一种情况，一个函子的值是数值，另一个函子的值是函数。

```javascript
class Ap extends Functor {
  ap(F) {
    // 下面 f 变量的 F.val=2; this.val=addTwo(2); Ap.of(4)=new Ap(4);
    return Ap.of(this.val(F.val));
  }

  static of (x) {
    return new Ap(x);
  }
}
var addTwo = function (x) {
  return x + 2;
}

var f = Ap.of(addTwo) // Ap {val: ƒ}
          .ap(Functor.of(2)); // Ap {val: 4}
```

<hr/>
<h3>IO</h3>

1. 真正的程序总要去接触肮脏的世界。

```javascript
function readLocalStorage(){
 return window.localStorage;
}
```

2. IO 跟前面几个 `Functor` 不同的地方在于，它的 `__value` 是一个函数。它把不纯的操作（比如IO、网络请求、DOM）包裹到一个函数内，从而延迟这个操作的执行。所以我们认为，IO包含的是被包裹的操作的返回值。
3. IO 其实也算是惰性函数
4. IO 负责了调用链基类了很多很多不纯的操作，带来的复杂性和不可维护性。

```javascript
import _ from 'lodash';
var componse = _.flowRight;

class IO {
  constructor(f) {
    this.__value = f;
  }
  
  map(f) {
    return new IO(componse(f, this.__value));
  }
  
  static of(x) {
    return new IO(_ => x)
  }
}
```

我们先后提到了 Maybe、Either、IO 这三种强⼤的 Functor，
在链式调⽤、惰性求值、错误捕获、输⼊输出中都发挥着巨⼤
的作⽤。事实上 Functor 远不⽌这三种。
但依然有问题困扰着我们：

1. 如何处理嵌套的 Functor 呢？（⽐如 Maybe(IO(42))）
2. 如何处理⼀个由⾮纯的或者异步的操作序列呢？

<hr/>
<h3>Monad</h3>

1. `Monad` 就是一种设计模式，表示将一个运算过程，通过函数拆解成互相连接的多个步骤。你只要提供下一步运算所需的函数，整个运算就会自动进行下去。
2. `Promise` 就是一种 `Monad`。
3. `Monad` 让我们避开了嵌套地狱，可以轻松地进行深度嵌套的函数编程，比如IO和其他异步任务。
4. 记得让上面的 `IO` 集成 `Monad`。

```javascript
class Monad extends Functor {
 join() {
 return this.val;
 }
 flatMap(f) {
 return this.map(f).join();
 }
}
```
Monad函子的作用是，总是返回一个单层的函子。它有一个`flatMap`方法，与`map`方法作用相同，唯一的区别是如果生成了一个嵌套函子，它会取出后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况。

如果函数`f`返回的是一个函子，那么`this.map(f)`就会生成一个嵌套的函子。所以，`join`方法保证了`flatMap`方法总是返回一个单层的函子。这意味着嵌套的函子会被铺平（flatten）。

**例1**
```javascript
var fs = require('fs');
var _ = require('lodash');
//基础函子
class Functor {
  constructor(val) {
    this.val = val;
  }
  map(f) {
    return new Functor(f(this.val));
  }
}
//Monad 函子
class Monad extends Functor {
  join() {
    return this.val;
  }
  flatMap(f) {
    //1.f == 接受一个函数返回的事IO函子
    //2.this.val 等于上一步的脏操作
    //3.this.map(f) compose(f, this.val) 函数组合 需要手动执行
    //4.返回这个组合函数并执行 注意先后的顺序
    return this.map(f).join();
  }
}
var compose = _.flowRight;
//IO函子用来包裹📦脏操作
class IO extends Monad {
  //val是最初的脏操作
  static of(val) {
    return new IO(val);
  }
  map(f) {
    return IO.of(compose(f, this.val))
  }
}
var readFile = function (filename) {
  return IO.of(function () {
    return fs.readFileSync(filename, 'utf-8');
  });
};
var print = function (x) {
  console.log("橘子-");
  return IO.of(function () {
    console.log("苹果-")
    return x + "函数式";
  });
}
var tail = function (x) {
  console.log(x);
  return IO.of(function () {
    return x + "【京程一灯】";
  });
}
const result = readFile('./11.txt')
  //flatMap 继续脏操作的链式调用
  // .flatMap(print);
  .flatMap(print)()
  .flatMap(tail)();
console.log(result.val());
// console.log(result().val());

/**
 * 第1。【readFile()】filename='./11.txt'; 执行后就返回 IO.of() 也就是等于 new IO(()=>fs.readFileSync(filename, 'utf-8'))
 *        - filename='./11.txt'；this.val=()=>fs.readFileSync(filename, 'utf-8')
 * 
 * 第2。【Monad下面的 flatMap()】this=IO；f=print; this.map(print)执行后 又生成新 IO 函子 
 *        - this.map(f)=new IO(val=componse(print, fs.readFileSync(filename, 'utf-8')); 回到 Monad 下的flatMap函数。this.map(f).join(); 返回 this.val=componse(print, this.val);
 *        - 接下来执行 .flatMap(print)()=componse(print, rf=()=>fs.readFileSync(filename, 'utf-8'))();下面用 rf代替()=>fs.readFileSync(filename, 'utf-8')
 *        - 也就是 print(x=rf('./11.txt'))；打印出print里面的 console.log('橘子-')；并且还读到了文件。tis.val=function(){console.log('苹果-')}
 * 
 * 第3. 【又到Monad下面的 flatMap()】f=tail函数；this.map(tail)=new IO(val); this.val=componse(tail,val=print执行后的函数)。在join下 var result = componse(tail,val=function(){console.log('苹果-')})
 *        - 执行 .falatMap(tail)()。先答应console.log('苹果-')；返回的值作为tail(x+'函数式')的参数。现在 var result = tail()的返回函数=new IO(val=function (){ return x+'京城一灯' })
 * 
 * 第4。最后result.val()执行 就返回'hello函数式【京程一灯】'。hello是文件的内容
 */
```

<h2>流行的几大函数式编程库</h2>

> 1. [RxJS](https://cn.rx.js.org/)
> 2. cycleJS
> 3. [lodashJS](https://lodash.com/docs/4.17.11)、lazy(惰性求值)
> 4. [underscoreJS](https://underscorejs.org/)
> 5. ramdajs

<h2>实际应用场景</h2>

> - 公司的公用库
> - 易调试、热部署、并发
> - 单元测试