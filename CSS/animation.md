# animation
标签（空格分隔）： Notes

---
https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#animation-fill-mode
<p>动画会覆盖所有常规规则，但会被`!important`规则覆盖。</p>
<p>如果在某个时间点有多个动画指定同一属性的行为，则动画名称值中最后出现的动画将覆盖该点的其他动画。</p>
<p><code>&lt;single-animation&gt;</code> = <code>&lt;animation-duration&gt;</code> || <code>&lt;timing-function&gt;</code> || <code>&lt;animation-iteration-count&gt;</code> || <code>&lt;animation-direction&gt;</code> || <code>&lt;animation-fill-mode&gt;</code> || <code>&lt;animation-play-state&gt;</code> || [none | <code>&lt;keyframes-name&gt;</code>]</p>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/animation-fill-mode.png" /></p>
<table>
  <tr>
    <th>属性</th>
    <th>值</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>animation-name</td>
    <td>none|&lt;keyframes-name&gt;</td>
    <td>动画名</td>
  </tr>
  <tr>
    <td>animation-duration</td>
    <td>&lt;time&gt;</td>
    <td>动画持续时间</td>
  </tr>
  <tr>
    <td>animation-timing-function</td>
    <td><a href="https://www.w3.org/TR/css-easing-1/#cubic-bezier-timing-functions">&lt;timing-function&gt;</a></td>
    <td>动画定时功能</td>
  </tr>
  <tr>
    <td>animation-iteration-count</td>
    <td>infinite | number</td>
    <td>动画迭代计数</td>
  </tr>
  <tr>
    <td>animation-direction</td>
    <td>&lt;single-animation-direction&gt;</td>
    <td>动画方向</td>
  </tr>
  <tr>
    <td>animation-play-state</td>
    <td>running | paused</td>
    <td>动画播放状态</td>
  </tr>
  <tr>
    <td>animation-delay</td>
    <td>&lt;time&gt;</td>
    <td>动画延迟</td>
  </tr>
  <tr>
    <td>animation-fill-mode</td>
    <td>&lt;single-animation-fill-mode&gt;</td>
    <td>动画填充模式</td>
  </tr>
</table>

- `<single-animation-direction>` = normal | reverse | alternate | alternate-reverse
    - `normal`: 动画的所有迭代都按指定的方式播放
    - `reverse`: 动画的所有迭代都已与指定方向相反的方向播放
    - `alternate`: 奇数计数的动画循环迭代在正常方向播放,并且偶数计数的动画循环迭代以反方向播放
    - `alternate-reverse`: 作为奇数计数的动画循环迭代在反方向播放,并且偶数计数的动画循环迭代以正常方向播放
    - 注意: 为了确定迭代是偶数还是奇数,迭代从1开始计数
    <br/>
- `<single-animation-fill-mode>` = none | forwards | backwards | both
    - `none`: 应用未执行时，动画无效。
    - `forwards`: 在动画结束后(由其 'animation-iteration-count'),动画将在动画结束时应用属性值.
        - 当 'animation-iteration-count' 是一个大于0的整数时,应用的值将是动画最后一次完成迭代结束时的值<sup>(<a href="#forwards1">forwards1</a>)</sup>(而不是下一次迭代开始的值).当 'animanimation-iteration-count' 是0, 状态为0%的时候<sup>(<a href="#forwards2">forwards2</a>)</sup>
    - `backwards`: 在 'animation-delay' 定义的时间段内, 动画将应用在关键帧中定义的属性值, 这将启动动画的第一次迭代<sup>(<a href="#backwards1">backwards1</a>)</sup>. 以及 'animation-derection'不同值的时候的效果<sup>(<a href="#backwards2">backwards2</a>)</sup>
    - `both`: 'forwards' 和 'backwards' 填充的效果都适用

<h3 id="forwards1">forwards1</h3>
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/animation-fill-mode%7Bforwards1%7D.gif" />

```javascript
###forwards1
<style>
    button { margin: 50px 20px; text-align: center; }

    .ball {
        width: 200px;
        height: 200px;
        background: red;
        border-radius: 50%;
        transform: translateX(100px);
    }
    .doAnim:nth-of-type(1) { animation: myAnim1 2s 0s; }
    .doAnim:nth-of-type(2) { animation: myAnim2 2s 0s forwards; }
    @keyframes myAnim1 {
        0% {
            transform: translateX(0);
            background-color: blue;
        }
        100% {
            background-color: pink;
            transform: translateX(500px) scale(.5);
        }
    }
    @keyframes myAnim2 {
        0% {
            transform: translateX(0);
            background-color: blue;
        }
        100% {
            background-color: pink;
            transform: translateX(500px) scale(.5);
        }
    }
</style>
<div class="ball"></div>
<div class="ball"></div>
<button>start</button>
<button>reset</button>
<script>
    var start = document.querySelectorAll('button')[0],
        reset = document.querySelectorAll('button')[1],
        ball = document.querySelectorAll('.ball');

    start.addEventListener('click', function () {
        ball.forEach((cur) => {
            cur.classList.add('doAnim');
        });
    }, false);

    reset.addEventListener('click', function () {
        ball.forEach((cur) => {
            cur.classList.remove('doAnim');
        });
        
    }, false);
</script>
```

