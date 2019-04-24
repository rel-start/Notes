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
标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。

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
super: 指向当前对象的原型对象。

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

<h2>函数的扩展</h2>
<h3>使用注意点</h3>
箭头函数有几个使用注意点

1. 函数体内的 `this` 对象,就是定义时所在的对象, 而不是使用时所在的对象.
2. 不可以当作构造函数, 也就是说, 不可以使用 `new` 命令,否则会抛出一个错误.
3. 不可以使用 `arguments` 对象, 该对象在函数体内不存在. 如果要用, 可以用 reset 参数代替.
4. 不可以使用 `yield` 命令, 因此箭头函数不能用作 Generator 函数.