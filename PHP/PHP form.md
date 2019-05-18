# PHP form

标签（空格分隔）： Notes

---

<h2>PHP $_GET 变量</h2>

<p>在 PHP 中，预定义的 <code>$_GET</code> 变量用于收集来自 <code>method="get"</code> 的表单中的值。</p>

<i class="icon-file"></i> index.php
```html
<form action="a.php" method="get">
  <label>
    名字: 
    <input type="text" name="fname">
  </label>
  <label>
    年龄: 
    <input type="text" name="age">
  </label>
  <input type="submit" value="提交">
</form>
```

<i class="icon-file"></i> a.php
```php
<?php
  $fname = $_GET["fname"];
  $age = $_GET["age"];

  echo "欢迎: ".$fname."<br/>你的年龄是: ".$age;
?>
```

<h2>PHP $_POST 变量</h2>

<i class="icon-file"></i> index.php
```html
<form action="a.php" method="post">
  <label>
    名字: 
    <input type="text" name="fname">
  </label>
  <label>
    年龄: 
    <input type="text" name="age">
  </label>
  <input type="submit" value="提交">
</form>
```

<i class="icon-file"></i> a.php
```php
<?php
  $fname = $_POST["fname"];
  $age = $_POST["age"];

  echo "欢迎: ".$fname."<br/>你的年龄是: ".$age;
?>
```

<h2>PHP $_REQUEST 变量</h2>

预定义的 `$_REQUEST` 变量包含了 `$_GET`、`$_POST` 和 `$_COOKIE` 的内容。
<p><code>$_REQUEST</code> 变量可用来收集通过 <code>GET</code> 和 <code>POST</code> 方法发送的表单数据。</p>

```php
<?php
  $fname = $_REQUEST["fname"];
  $age = $_REQUEST["age"];

  echo "欢迎: ".$fname."<br/>你的年龄是: ".$age;
?>
```