<h3 id="forwards2">forwards2</h3>
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/animation-fill-mode%7Bforwards2%7D.gif" />

```javascript
###forwards2
<style>
    button { margin: 50px 20px; text-align: center; }

    .ball {
        width: 200px;
        height: 200px;
        background: red;
        border-radius: 50%;
        transform: translateX(100px);
    }
    .doAnim:nth-of-type(1) { animation: myAnim1 2s 0s 0; }
    .doAnim:nth-of-type(2) { animation: myAnim2 2s 0s 0 forwards; }
    @keyframes myAnim1 {
        0% {
            transform: translateX(0);
            background-color: blue;
        }
        100% {
            background-color: pink;
            transform: translateX(500px) scale(.5);
        }
    }
    @keyframes myAnim2 {
        0% {
            transform: translateX(0);
            background-color: blue;
        }
        100% {
            background-color: pink;
            transform: translateX(500px) scale(.5);
        }
    }
</style>
<div class="ball"></div>
<div class="ball"></div>
<button>start</button>
<button>reset</button>
<script>
    var start = document.querySelectorAll('button')[0],
        reset = document.querySelectorAll('button')[1],
        ball = document.querySelectorAll('.ball');

    start.addEventListener('click', function () {
        ball.forEach((cur) => {
            cur.classList.add('doAnim');
        });
    }, false);

    reset.addEventListener('click', function () {
        ball.forEach((cur) => {
            cur.classList.remove('doAnim');
        });
        
    }, false);
</script>
```

<h3 id="backwards1">backwards1</h3>
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/animation-fill-mode%7Bbackwards1%7D.gif" />

```javascript
<style>
    button { margin: 50px 20px; text-align: center; }

    .ball {
        width: 100px;
        height: 100px;
        background: red;
        border-radius: 50%;
        transform: translateX(100px);
    }
    .doAnim:nth-of-type(1) { animation: myAnim1 2s 1s; }
    .doAnim:nth-of-type(2) { animation: myAnim2 2s 1s backwards; }
    @keyframes myAnim1 {
        0% {
            transform: translateX(0);
            background-color: blue;
        }
        100% {
            background-color: pink;
            transform: translateX(500px) scale(.5);
        }
    }
    @keyframes myAnim2 {
        0% {
            transform: translateX(0);
            background-color: blue;
        }
        100% {
            background-color: pink;
            transform: translateX(500px) scale(.5);
        }
    }
</style>
<div class="ball"></div>
<div class="ball"></div>
<button>start</button>
<button>reset</button>
<script>
    var start = document.querySelectorAll('button')[0],
        reset = document.querySelectorAll('button')[1],
        ball = document.querySelectorAll('.ball');

    start.addEventListener('click', function () {
        ball.forEach((cur) => {
            cur.classList.add('doAnim');
        });
    }, false);

    reset.addEventListener('click', function () {
        ball.forEach((cur) => {
            cur.classList.remove('doAnim');
        });
        
    }, false);
</script>
```

<h3 id="backwards2">backwards2</h3>
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/animation-fill-mode%7Bbackwards2%7D.gif" />

```javascript
<style>
    button { margin: 50px 20px; text-align: center; }

    .ball {
        width: 100px;
        height: 100px;
        background: red;
        border-radius: 50%;
        transform: translateX(100px);
    }
    .doAnim:nth-of-type(1) { animation: myAnim1 2s 1s 2 alternate; }
    .doAnim:nth-of-type(2) { animation: myAnim2 2s 1s 2 backwards alternate; }
    @keyframes myAnim1 {
        0% {
            transform: translateX(0);
            background-color: blue;
        }
        100% {
            background-color: pink;
            transform: translateX(500px) scale(.5);
        }
    }
    @keyframes myAnim2 {
        0% {
            transform: translateX(0);
            background-color: blue;
        }
        100% {
            background-color: pink;
            transform: translateX(500px) scale(.5);
        }
    }
</style>
<div class="ball"></div>
<div class="ball"></div>
<button>start</button>
<button>reset</button>
<script>
    var start = document.querySelectorAll('button')[0],
        reset = document.querySelectorAll('button')[1],
        ball = document.querySelectorAll('.ball');

    start.addEventListener('click', function () {
        ball.forEach((cur) => {
            cur.classList.add('doAnim');
        });
    }, false);

    reset.addEventListener('click', function () {
        ball.forEach((cur) => {
            cur.classList.remove('doAnim');
        });
        
    }, false);
</script>
```