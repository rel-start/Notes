# 数据推送

标签（空格分隔）： Test

---

<h2>数据推送之Comet</h2>

**data.php**

```php
<?php
// header("Content-type:application/json;charset=utf-8");
// header("Cache-Control:max-age=0");
// sleep(1);
// $res = array("success" => "ok", "text" => "我是测试的文本");
// echo json_encode($res);

// 没有缓存实时输出
header("Cache-Control:max-age=0");
$i = 0;
while ($i<9) {
  $i++;
  sleep(1);
  // 随机数1～999
  $random = rand(1,999);
  echo $random;
  echo '<br/>';
  // 把当前资源释放掉
  ob_flush();
  // 吐资源
  flush();
}
?>
```

**index.html**

```html
<meta charset="utf-8">
<h1>hello</h1>
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script>
  // function conn() {
  //   $.ajax({
  //     url: 'data.php',
  //     dataType: 'json',
  //     success: function (data) {
  //       console.log(data)
  //       conn()
  //     }
  //   })
  // }

  // conn()

  var getXmlHttpRequest = function () {
    if (window.XMLHttpRequest) {
      // 主流浏览器提供了XMLHttpRequest对象
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // 低版本的IE浏览器没有提供XMLHttpRequest对象
      // 所以必须使用IE浏览器的特定实现ActiveXObject
      return new ActiveXObject("Microsoft.XMLHTTP");
    }

  }
  var xhr = getXmlHttpRequest();
  xhr.onreadystatechange = function () {
    console.log(xhr.readyState)
    if (xhr.readyState == 3 && xhr.status == 200) {
      // 获取成功后的执行操作
      // 数据在xhr.responseText
      console.log(xhr.responseText)
    }
  }

  xhr.open("get", "data.php", true);
  xhr.send("")
</script>
```

<h2>数据推送之SSE</h2>

**data.php**

```php
<?php
header("Content-Type:text/event-stream;charset=utf-8");
header("Access-Control-Allow-Origin:http://127.0.0.1:801");

echo "data:现在北京时间是".date("H:i:s")."\r\n\r\n";
?>
```

**index.js**

```javascript
var source;

function init(argument) {
  source = new EventSource('http://localhost:801/sse-demo/data.php');
  source.onopen = function(){
    console.log('链接已建立', this.readyState)
  }

  source.onmessage = function(event) {
    console.log('从服务器实时获取的数据', event.data);
  }

  source.onerror = function(){

  }
}

init();
```

**index.html**

```javascript
<meta charset="UTF-8">
<script src="index.js"></script>
```

<h2>数据推送之WebSocket</h2>

[socket.io](https://www.npmjs.com/package/socket.io)


<h2>node爬虫测试</h2>

request、cheerio库

```javascript
const express = require('express')
const app = express()
const request = require('request');
const cheerio = require('cheerio');

// robots.txt
// http://www.jikexueyuan.com/robots.txt

app.get('/', (req, res) => {
  request('http://www.jikexueyuan.com/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // 当前的 $ 是拿到了整个BODY前端选择器
      const $ = cheerio.load(body);
      res.json({
        'Classnum': $('.aside-cList>li>div>a').text()
      });
    }
  });
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
```



