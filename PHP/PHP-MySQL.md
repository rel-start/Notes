# PHP-MySQL

标签（空格分隔）： Notes

---

<h2>PHP 与 MySQL的简单应用</h2>

<i class="icon-file"></i> news.html
```html
<form action="mysql.php" method="post">
  <p><label>新闻标题: <input type="text" name="newstitle"></label></p>
  <p><label>新闻图片: <input type="text" name="newsimg"></label></p>
  <p><label>新闻内容: <textarea name="newscontent" id="" cols="30" rows="10"></textarea></label></p>
  <p><label>提交时间: <input type="date" name="addtime"></label></p>
  <p><input type="submit" value="提交"></p>
</form>
```

```php
<?php
// HTTP 报头
header("Content-Type: text/json;charset=utf-8");
// 连接数据库
$con = mysqli_connect("localhost", "root", "");

// 检测连接
if (!$con) {
  // 返回上一次连接错误的错误描述，并退出当前脚本
  die("Connection failed: " . mysqli_connect_error());
} else {
  // 更改连接的默认数据库
  mysqli_select_db($con, "phplesson");

  // 获取前台传过来的数据
  // $newstitle = $_REQUEST['newstitle'];
  // $newsimg = $_REQUEST['newsimg'];
  // $newscontent = $_REQUEST['newscontent'];
  // $addtime = $_REQUEST['addtime'];

  // 插入数据
  // $sql = "INSERT INTO `news`(`newstitle`, `newsimg`, `newscontent`, `addtime`) VALUES ('{$newstitle}','{$newsimg}','{$newscontent}','{$addtime}')";
  // 删除数据
  // $sql = "DELETE FROM `news` WHERE newsid = 4";
  // 更新数据
  // $sql = "UPDATE `news` SET `newstitle`='更改后的title',`newscontent`='更改后的内容' WHERE newsid = 2";
  $sql = "SELECT * FROM news";

  // 设置默认客户端字符集
  mysqli_set_charset($con, "utf8");
  // 执行查询
  $result = mysqli_query($con, $sql);
  /**
   * 接口数据
   */
  $arr = array();
  // 循环数组
  while ($row = mysqli_fetch_array($result)) {
    array_push($arr, array("newstitle" => $row['newstitle'], "newsimg" => $row['newsimg']));
  }
  $result = array("errcode" => 0, "result" => $arr);
  echo json_encode($result);

  if ($result) {
    // echo "success";
  } else {
    // 返回最近调用函数的最后一个错误描述，并退出当前脚本
    die("Error: " . mysqli_error($con));
  }
}


// 关闭数据库
mysqli_close($con);
?>
```




