# transform

标签（空格分隔）： Notes

---

<h2>2D/3D转换属性</h2>
<table>
  <tr>
    <th>属性</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>transform</td>
    <td>适用于2D或3D转换的元素。</td>
  </tr>
  <tr>
    <td>transform-origin</td>
    <td>允许您更改转化元素位置。<em>旋转基点</em></td>
  </tr>
  <tr>
    <td>transform-style</td>
    <td>3D空间中的指定如何嵌套元素。[ <code>flat</code>（所有子元素在2D平面呈现） | <code>preserve-3d</code>（3D呈现） ]</td>
  </tr>
  <tr>
    <td>perspective</td>
    <td>指定3D元素是如何查看透视图</td>
  </tr>
  <tr>
    <td>perspective-origin</td>
    <td>指定3D元素底部位置</td>
  </tr>
  <tr>
    <td>backface-visibility</td>
    <td>定义一个元素是否应该是可见的，不对着屏幕时。[ <code>visible</code>（默认） | <code>hidden</code> ] rotateY(90) 就到元素的背面。默认是可以看见的， 90°~270°都是在背面、如果设置这之间将看不到</td>
  </tr>
</table>

<p>transform的抖动问题：加上定位属性和z-index:1。或transform: translateZ(0)</p>

<h3>transform-origin: <small>x-axis y-axis z-axis</small></h3>
<table>
  <tr>
    <th>值</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>x-axis</td>
    <td>
        定义试图被置于X轴的何处。可能的值：
        <ul>
            <li>left center right</li>
            <li>length %</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>y-axis</td>
    <td>
        定义试图被置于Y轴的何处。可能的值：
        <ul>
            <li>top center bottom</li>
            <li>length %</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>z-axis</td>
    <td>
        定义视图被置于Z轴的何处。可能的是：
        <ul>
            <li>top center bottom</li>
            <li>length</li>
        </ul>
        http://www.runoob.com/try/try.php?filename=trycss3_transform-origin_3d_inuse 景深时看下效果
    </td>
  </tr>
</table>

<h3>transform</h3>
<table>
  <tr>
    <th>值</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>none</td>
    <td>定义不进行转换</td>
  </tr>
  <tr>
    <td>matrix(a,b,c,d,e,f)</td>
    <td>定义2D转换，使用6个值的矩阵</td>
  </tr>
  <tr>
    <td>translate(x, y)</td>
    <td>定义2D转换（好像可以代替 top left） <em>多个变换translate()最好写在最前面，transform-origin问题</em></td>
  </tr>
  <tr>
    <td>translate3d(x, y, z)</td>
    <td>定义3D转换。<mark>拆分（仅translateZ()感觉是屏幕到眼睛的这个轴）的是3D缩放</mark></td>
  </tr>
  <tr>
    <td>scale(x[, y]?)</td>
    <td>定义2D缩放转换。
        <ul>
            <li>scale(-1, 1) 自身水平翻转、似rotateX(180deg)</li>
            <li>scale(-1, -1)自身水平垂直翻转、似rotate(180deg)。</li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>scale3d(x, y, z)</td>
    <td>定义3D缩放。<mark>拆分（仅scaleZ）是3D缩放。scale(2) = scale3d(1, 1, 2);</mark></td>
  </tr>
  <tr>
    <td>rotate(angle)</td>
    <td>定义2D旋转，在参数中规定角度（1turn）</td>
  </tr>
  <tr>
    <td>rotate3d(x, y, z, angle)</td>
    <td>定义3D旋转。<mark>所有拆分（rotateX）的是3D旋转。rotateX(45deg) = rotate3d(1, 0, 0, 45deg)</mark></td>
  </tr>
  <tr>
    <td>skew(x-angle, y-angle)</td>
    <td>定义沿着X和Y轴的2D倾斜转换。<mark>拆分（skewX）的是2D倾斜</mark></td>
  </tr>
  <tr>
    <td>perspective(n)</td>
    <td>为3D转换元素定义透视视图</td>
  </tr>
</table>

<h4>3d轴</h4>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/3Daxis.png" /></p>

<h4>矩阵的基本计算</h4>

```javascript
<style>
.box {
  width: 200px;
  height: 200px;
  background-color: red;
  /* 偏移 */
  /*transform: matrix(1, 0, 0, 1, 100, 100);*/
  /* 缩放 */
  /*transform: matrix(2, 0, 0, 2, 100, 100);*/
  /* 旋转 */
  /*transform: matrix(0.866025, 0.5, -0.5,0.866025, 0, 0);*/
  /* 斜切 */
  transform: matrix(1, 0.700207, 0.700207, 1, 0, 0);
  /*transform: skewY(35deg);*/
}
</style>

<div class="box" id="box">
<script>
/*
  matrix(a, b, c, d, e, f);

  x' = ax + cy + e;
  y' = bx + dy + f;
*/

// 偏移
// x' = x + e;
// y' = y + f

// 缩放
// x' = ax;
// y' = dy;

// 顺时针旋转
// x' = cos(a)x - sin(c)y;
// y' = sin(b)x + cos(d)y;

// 逆时针旋转
// x' = cos(a)x + sin(c)y;
// y' = -sin(b)x + cos(d)y;

// 斜切
// x' = x + tan(c)y;
// y' = tan(b)x + y;

console.log(getComputedStyle(box).transform)
</script>
```

<h4>3D立方体</h4>

```
<style>
.main{
  perspective: 500px;
  float: left;
  margin: 200px 400px;
}
.box{
  width:200px;
  height:200px;
  position: relative;
  background: rgba(0,0,0,0.5);
  transition: 5s;
  transform-style: preserve-3d;
}
.box:hover{
  /*transform:translateZ(200px) rotateY(340deg) rotateX(200deg) rotateZ(120deg);*/
  transform: rotateX(200deg)
}
.item{
  width:100px;
  height:100px;
  position: absolute;
  left:50px;
  top:50px;
  font-size:30px;
  line-height: 100px;
  text-align: center;
  /*box-sizing: border-box;*/
  border:2px solid #000000;
  /*border-radius: 50%;*/
}
.item:nth-child(1){
  background-color:rgba(255,76,0,0.5); /*#ff4c00;*/
  transform: translateZ(-50px) rotateY(-90deg);
  transform-origin: left center;
}
.item:nth-child(2){
  background-color:rgba(11,95,165,0.5); /*#0b5fa5;*/
  transform: translateZ(-50px) rotateY(90deg);
  transform-origin: right center;
}
.item:nth-child(3){
  background-color:rgba(0,174,104,0.5); /*#00ae68;*/
  transform: translateZ(-50px);
}
.item:nth-child(4){
  background-color:rgba(255,231,0,0.5); /*#ffe700;*/
  transform: translateZ(-50px) rotateX(90deg);
  transform-origin: center top;
}
.item:nth-child(5){
  background-color:rgba(159,238,0,0.5);/* #9fee00;*/
  transform: translateZ(50px);
}
.item:nth-child(6){
  background-color: rgba(255,231,0,0.5);
  transform: translateZ(-50px) rotateX(-90deg);
  transform-origin: center bottom;
}
</style>
<div class="main">
  <div class="box">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
  </div>
</div>
```