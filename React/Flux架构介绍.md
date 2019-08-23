# Flux架构介绍

标签（空格分隔）： React

---

<h2>Flux架构介绍</h2>

> React本身只涉及UI层，如果搭建大型应用，必须搭配一个前端框架
> Flux是一种架构思想，专门解决软件的结构问题。它跟 MVC 架构是同一类东西，但是更加简单和清晰。
> View：视图层
> Action(动作)：视图层发出的消息（比如mouseClick）
> Dispatcher(派发器)：用来接受Actions、执行回调函数
> Store(数据层)：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面

<h3>Flux架构</h3>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/flux01.png"></p>

view发起一个action到dispatcher，dispatcher派发消息，交给store，然后store在还给view

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/flux02.png"></p>


<h2>Redux介绍与实战</h2>

<h3>Redux架构</h3>

redux把所有的状态进行抽离了然后存储到`store`中。react最初状态`state`与`DOM`结合在一起。`store`派发为`view`，整个`store`管理着所有的逻辑

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/flux03.png"></p>

`store`每次产生一个新`state`.

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/flux04.png"></p>

redux基于flux思想来的。主要步骤：
- 用户发起`view`，产生一个`action`
- `action`经过整个大`store`，`store`里面有`middleware`经过它，经过`reducer`。
- `reducer`是数据的改变，返回一个新`state`
- `reducer`去接`action`在还给`view`

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/flux05.png"></p>

<h3>Redux</h3>

- Flux存在多种实现（至少15种）Redux还算不错
- redux.min.js、react-redux.js、redux-thunk.min.js
- keyMirror.js、immutable.min.js、reqwest.js（fectch）、ReduxThunk.js
- 管理应用的state
  - 通过 store.getState() 可以获取
  - 通过 store.dispatch() 来出发 state 更新
  - 通过 store.subscribe(listener) 来注册 state 变化监听器
  - 通过 createStore(reducer, [initialState]) 创建
- Provider(ReactRedux)注入store `<Provider store={store}> <App/> </Provider>`
- Actions JS 普通对象 通过 constants取到
- 对应 Actions Reducer 返回规律，更具体的是返回状态（Redux.combineReducers返回唯一的Reducer）
- store(Redux.createStore(rootReducer,Redux.applyMiddleware(thunkMiddleware)))具体实施的载体
- components具体React的组件但是不涉及状态
- component->App容器 react-redux 提供 connect 的方法链接React组件和Redux 类

<h3>Redux流程</h3>

**同步Reducer**

- 用户在`view`上发起一个`action`
- 当到`Reducer`时把原来`state`拿过来合成新`state`

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/flux06.gif"></p>

**异步Reducer**

- 用户在`view`上发起一个`action`
- 同步的先到`Reducer`时把原来`state`拿过来合成新`state`
- 如果有异步的通过`Middlewars`进入`API`，等执行完在到`Reducer`时把原来`state`拿过来合成新`state`

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/flux07.gif"></p>