# hooks

标签（空格分隔）： React

---

<h2>memo</h2>

父组件的`state`变化会导致子组件的的持续更新

```javascript
import React, { memo, useState } from 'react';

const Counter = props => {
  console.log('组件渲染');
  return <h1>{props.data}</h1>
}

function App() {
  const [count, setCount] = useState(1);
  const data = '京城一灯';
  return (
    <>
      <span>{count}</span>
      <input
        type="button"
        onClick={() => setCount(count + 1)}
        value="修改count" />
        <Counter />
    </>
  )
}
```

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/react-hooks__memo01.gif"></p>

解决上面的问题就会用到`memo`

```javascript
const Counter = memo(props => {
  console.log('子组件渲染')
  return <h1>{props.data}</h1>
});

function App() {
  const [count, setCount] = useState(1);
  console.log('父组件渲染');
  return (
    <>
      <span>{count}</span>
      <input
        type="button"
        onClick={() => setCount(count + 1)}
        value="修改count" />
      <Counter />
    </>
  )
}
```

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/react-hooks__memo02.gif"></p>

<hr/>
<h2>useMemo</h2>

基本使用

```javascript
import React, {memo, useMemo, useState } from 'react';
const Counter = memo(props => {
  console.log('组件渲染');
  return <h1>{props.data}</h1>
});

function App() {
  const [count, setCount] = useState(0);
  const double = useMemo(() => {
    return count * 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count === 3]);

  const data = '京城一灯';
  return (
    <>
    <span>{double}</span>
    <input
      type="button"
      onClick={() => setCount(count + 1)}
      value="修改count"/>
      <Counter data={data} />
    </>
  )
}
```

上面例子，只有等到`count===3`才会作用。
`[count]`会随着`count`更新调用函数`() => {return count*2}`。
`[]`只会在mount和unmount上执行一次，这里永远显示`0`

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/react-hooks__useMemo01.gif"></p>

<hr/>
<h2>useCallback</h2>

下面子组件上带了个持续变化的fn`<Counter onClick={onClick} />`，这样又会导致父组件的`state`变化会导致子组件的的持续更新。解决办法有下面 **效果1 2 3**

```javascript
import React, { memo, useEffect, useCallback, useMemo, useState } from 'react';

const Counter = memo(props => {
  console.log('子组件渲染')
  return <h1 onClick={props.onClick}>1</h1>
});
// 效果1
// const onClick = () => {
//   console.log("Click");
// };
function App() {
  // 原始地址，❌
  // const onClick = () => {
  //   console.log("Click");
  // };
  // const onClick = useEffect(() => {
  //   console.log('父组件副作用')
  // })
  // 效果2
  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log("Click");
  //   };
  // }, []);
  // 效果3
  const onClick = useCallback(() => {
    console.log("Click");
  }, []);
  console.log('父组件渲染')
  const [count, setCount] = useState(0);

  return (
    <>
    <span>{count}</span>
    <input
      type="button"
      onClick={() => setCount(count + 1)}
      value="修改count"/>
      <Counter onClick={onClick} />
    </>
  )
}
```

<hr/>
<h2>useRef</h2>

<h3>基本使用</h3>

```javascript
function TExtInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```

<hr/>
<h2>useImperativeHandle</h2>

<h3>基本用法</h3>

```javascript
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />;
}

FancyInput = forwardRef(FancyInput);

// const FancyInput = forwardRef((props, ref) => {
//   const inputRef = useRef();
//   useImperativeHandle(ref, () => ({
//     focus: () => {
//       inputRef.current.focus();
//     }
//   }));
//   return <input ref={inputRef} />;
// });


export function App() {
  const ref = useRef();

  useEffect(() => {
    console.log('component update');
    ref.current.focus();
    return () => {
      console.log('unbind')
    }
  }, []);

  return (
    <FancyInput ref={ref} />
  )
}
```
