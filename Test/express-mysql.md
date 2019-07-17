# express-mysql

标签（空格分隔）： Test

---

一个`node`操作`mysql`小案例


**案例的目录结构**

    express-mysql.demo
      |- public
        |- scripts
          |- index.js
        |- stylesheets
      |- views
        |- index.html
        |- layout.html
      |- app.js
      |- package.json
      
<h3>起步</h3>

```javascript
# npm init -y
# npm install express swig-templates --save-dev
```

**新建一个`app.js`，初始内容如下**

```javascript
const express = require('express');
const app = express();
const swig = require('swig-templates');
app.use(express.static('public'))

// 配合swig(http://node-swig.github.io/swig-templates/docs/#express)
app.set('view engine', 'html')
app.set('views', __dirname + '/views');
app.engine('html', swig.renderFile)

// 配置路由
app.get('/', (req, res, next) => {
  res.render('index', {
    title: '第一个Express小程序'
  });
})

// 容错机制
app.get('*', (req, res, next) => {
  res.status(404);
  res.send('404');
})
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('服务器错误');
})

app.listen(3000, () => {
  console.log('服务已启动')
});
```

上面是一个简单的`node`服务，带一些简单的错误处理机制。其他页面如下

<h3>开始实现</h3>

`views/layout.html`页面中我引入了 bootstrap3.css 以及 jquery

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>{% block title %}My Site{% endblock %}</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
  {% block head %}
  {% endblock %}
</head>

<body>
  {% block content %}{% endblock %}

  <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
  {% block scripts %}
  {% endblock %}
</body>

</html>
```

`views/index.html`页面继承自layout.html，内容是引用bootstrap3。并设置了 `id="username"` 等

```html
{% extends './layout.html' %}

{% block title %}{{ title }}{% endblock %}

{% block content %}
<form class="form-horizontal">
  <div class="form-group">
    <label for="username" class="col-sm-2 control-label">用户名</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="username" placeholder="请输入用户名">
    </div>
  </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" id="btnsubmit" class="btn btn-default">提交</button>
    </div>
  </div>
</form>
{% endblock %}

{% block scripts %}
<script src="/scripts/index.js"></script>
{% endblock %}
```

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/express-node01.png"></p>

<h3>前端发送请求</h3>

`public/scripts/index.js`页面

该页面当点击`提交`按钮，通过`ajax`将`#username`的内容发给`node`

```javascript
$(function () {
  $('#btnsubmit').click(function (event) {
    event.preventDefault()

    $.ajax({
      url: 'receive',
      type: 'get',
      dataType: 'json',
      data: {
        username: $('#username').val()
      },
      success: function(data) {
        alert(data.msg)
      },
      error: function(){
        console.log('error')
      }
    });
  });
});
```

<h3>后台给予反馈(node)</h3>

主要是连接`mysql`存储数据，并反馈。这里用了[mysql](https://www.npmjs.com/package/mysql)包，也可以用`orm`

```javascript
...
// 配合swig
app.set('view engine', 'html')
app.set('views', __dirname + '/views');
app.engine('html', swig.renderFile)
app.engine('html', swig.renderFile)

// 设置mysql。orm也是一个操作数据库的包
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'yii2basic'
});

connection.connect();

// 配置路由
app.get('/', (req, res, next) => {
  res.render('index', {
    title: '第一个Express小程序'
  });
})

app.get('/receive', (req, res, next) => {
  console.log('前台发来的数据', req.query.username)
  const post = {
    username: req.query.username
  }

  connection.query('INSERT INTO t_user SET ?', post, function (error, results, fields) {
    if (error) {

      res.json({
        success: 'no',
        msg: '插入数据失败'
      })

      connection.end();
    } else {
      res.json({
        success: 'ok',
        msg: '插入成功'
      })
      connection.end();
    }
  });

})
```