# React 16.9入门

标签（空格分隔）： React

---
<h2>react组件的几种写法</h2>

纯函数组件  

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function Welcome() {
    return <h2>Hello world</h2>
}

ReactDOM.render(<Welcome />, document.getElementById('root'));
```

ES6类组件

```javascript
import React from 'react'
const e = React.Component;

class Welcome extends e {
  render(){
    return <h2 className="greeting">Hello world</h2>;
  }
}
```

上面的相当于

```javascript
import React from 'react'
const e = React.Component;

class Welcome extends e {
  render(){
    return React.createElement(
      'h2',
      { className: 'greeting' },
      'Hello world!'
    );
  }
}
```

<hr/>
<h2>css应用</h2>

```javascript
const Style = {
  backgroundColor: '#f60'
}

class CssDemo extends React.Component {
  render() {
    return <h1 style={Style}>Hello world!</h1>
  }
}
```

<hr/>
<h2>属性</h2>

```javascript
// 纯函数
function Welcome(props) {
  return <h2>{props.user.firstName}</h2>
}

// 类
class Welcome extends React.Component {
  render(){
    const { user } = this.props;
    return <h2>{user.firstName}</h2>
  }
}

ReactDOM.render(<Welcome user={{firstName: 'Point'}} />, document.getElementById('root'));
```

<hr/>
<h2>状态</h2>

```
export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  // 该componentDidMount()方法在将组件输出呈现给DOM后运行
  // 当Clock输出插入DOM时，React会调用componentDidMount()生命周期方法。
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  // 如果Clock组件从DOM中删除，React会调用componentWillUnmount()生命周期方法，以便停止计时器。
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  render() {
    const {date} = this.state;
    return (
      <>
        <h1 style={Style}>Hello, world!</h1>
        <h2>It is {date.toLocaleTimeString()}.</h2>
      </>
    )
  }
}
```

<hr/>
<h2>JSX</h2>

由于JSX更接近JavaScript而不是HTML，因此React DOM使用camelCase属性命名约定而不是HTML属性名称。
例如，class变成className，tabindex变成tabIndex。

```javascript
const sa = 'sa';
class Welcome {
  handle(e) {
    console.log(e)
  }
  render() {
    return (
      <>
        <div tabIndex="0" className={sa}  onClick={this.handle}>tabIndex:0</div>
        <label htmlFor="test">测试</label>
        <input type="text" id="test" />
      </>
    )
  }
}
```

<h3>注释</h3>

```javascript
export class Test extends React.Component {
  render() {
    return (
      <>
        {/* 注释 */}
        <h1>{(function () { return 'Hello' }())}</h1>
      </>
    );
  }
}
```

<hr/>
<h2>处理事件</h2>

<h3>防止默认事件</h3>

````javascript
export class ActionLink extends React.Component {
  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  render() {
    return (
      <a href="#" onClick={this.handleClick}>Click me</a>
    )
  }
}
```

