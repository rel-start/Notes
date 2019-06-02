# PHP advanced

标签（空格分隔）： Notes

---
[TOC]
<a href="https://www.runoob.com/php/php-sessions.html">没看完</a>

<h2>PHP Session</h2>
<p><code>Session</code> 的工作机制是：为每个访客创建一个唯一的 <code>id</code> <code>(UID)</code>，并基于这个 <code>UID</code> 来存储变量。<code>UID</code> 存储在 <code>cookie</code> 中，或者通过 <code>URL</code> 进行传导。</p>

<h3>存储 Session 变量</h3>

```php
<?php
session_start();

if(isset($_SESSION['views']))
{
    $_SESSION['views']=$_SESSION['views']+1;
}
else
{
    $_SESSION['views']=1;
}
echo "浏览量：". $_SESSION['views'];
?>
```
<p>在上面的实例中，我们创建了一个简单的 <code>page-view</code> 计数器。<code>isset()</code> 函数检测是否已设置 <code>"views"</code> 变量。如果已设置 <code>"views"</code> 变量，我们累加计数器。如果 <code>"views"</code> 不存在，则创建 <code>"views"</code> 变量，并把它设置为 <code>1</code>：</p>

<h3>销毁 Session</h3>
<p>如果您希望删除某些 <code>session</code> 数据，可以使用 <code>unset()</code> 或 <code>session_destroy()</code> 函数。</p>
<p><code>unset()</code> 函数用于释放指定的 <code>session</code> 变量：</p>

```php
<?php
session_start();
if(isset($_SESSION['views']))
{
    unset($_SESSION['views']);
}
?>
```

<p>您也可以通过调用 <code>session_destroy()</code> 函数彻底销毁 <code>session</code><sup>不懂</sup>：</p>

```php
<?php
session_destroy();
?>
```