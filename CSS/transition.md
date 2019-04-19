# transition
标签（空格分隔）： Notes

---

<p><code>&lt;single-transition&gt;</code> = [none || <code>&lt;single-transition-property&gt;</code>] || <code>&lt;time&gt;</code> || <code>&lt;timing-function&gt;</code> || &lt;time&gt;</p>

<table>
  <tr>
    <th>属性</th>
    <th>值</th>
    <th>初始</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>transition-property</td>
    <td>none|&lt;single-transition-property&gt;</td>
    <td>all</td>
    <td>过渡特性</td>
  </tr>
  <tr>
    <td>transition-duration</td>
    <td>time</td>
    <td>'0s'</td>
    <td>过渡时间</td>
  </tr>
  <tr>
    <td>transition-timing-function</td>
    <td><a href="https://www.w3.org/TR/css-easing-1/#typedef-timing-function">&lt;timing-function&gt;</a></td>
    <td>'ease'</td>
    <td>运动曲线</td>
  </tr>
  <tr>
    <td>transition-delay</td>
    <td>time</td>
    <td>'0s'</td>
    <td>过渡延迟<sup><a href="#delay">回弹也会有延迟</a></sup></td>
  </tr>
</table>

- `single-transition-property` = all | `<custom-indent>`
    - 值为 'none' 表示不会转换任何属性否则，给出要转换的属性列表，或者指示要转换所有属性的关键字 'all'。

<h3>同一个dom多个css属性变换</h3>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/transition-delay.gif" /></p>

```
<style>
    .box {  width: 100px; height: 100px; background-color: #f60; transition: width 1s .5s, height 1s 1s; }
    .box:hover { width: 300px; height: 300px; }
</style>
<div class="box"></div>
```