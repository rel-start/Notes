# jQuery技术内幕

标签（空格分隔）： Notes

---
[TOC]

jquery中文文档：http://jquery.cuishifeng.cn/
jquery-1.12.4：https://code.jquery.com/jquery-1.12.4.js

<h2>jQuery的无new化</h2>

```javascript
(function (window, undefined) {
  // 这里的 undefined 是变量
  var eQuery = function (selector, context) {
    return new eQuery.fn.init(selector, context);
  }

  eQuery.fn = eQuery.prototype = {

  };

  var init = eQuery.fn.init = function( selector, context, root ) {

  }

  // jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype
  // $('a') 相当于面向对象 new 一个实例。
  // 应该是 jQuery 所有的方法挂在在 prototype 上，所以只需要 new，jQuery的实例 就相当于 new jQuery
  init.prototype = eQuery.fn;

  window.eQuery = window.$ = eQuery;

})(window);
```

<h2>jQuery.fn.extend 与 jQuery.extend</h2>

```javascript
jQuery.fn.extend({
  a: function(){
    console.log(123);
  }
});
$().a();  // 123

jQuery.extend({
  b: 13
});
jQuery.b; // 13
```
`jQuery.fn.extend` 绑定在原型上，需要实例来调用。而`jQuery.extend`绑在`jQuery`函数上。

<h2>链式调用</h2>
每个方法都返回个 `this`

```javascript
var s = {
  a: function () {
    console.log('first');
    return this;
  },
  b: function () {
    console.log('second');
    return this;
  }
}
s.a().b();
```

<h2>事件委托</h2>

```javascript
$('body').on('click', '.test',function(){
  console.log('test');
});
$('body').append('<div class="test">test</div>');

// 实例1
<table id="tb">
  <tr>
    <td></td>
  </tr>
</table>
<script>
function live(targetObject, type, fn) {  // 元素类型，事件类型，执行函数
  document.onclick = function (event) {
    var e = event ? event : window.event;
    addRow();

    // 解决浏览器兼容问题，e.srcElement IE，e.taraget FF
    var target = e.srcElement || e.target;
    console.log(target.tagName.toLocaleLowerCase(), targetObject);
    if (e.type == type && target.tagName.toLocaleLowerCase() === targetObject) {
      fn(); // 如果元素类型和事件类型同时匹配，则执行函数
    }
  }

  function addRow() {
    var x = document.getElementById("tb").insertRow(0);
    var y = x.insertCell(0);
    var z = x.insertCell(1);
    y.innerHTML = 'NEW CELL1';
    z.innerHTML = 'NEW CELL2';
  }
};

live("html", "click", function () {
  alert("live");
});
</script>
```

<h2>jq重载简单实现</h2>

```javascript
function addMethod(obj, name, f) {
  var old = obj[name];
  obj[name] = function () {
    if (f.length === arguments.length) {
      return f.apply(this, arguments);
    } else {
      return old.apply(this, arguments);
    }
  }
}

var people = {
  name: ['李四','王五']
};

var find0 = function () {
  return this.name;
}
var find1 = function (name) {
  var arr = this.name;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == name) {
      return arr[i] + '在' + i + '位';
    }
  }
}
var find2 = function (name,age) {
  console.log(age);
}
addMethod(people, 'find', find0);
addMethod(people, 'find', find1);
addMethod(people, 'find', find2);
// debugger;
console.log(people.find());

/**
 * 栈1：old undefined  obj.find->find0
 * 栈2：old find0      obj.find->find1
 *:栈3：old find1      obj.find->find2
 * 
 * 当调用 people.find() 时，也就是 find2 函数（也就是栈3），判断 f.length !== arguments.length。进入栈2，调用 find1 函数，判断 f.length !== arguments.length，在进入栈1，调用 find0 函数，成立！！
 */
```


<h2>短路运算符</h2>

```javascript
var a;
a && test();
function test(){
}

var b = 1;
b || test();
```

<h2>快速引用 js 原生方法<sup>未懂</sup></h2>

```javascript
var core_version = "1.19.2",
  core_Trim = core_version.trim;

var obj = {
  trim: function (data) {
    return core_Trim(data);
  }
}
console.log(obj.trim('   000  a'));

Object.prototype.toString.call([]);  // '[object Array]'
```

<h2>$().ready</h2>

```javascript
var _ = ready = window.ready = function (fn) {
  if (document.addEventListener) {// 兼容非IE
    document.addEventListener('DOMContentLoaded', function callee() {
      // 注销事件，避免反复触发
      document.removeEventListener("DOMContentLoaded", callee, false);
      fn(); // 调用参数函数
    });
  } else if (document.attachEvent) {// 兼容IE
    IEContentLoaded(window, fn);

    function IEContentLoaded(w, fn) {
      var d = w.document, done = false;
      init = function () {
        // only fire once
        if (!done) {
          done = true;
          fn();
        }

        // polling for no errors
        (function callee() {
          try {
            // throws errors until after ondocumentready
            d.documentElement.doScroll('left');
          } catch (e) {
            setTimeout(callee, 50);
            return;
          }
          // no errors, fire

          init();
        })();

        // trying to always fire before onload
        d.onreadystatechange = function () {
          if (d.readyState == 'complete') {
            d.onreadystatechange = null;
            init();
          }
        }
      }
    }
  }
}
ready(function () {
  alert(1)
})
```


