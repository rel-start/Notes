# typescript基础

标签（空格分隔）： Typescript

---

- [typescript入门教程](https://ts.xcatliu.com/basics/primitive-data-types)
- [深入理解 ts](https://jkchao.github.io/typescript-book-chinese/)

<h2>基础</h2>
<h3>原始数据类型</h3>

使用 `number`, `boolean`, `string`, `undefined`, `null` 定义变量

```javascript
// boolean
let cl: boolean = false;
let ty: boolean = Boolean(1);

// number
let qw: number = 6;

// string
let myName: string = 'Tom';

// undefined 和 null 是所有类型的子类型
let u: undefined = undefined;
let num: number = undefined;
```

<hr/>
<h3>void</h3>

在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数：

```javascript
function alertName(): void {
    alert('My name is Tom');
}
```

<hr/>
<h3>任意类型</h3>

但如果是 `any` 类型，则允许被赋值为任意类型。

```javascript
// 变量
let cl: any = 'seven';
cl = 7;

// 函数
function ss(): any {
  return 11;
}
```

<hr/>
<h3>联合类型</h3>

```javascript
let ty: string | number;
ty = '汤烨';
ty = 22;
```

<hr/>
<h2>接口</h2>

[有的编程语言中会建议接口的名称加上 I 前缀](https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-1.1/8bc1fexb(v=vs.71))

```javascript
interface IPerson {
  name: string;
  age?: number;
  [propName: string]: string|number;
  // 或者写成 [propName: string]: :any
}

let tom: IPerson = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};
```

<hr/>
<h2>数组</h2>

<h3>最简单的方式</h3>

```javascript
let cl: number[] = [1, 1, 2, 3, 5];
```

<hr/>
<h3>联合类型</h3>

```javascript
// 「类型 + 方括号」表示法
let ty: (number | string)[] = [1, '2', 3];

// any
let ty2: any[] = [1, '2', 3];

// 联合类型
let x: [string, number];
x = ['hello', 10];
```

<hr/>
<h3>数组泛型</h3>

也可以使用数组泛型（Array Generic） `Array<elemType>` 来表示数组：

```javascript
let cl: Array<number | string> = [1, 2, '3', 4];
```

<hr/>
<h3>用接口表示数组</h3>

接口也可以用来描述数组：

```javascript
interface INumberArray {
  [index: number]: number | string;
}

let cl: INumberArray = [1, 2, '3', 4];
```

`NumberArray` 表示：只要 `index` 的类型是 `number`，那么值的类型必须是 `number | string`。

<hr/>
<h3>类数组</h3>

类数组（Array-like Object）不是数组类型，比如 `arguments`：

```javascript
function sum() {
    let args: number[] = arguments;
}

// index.ts(2,7): error TS2322: Type 'IArguments' is not assignable to type 'number[]'.
//   Property 'push' is missing in type 'IArguments'.
```

事实上常见的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等：

```javascript
function sum() {
    let args: IArguments = arguments;
}
```

关于内置对象，可以参考[内置对象](https://ts.xcatliu.com/basics/built-in-objects)一章。

<hr/>
<h2>函数</h2>

<h3>完整函数类型</h3>

```javascript
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

<h3>用接口定义函数的形状</h3>

我们也可以使用接口的方式来定义一个函数需要符合的形状：

```javascript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function (source: string, subString: string) {
  return source.search(subString) !== -1;
}
```

<hr/>
<h3>可选参数</h3>

与接口中的可选属性类似，我们用 ? 表示可选的参数：

```javascript
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

需要注意的是，可选参数必须接在必需参数后面。上面代码中只能是`1～2`个参数

<hr/>
<h3>非空操作符</h3>

```javascript
type ListNode = {data: string | number; next?: ListNode};

function setNextValue(node: ListNode, value: number) {
  node.next!.data = value;
  console.log(node)
}

setNextValue(
  {
    data: 123,
    next: {
      data: 456,
      next: {
        data: 789  // next下必须要有data
      }
    }
  },
  1
);
```

<hr/>
<h3>参数默认值</h3>

同es6函数参数默认值

```javascript
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

<hr/>
<h3>剩余参数</h3>

```javascript
function buildName(firstName: string, ...restOfName: string[]): string {
  return `firstName ${restOfName.join(' ')}`
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
let re = buildNameFun("Joseph", "Samuel", "Lucas", "MacKinzie");
// => firstName Samuel Lucas MacKinzie
```

<hr/>
<h3>重载</h3>

在 TypeScript 中，我们可以使用重载定义多个 `reverse` 的函数类型：

```javascript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

reverse(123)
// => 321
reverse('hello')
// => olleh
```

<hr/>
<h2>断言</h2>

<h3>语法</h3>

    <类型>值

或

    值 as 类型
    
在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。

```javascript
function getLength(something: string | number):number{
  if ((<string>something).length) {
    return (something as string).length;
  } else {
    return something.toString().length;
  }
}
```

<hr/>
<h2>声明文件</h2>

- declare var 声明全局变量
- declare function 声明全局方法
- declare class 声明全局类
- declare enum 声明全局枚举类型
- declare namespace 声明（含有子属性的）全局对象
- interface 和 type 声明全局类型
- export 导出变量
- export namespace 导出（含有子属性的）对象
- export default ES6 默认导出
- export = commonjs 导出模块
- export as namespace UMD 库声明全局变量
- declare global 扩展全局变量
- declare module 扩展模块
- /// <reference /> 三斜线指令

[详情](https://ts.xcatliu.com/basics/declaration-files#declare-var)

<hr/>
<h2>内置对象</h2>

<h3>ECMAScript 的内置对象</h3>

ECMAScript 标准提供的内置对象有：`Boolean`、`Error`、`Date`、`RegExp` 等。

```javascript
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

<hr/>
<h3>DOM 和 BOM 的内置对象</h3>

DOM 和 BOM 提供的内置对象有：`Document`、`HTMLElement`、`Event`、`NodeList`等。

```javascript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

[更多详情](https://ts.xcatliu.com/basics/built-in-objects)