这e是一个合成事件。React根据[W3C规范](https://www.w3.org/TR/DOM-Level-3-Events/)定义了这些合成事件，因此您无需担心跨浏览器兼容性。请参阅[SyntheticEvent](https://reactjs.org/docs/events.html)参考指南以了解更多信息。

<h3>this指向问题</h3>

**手动绑定this**：需要自己在`constructor`手动绑定

```javascript
export class Toggle1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isTooggleOn: true }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState(state => ({
      isTooggleOn: !state.isTooggleOn
    }))
  }

  render() {
    const { isTooggleOn } = this.state;
    return (
      <button onClick={this.handleClick}>
        {isTooggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}
```

如果bind让你烦恼，可以使用下面这种方法[public class fields syntax](https://babeljs.io/docs/plugins/transform-class-properties/)<sup>react 16.9 好像自身实现了</sup>

```javascript
class LoggingButton extends React.Component {
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

方法3

```javascript
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

<h3>将参数传递给事件处理程序</h3>

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

<hr/>
<h2>列表和键</h2>

大多数情况下，您会使用数据中的ID作为键：

```javascript
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

当您没有渲染项目的稳定ID时，您可以使用项目索引作为关键作为最后的手段：

```javascript
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

<hr/>
<h2>Forms</h2>

<h3>受控组件</h3>

在HTML中，表单元素如<input>，<textarea>以及<select>通常保持自己的状态和基于用户输入更新它。在React中，可变状态通常保存在组件的state属性中，并且仅更新为[setState()](https://reactjs.org/docs/react-component.html#setstate)。

```javascript
export class EssayForm extends e {
  constructor(props) {
    super(props);
    this.state = {
      value: '请写一篇关于你最喜欢的DOM元素的文章',
    }
  }

  handleChange = (event) => {
    console.log('🍎', event.target)
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert('一篇提交的文章是：' + this.state.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}
```

上面`event.target`获取到`<textarea/>`元素

对于受控组件，每个状态变异都将具有相关的处理函数。这使得修改或验证用户输入变得简单。例如，如果我们想要强制使用全部大写字母编写名称，我们可以写成`handleChange`：

```javascript
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

<hr/>
<h2>构成与继承</h2>

一些使用特殊`children' prop将子元素直接传递输出

```javascript
function FancyBorder(props) {
  return (
    <div className={`FancyBorder FancyBorder-${props.color}`}>
      {props.children}
    </div>
  )
}

export function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  )
}
```

<h3>插槽</h3>

```javascript
function Contacts() {
  return <div className="Contacts">Contacts</div>
}

function Chat() {
  return <div className="Chat">Chat</div>
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  )
}

export function Holes() {
  return (
    <SplitPane left={<Contacts/>} right={<Chat/>} />
  )
}
```

<hr/>
<h2>Refs</h2>

**通过ref属性提取真实的DOM元素**

```javascript
export class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
  }

  handleClick = () => {
    this.refs.aa ? console.log(this.refs.aa) : console.log(this.myRef.current);
  }

  render() {
    return (
      <>
        <div ref={this.myRef} onClick={this.handleClick}>{`ref={this.myRef}`}</div>
        <div ref='aa' onClick={this.handleClick}>ref="aa"</div>
      </>
    )
  }
}
```

**通过refs。父组件调用 子组件的方法**

```javascript
class AutoFocusTextInput extends Component {
  constructor(props) {
    super(props);
    this.textInput = createRef();
  }

  componentDidMount() {
    console.log(this.textInput)
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}

class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
  }
  focusTextInput() {
    this.myRef.current.focus()
  }
  render (){
    return (
      <input type="text" ref={this.myRef}/>
    )
  }
}
```

<h3>函数组件不能给refs</h3>

您可能不会ref在函数组件上使用该属性，因为它们没有实例：

```javascript
class Parent extends Component {
  constructor(props) {
    super(props);
    this.textInput = createRef();
  }

  render() {
    return (
      // 报错
      <MyFunctionComponent ref={this.textInput} />
    )
  }
}

function MyFunctionComponent() {
  return <input />;
}
```

<hr/>
<h2>事件处理函数</h2>

```
// 触摸
onTouchCancel
onTouchEnd
onTouchMove
onTouchStart

// 键盘
onKeyDown
onKeyPress
onKeyUp

// 剪切
onCopy
onCut
onPaste

// 表单
onChange
onInput
onSubmit

// 焦点
onFocus
onBlur

// UI元素
onScroll

// 滚动
onWheel

// 鼠标
onClick
onContextMenu
onDoubleClick
onMouseDown
onMouseEnter
onMouseLeave
onMouseMove
onMouseOut
onMouseOver
onMouseUp

// 鼠标拖拽
onDrop
onDrag
onDragEnd
onDragEnter
onDragLeave
onDragOver
onDragStart
```

<hr/>
<h2>Suspense组件</h2>

```javascript
import React, { Suspense, lazy } from 'react';
import { useFetch } from "react-hooks-fetch";
// import OtherComponent from './OtherComponent';
const OtherComponent = lazy(() => import('./OtherComponent'));
const LazyFunc = lazy(() => import('./lazy'));

function fetchApi() {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve("Data resolved");
    }, 3000);
  });
  return promise;
}
//创建Fetcher
const createFetcher = promiseTask => {
  let cached = Symbol('cached');
  let ref = cached;
  return () => {
    const task = promiseTask();
    task.then(res => {
      ref = res;
    });
    console.log("🌲--ref", ref, ref === cached);
    console.log("🌺--cached", cached);
    if (ref === cached) {
      throw task;
    }
    //得到结果输出
    console.log("🍎", ref);
    return ref;
  };
};

const requestData = createFetcher(fetchApi);
function SuspenseComp() {
  const { error, data } = useFetch("a.php");
  console.log("数据📚",data)
  if (error) return <span>出错了/(ㄒoㄒ)/~~</span>;
  if (!data) return null;
  return <span>RemoteData:{data.title}</span>;
  // const data = requestData();
  // return <p className="text-warning">{data}</p>;
}

export function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
        <LazyFunc />
        <SuspenseComp/>
      </Suspense>
    </div>
  )
}
```

上面的Suspense组件必须要等到所有`props.children`加载完才会一起显示，不然只会显示`<div>Loading...</div>`

lazy.jsx OtherComponent.jsx
```javascript
import React from 'react';
export default () => <p className="text-success">我是Lazy Comp</p>
```

<h2>createContext</h2>

```javascript
//Context 主要是解决props向多层嵌套的子组件传递的问题，原理是定义了一个全局对象
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = React.createContext("default");

class Parent extends Component {
  state = {
    yideng: '普通字符串🍌',
    newContext: '京城一灯',
  }

  getChildContext() {
    return { newContext: this.state.newContext, yideng: this.state.yideng }
  }

  render() {
    //    <React.Fragment> ==  <>
    return (
      <>
        <div>
          <label>父节点 => newContext：
          <input
              type="text"
              value={this.state.newContext}
              onChange={e => this.setState({ newContext: e.target.value })} />
          </label>
        </div>
        <div>
          <label>父节点 => yideng:
            <input
              type="text"
              value={this.state.yideng}
              onChange={e => this.setState({ yideng: e.target.value })} />
          </label>
        </div>
        {/* {this.props.children} */}
        <Provider
          value={this.state}>
          {this.props.children}
        </Provider>
      </>
    )
  }
}
Parent.childContextTypes = {
  newContext: PropTypes.string,
  yideng: PropTypes.string
};


function Child(props, context) {
  return (
    <Consumer>
      {value => (
        <p>子节点 => newContext: {value.newContext}</p>
      )}
    </Consumer>
  )
}
Child.contextTypes = {
  newContext: PropTypes.string
}

class Child2 extends Component {
  static contextTypes = {
    yideng: PropTypes.string,
  }

  render() {
    return (
      <Consumer>
        {value => (
          <p>子节点 => yideng: {value.yideng}</p>
        )}
      </Consumer>
    )
  }
}

export function App() {
  return (
    <Parent>
      <Child />
      <Child2 />
    </Parent>
  )
}
```

<hr/>
<h2>useReducer</h2>

```javascript
import React, { useReducer } from 'react';

function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Rest
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}

ReactDOM.render(<Counter initialCount={33} />, document.getElementById('root'));
```

