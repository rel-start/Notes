# Essential skills

标签（空格分隔）： Notes

---

<h2>双飞翼布局 - 以及同一行等高(假的等高)</h2>
<p>三栏布局, 中间的提前</p>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/sfy.png" /></p>

<h3>兼容性极好的双飞翼布局</h3>

```
<style>
    * { margin: 0; box-sizing: border-box; }
    .container { overflow: hidden; }
    .item { text-align: center; min-width: 200px; padding-bottom: 9999px; margin-bottom: -9999px; border: 3px dotted#fff; }
    .left { float: left; margin-left: -100%;  background: royalblue; }
    .right { float: left; margin-left: -200px; background: saddlebrown; }
    .middle { float: left; width: 100%; padding-left: 200px; padding-right: 200px; background: seagreen; }
</style>
<div class="container">
    <div class="middle item">
        middle
        <p>段落</p>
    </div>
    <div class="left item">left</div>
    <div class="right item">right</div>
</div>
这是后面的内容
```

<h3>flex实现双飞翼</h3>

```
<style>
    * { margin: 0; box-sizing: border-box; }
    .container { display: flex; }
    .item { border: 1px dashed; }
    .middle { flex-grow: 1; order: 2; }
    .left { order: 1; }
    .right { order: 3; }
</style>
<div class="container">
    <div class="middle item">
        middle
        <p>段落</p>
    </div>
    <div class="left item">left</div>
    <div class="right item">right</div>
</div>
这是后面的内容
```

<h2>多行文字垂直居中(非flex)</h2>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/vertical-centering.png" /></p>

```
##box1
<style>
    .box1 { width: 500px; height: 300px; border: 1px solid;  text-align: center; }
    .box1 em { height: 100%; display: inline-block; vertical-align: middle; }
    .box1 span { display: inline-block; vertical-align: middle; }
</style>
<div class="box1"><em></em><span>很有艺术气息的休闲鞋<br>不免额材质舒适透气</span></div>

##box2
<style>
    .box2 { display: table-cell; width: 500px; height: 300px; border: 1px solid; vertical-align: middle; text-align: center; }
</style>
<div class="box2">
    <p>很有艺术气息的休闲鞋</p>
    <p>布面的材质舒适透气</p>
</div>

##box3
<style>
    .box3 { width: 500px; height: 300px; border: 1px solid; line-height: 300px; text-align: center; }
    .box3 span { display: inline-block; line-height: 20px; vertical-align: middle; }
</style>
<div class="box3">
    <span>很有艺术气息的休闲鞋<br>布面的材质舒适透气</span>
</div>
```

<h2>自适应排版 table-cell</h2>
<img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/self-adaption__table-cell.png" />

```
<style>
    .left { float: left; width: 100px; background-color: pink; }
    .right { float: right; width: 200px; background-color: burlywood; }
    .middle { display: table-cell; width: 2000px; background-color: coral; }
</style>
<div class="right">right</div>
<div class="left">left</div>
<div class="middle">middle</div>
```

<h2>IE6经典BUG</h2>
<p>请看当前目录下的CSS3常用核心技巧.pptx</p>

<h2>基于移动端的PX与REM转换兼容方案</h2>
<p>暂时没看</p>

<h2>flex伸缩盒</h2>
<p>相关连接:</p>

- http://www.w3cplus.com/css3/flexbox-layout-and-calculation.html
- http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

<p>注意，设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。</p>

<h3>容器属性:</h3>

- `flex-direction`: row | row-reverse | column | column-reverse;
    - row(默认值)：主轴为水平方向，起点在左端。
    - row-reverse：主轴为追评方向，起点在右端。
    - column：主轴为垂直方向，起点在上沿。
    - column-reverse：主轴为垂直方向，起点在下沿。
- `flex-wrap`: nowrap | wrap | wrap-reverse;
    - nowrap(默认值)：不换行。
    - wrap：换行，第一行在上方。
    - wrap-reverse：换行，第一行在下方。
- `flex-flow`: <flex-direction> || <flex-wrap>;
    - 属性是 flext-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap
- `justify-content`: flex-start | flex-end | center | space-between | space-around | space-evenly;
    - flex-start(默认值)：起始位置对齐
    - flex-end：结束位置对齐
    - center：居中
    - space-between：两端对齐，项目之间的间隔都相等
    - space-around：每个项目两侧的间隔相等。然而，项目之间的间隔比项目两端的间隔大一倍
    - space-evenly：项目两侧的间隔相等。
- `align-items`: flex-start | flex-end | center | baseline | stretch;
    - flex-start：交叉轴的起点对齐。(设置了高度会默认以这个对齐)
    - flex-end：交叉轴的终点对齐。
    - center：交叉轴的中点对齐。
    - baseline：项目的第一行文字的基线对齐。
    - stretch(默认值)：如果项目为设置高度或设为auto，将占满整个容器的高度。
