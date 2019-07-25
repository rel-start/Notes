# PHP PDO

标签（空格分隔）： Notes

---

<h2>php pdo数据库操作</h2>

```php
<?php
header("Content-Type: text/json;charset=utf-8");
$dbms = 'mysql';     //数据库类型
$host = 'localhost'; //数据库主机名
$dbName = 'phplesson';    //使用的数据库
$user = 'root';      //数据库连接用户名
$pass = '';          //对应的密码
$dsn = "$dbms:host=$host;dbname=$dbName";

try {
  $dbh = new PDO($dsn, $user, $pass); //初始化一个PDO对象
  echo "连接成功<br/>";
  // foreach ($dbh->query("SELECT * from news") as $row) {
  //   print_r($row);
  // }

  $query = "INSERT INTO `news`(`newstitle`, `newsimg`, `newscontent`, `addtime`) VALUES ('aa','bb','cc','2019-4-4')";
  // 执行一条 SQL 语句，并返回受影响的行数
  $res = $dbh->exec($query);
  echo "数据库添加成功" . $res;
  $dbh = null;
} catch (PDOException $e) {
  die("Error!: " . $e->getMessage() . "<br/>");
}
?>
```




