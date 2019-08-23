# Redux原理

标签（空格分隔）： React

---

<h2>Redux分析</h2>

1. [范畴论](https://github.com/rel-start/Notes/blob/master/ECMAScript/JS%20Functional%20Programming.md) 世界对象和对象之间的关系
 - container -> store
 - __value => currentState
 - f => action
 - map => currentReducer
 - IO函子 => middleware
2. redux源码组成
 - appliMiddleware.js => redux管理中间件
 - bindActionCreators.js => 能让我们直接的调用action
 - combineReducers.js => 合并reducer
 - compose.js => 组合函数
 - createStore.js => 创建一个store容器
 - index.js
 - untils
3. react纯函数


<h2>Redux源码</h2>

**第一部分实现**

- combineReducers.js
- createStore.js

**目录结构**

    reduxdemo
      |- reducers
        |- counterReducer.js
        |- index.js
        |- infoReducer.js
      |- redux
        |- combineReducers.js
        |- createStore.js
        |- index.js
      |- index.html
      |- index.js

<h3>源码文件</h3>

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script type="module" src="./index.js"></script>
</body>
</html>
```

需要浏览器支持`type="module"`，[http-server](https://www.npmjs.com/package/http-server)启动

`index.js`

用来测试我们实现的redux源码

```javascript
import { createStore } from './redux/index.js';
import { reducer } from './reducers/index.js';

// let initState = {
//   counter: {
//     count: 0
//   },
//   info: {
//     name: '',
//     description: ''
//   }
// }

const store = createStore(reducer);
console.log('取当前的默认状态', store.getState())

store.subscribe(() => {
  let state = store.getState();
  console.log('🚗当前状态', store.getState());
});

store.dispatch({
  type: 'INCREMENT'
})

setTimeout(function() {
  store.dispatch({
    type: 'SET_NAME',
    name: '京城'
  })
}, 2000)
```

`redux/combineReducers.js`

用来合并所有的reducer

```javascript
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  // reducer必然的接受 state action
  return function combination(state = {}, action) {
    // 生成一个新的state
    const nextState = {};
    for (let item of reducerKeys) {
      const reducer = reducers[item];
      const previousStateForKey = state[item];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[item] = nextStateForKey;
    }

    return nextState;
  }
}
```

`redux/createStore.js`

```javascript
export function createStore(reducer, initState) {
  let state = initState;
  let listeners = [];

  // 获取状态
  function getState() {
    return state;
  }

  // 订阅 fun 在reducer之后运行
  function subscribe(listener) {
    listeners.push(listener);
  }

  // 派发action
  function dispatch(action) {
    state = reducer(state, action);

    for (let listener of listeners) {
      listener();
    }
  }

  dispatch({type: Symbol()})

  return {
    getState,
    subscribe,
    dispatch
  }
}
```

`redux/index.js`

```javascript
import {createStore} from './createStore.js';
import {combineReducers} from './combineReducers.js';

export {
  createStore,
  combineReducers
}
```

`reducers/index.js`

```javascript
import { counterReducer } from './counterReducer.js';
import { infoReducer } from './infoReducer.js';
import { combineReducers } from '../redux/combineReducers.js';

export const reducer = combineReducers({
  counter: counterReducer,
  info: infoReducer
})
```

`reducers/infoReducer.js`

```javascript
let initState = {
  name: '老袁',
  description: 'aaa'
}

export function infoReducer(state, action) {
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.name
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.description
      };
    default:
      return state;
  }
}
```

`reducers/counterReducer.js`

```javascript
let initState = {
  count: 2
}

export function counterReducer(state, action) {
  if (!state) {
    state = initState;
  }

  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}
```