- `align-content`: flex-start | flex-end | center | space-between | space-aroundd | space-evenly | stretch;
    - flex-start：与交叉轴的起点对齐。
    - flex-end：与交叉轴的终点对齐。
    - center：与交叉轴的中点对齐。
    - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
    - space-around：每根轴线两侧的间隔都相等。然而，轴线之间的间隔比轴线两侧间隔大一倍。
    - space-evenly：轴线两侧间隔都相等。
    - stretch(默认值)：轴线占满整个交叉轴。

<h3>容器属性:</h3>

- `order`: 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- `flex-grow`
    - 属性定义项目的放大比例，（默认为0），即如果存在剩余空间，也不放大。 
    - 如果所有项目的 `flex-grow` 属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的 `flex-grow` 属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
- `flex-shrink`
    - 属性定义了项目的缩小比例，（默认为1），即如果空间不足，该项目将缩小。
    - 当空间不足时，都将等比例缩小。如果一个项目的 `flex-shrink` 属性为0，其他项目都为1，则空间不足时，前者不缩小
- `flex-basis`: number | auto(默认) | initial | inherit;
    - flex-basis: 非auto; 的优先级比 width[height]高。比 min-width[height] 或者 max-width[height] 低
- `flex`: none | [ <flex-grow> <flex-shrink>? || <flex-basis> ]。 默认值为 0 1 auto。后两个属性可选
    - 该属性有两个快捷值：auto（1 1 auto）和 none（0 0 auto）
    - flex: 1;		相当于 1 1 0%;
    - flex: auto;		相当于 1 1 auto; 好像跟上面一样
    - flex: none;		相当于 0 0 auto; 清除吧
- `align-self`: auto | flex-start | flex-end | center | baseline | stretch

<h2>Reset的选择</h2>

- *的杀伤力太大!!!
- Reset.css 重置 Normalize.css修复 Neat.css融合<sup>(当前目录下有)</sup>
- html{box-sizing: border-box;} *,*:before,X:after{box-sizing: inherit;}<sup>(移动端都要以怪异盒模型排版)</sup>

<h2>ICON-FONT与常用字体排版</h2>
纯css实现图标: <a href="http://cssicon.space/#/">CSS ICON</a>

- no-image时代 不超过纯色为2的图像
- 宋体非宋体 黑体非黑体 WIndows下的宋体叫中易宋体SimSun，Mac是华文宋体STSong。WIndows下的黑体叫中易黑体SimHei，Mac是华文黑体STHeiti。
- 不要只写中文字体名，保证西文字体在中文字体前面。Mac->Linux->Windows
- 切忌不要直接使用设计师PSD的设计font-family,关键时刻再去启动font-face（typo.css 、 Entry.css 、Type.css ）
- font-family: sans-serif;系统默认，字体多个单词组成加引号。

<h3>有关设计的JS</h3>

- underline.js
- responsify.js
- typedetail.com
- cssicon.space
- designresearch.space

<h2>CSS代码检测团队项目规范</h2>
<h3>CSS HINT <sup>& <a href="http://csslint.net/">css Lint</a></sup></h3>

1. 不要使用多个class选择元素，如a.foo.boo，这在ie6及以下不能正确解析
2. 移除空的css规则，如a{}
3. 正确的使用显示属性，如display:inline不要和width，height，float，margin,padding同时使用，display:inline-block不要和float同时使用等
4. 避免过多的浮动，当浮动次数超过十次时，会显示警告
5. 避免使用过多的字号，当字号声明超过十种时，显示警告
6. 避免使用过多web字体，当使用超过五次时，显示警告
7. 避免使用id作为样式选择器
8. 标题元素只定义一次
9. 使用width:100%时要小心
10. 属性值为0时不要写单位
11. 各浏览器专属的css属性要有规范, 例如.foo{-moz-border-radius:5px;border-radius:5px}
12. 避免使用看起来像正则表达式的css3选择器
13. 遵守盒模型规则

<h2>CSS绘制高级技巧</h2>

1. <img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/css-jq01.png" />
2. <img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/css-jq02.png" />
3. <img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/css-jq03.png" />
4. <img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/css-jq04.png" />
5. <img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/css-jq05.png" />
6. <img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/css-jq06.png" />

<h2>BFC IFC GFC FFC<sup>具体看ppt</sup></h2>

<h3>哪些元素会生成BFC?</h3>

- 根元素
- float属性不为none
- position为absolute或fixed
- display为inline-block, table-cell, table-caption, flex, inline-flex
- overflow不为visible



