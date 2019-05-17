# Introduction to PHP

标签（空格分隔）： Notes

---
[TOC]

<h2>PHP变量</h2>
<h3>PHP 变量作用域</h3>
<p>PHP 有四种不同的变量作用域：</p>

- local
- global
- static
- parameter


<h3>局部和全局作用域</h3>
<p>在所有函数外部定义的变量，拥有全局作用域。除了函数外，全局变量可以被脚本中的任何部分访问，要在一个函数中访问一个全局变量，需要使用 <code>global</code> 关键字。</p>
<p>在 PHP 函数内部声明的变量是局部变量，仅能在函数内部访问：</p>

```php
<?php 
$x=5; // 全局变量 

function myTest() 
{ 
  $y=10; // 局部变量 
  echo "<p>测试函数内变量:<p>"; 
  echo "变量 x 为: $x"; // Undefined variable
  echo "<br>"; 
  echo "变量 y 为: $y"; 
}  

myTest(); 

echo "<p>测试函数外变量:<p>"; 
echo "变量 x 为: $x"; 
echo "<br>"; 
echo "变量 y 为: $y"; // Undefined variable
?>
```

<h3>PHP global 关键字</h3>
<p><code>global</code> 关键字用于函数内访问全局变量。</p>

```php
<?php
$x = 5;
$y = 10;

function myTest()
{
  global $x, $y;
  $y = $x + $y;
}

myTest();
echo $y; // 15
?>
```

<p>PHP 将所有全局变量存储在一个名为 <code>$GLOBALS[index]</code> 的数组中。 <code>index</code> 保存变量的名称。这个数组可以在函数内部访问，也可以直接用来更新全局变量。</p>

<p>上面的实例可以写成这样：</p>

```php
<?php
$x = 5;
$y = 10;

function myTest()
{
  $GLOBALS['y'] = $GLOBALS['x'] + $GLOBALS['y'];
}

myTest();
echo $y;
?>
```

<h3>Static 作用域</h3>
<p>当一个函数完成时，它的所有变量通常都会被删除。然而，有时候您希望某个局部变量不要被删除。</p>

<p>要做到这一点，请在您第一次声明变量时使用 <code>static</code> 关键字：</p>

```php
<?php
function myTest()
{
  static $x = 0;
  echo $x;
  $x++;
  echo PHP_EOL;
}

myTest();
myTest();
myTest();
?>
```
<p>然后，每次调用该函数时，该变量将会保留着函数前一次被调用时的值。</p>
<p><b>注释：</b>该变量仍然是函数的局部变量。</p>

<h3>参数作用域</h3>
<p>参数是通过调用代码将值传递给函数的局部变量。</p>
<p>参数是在参数列表中声明的，作为函数声明的一部分：</p>

```php
<?php
function myTest($x)
{
  echo $x;
}
myTest(5);
?>
```

<hr/>
<h2>PHP 5 echo 和 print 语句</h2>
<p>echo 和 print 区别:</p>

- echo - 可以输出一个或多个字符串
- print - 只允许输出一个字符串，返回值总为 1
- echo 输出的速度比 print 快， echo 没有返回值，print有返回值1。

```php
<?php
$txt1 = '学习 PHP';
$txt2 = 'TangYe';
$cars = array("Volvo","BMW","Toyota");

echo $txt1;
echo "<br>";
echo "在 $txt2 学习 PHP<br>";
// echo "<br>";
echo "我车的品牌是 {$cars[0]}";    

echo "这是一个", "字符串，", "使用了", "多个", "参数。";
print "这是一个", "字符串，", "使用了", "多个", "参数。";   // 报错
?>
```

<hr/>
<h2>PHP EOF(heredoc)</h2>
<p><a href="https://www.runoob.com/php/php-eof-heredoc.html">PHP EOF(heredoc)</a>是一种在命令行shell（如sh、csh、ksh、bash、PowerShell和zsh）和程序语言（像Perl、PHP、Python和Ruby）里定义一个字符串的方法。</p>

<hr/>
<h2>PHP 5 数据类型</h2>

- String（字符串）, Integer（整型）, Float（浮点型）, Boolean（布尔型）, Array（数组）, Object（对象）, NULL（空值）。

<h3>PHP 整型</h3>

- 整数必须至少有一个数字 (0-9)
- 整数不能包含逗号或空格
- 整数是没有小数点的
- 整数可以是正数或负数
- 整型可以用三种格式来指定：十进制， 十六进制（ 以 0x 为前缀）或八进制（前缀为 0）。

<p>PHP <code>var_dump()</code> 函数返回变量的数据类型和值：</p>

```php
<?php
$x = 5985;
var_dump($x);   // int(5985)
echo "<br>"; 
$x = -345; // 负数 
var_dump($x);   // int(-345)
echo "<br>"; 
$x = 0x8C; // 十六进制数
var_dump($x);   // int(140)
echo "<br>";
$x = 047; // 八进制数
var_dump($x);   // int(39)
?>
```

<h3>PHP 浮点型</h3>
<p>浮点数是带小数部分的数字，或是指数形式。</p>

```php
<?php 
$x = 10.365;
var_dump($x);   // float(10.365) 
echo "<br>"; 
$x = 2.4e3;
var_dump($x);   // float(2400) 
echo "<br>"; 
$x = 8E-5;
var_dump($x);   // float(8.0E-5)
?>
```

<h3>PHP 布尔型</h3>
<p>布尔型可以是 TRUE 或 FALSE。</p>

```php
<?php
$x=true;
var_dump($x);   // bool(true) 
echo '<br>';
$y=false;
var_dump($y);   // bool(false)
?>
```

<h3>PHP 数组</h3>

```php
<?php 
$cars=array("Volvo","BMW","Toyota");  // array(3) { [0]=> string(5) "Volvo" [1]=> string(3) "BMW" [2]=> string(6) "Toyota" }
var_dump($cars);
?>
```

<h3>PHP 对象<sup>没懂</sup></h3>
<p>你必须使用<code>class</code>关键字声明类对象。类是可以包含属性和方法的结构。</p>
<p>下面实例中PHP关键字<code>this</code>就是指向当前对象实例的指针，不指向任何其他对象或类。</p>

```php
class Car
{
  var $color;
  function __construct($color = "green")
  {
    $this->color = $color;
  }
  function what_color()
  {
    return $this->color;
  }
}

function print_vars($obj)
{
  foreach (get_object_vars($obj) as $prop => $val) {
    echo "\t$prop = $val\n";
  }
}

// 实例一个对象
$herbie = new Car("white");

// 显示 herbie 属性
echo "\therbie: Properties\n";
print_vars($herbie);
```

<h3>PHP NULL 值</h3>
<p>NULL 值表示变量没有值。NULL 是数据类型为 NULL 的值。</p>

<p>NULL 值指明一个变量是否为空值。 同样可用于数据空值和NULL值的区别。</p>

<p>可以通过设置变量值为 NULL 来清空变量数据：</p>

```php
<?php
$x="Hello world!";
$x=null;
var_dump($x);  // NULL
?>
```

<hr/>
<h2>PHP 5 常量</h2>
<p>设置常量，使用 define() 函数，函数语法如下：</p>

    bool define ( string $name , mixed $value [, bool $case_insensitive = false ] )
    
<p>该函数有三个参数:</p>

- name：必选参数，常量名称，即标志符。
- value：必选参数，常量的值。
- case_insensitive ：可选参数，如果设置为 TRUE，该常量则大小写不敏感。默认是大小写敏感的。

```php
<?php
// 区分大小写的常量名
define("GREETING", "欢迎访问 Runoob.com");
echo GREETING;    // 输出 "欢迎访问 Runoob.com"
echo '<br>';
echo greeting;   // 报错
?>
```

```php
<?php
// 不区分大小写的常量名
define("GREETING", "欢迎访问 Runoob.com", true);
echo greeting;  // 输出 "欢迎访问 Runoob.com"
?>
```

<h3>常量是全局的</h3>
<p>常量在定义后，默认是全局变量，可以在整个运行的脚本的任何地方使用。</p>

```php
<?php
define("GREETING", "欢迎访问 Runoob.com");
 
function myTest() {
    echo GREETING;
}
 
myTest();    // 输出 "欢迎访问 Runoob.com"
?>
```

<hr/>
<h2>PHP 字符串变量</h2>
<p>字符串变量用于存储并处理文本。</p>

<h3>PHP 并置运算符</h3>
<p>在 PHP 中，只有一个字符串运算符。</p>

<p>并置运算符 (<code>.</code>) 用于把两个字符串值连接起来。</p>

```php
<?php 
$txt1="Hello world!"; 
$txt2="What a nice day!"; 
echo $txt1 . " " . $txt2;  // Hello world! What a nice day!
?>
```

<h3>PHP strlen() 函数</h3>
<p><code>strlen()</code> 函数返回字符串的长度（字符数）。</p>

```php
<?php 
echo strlen("Hello world!");  // 12
?>
```

<h3>PHP strpos() 函数</h3>
<p><code>strpos()</code> 函数用于在字符串内查找一个字符或一段指定的文本。同 js 的<code>indexOf()</code></code></p>

```php
<?php 
echo strpos("Hello world!","world");   // 6
?>
```

<h3><a href="https://www.runoob.com/php/php-ref-string.html">完整的 PHP String 参考手册</a></h3>

<hr/>
<h2>PHP 运算符</h2>
<h3>PHP 算术运算符</h3>
<table>
<tr>
  <th>运算符</th>
  <th>名称</th>
  <th>描述</th>
  <th>实例</th>
  <th>结果</th>
</tr>
<tr>
  <td>-x</td>
  <td>取反</td>
  <td>x取反</td>
  <td>-2</td>
  <td>-2</td>
</tr>
<tr>
  <td>a . b</td>
  <td>并置</td>
  <td>连接两个字符串</td>
  <td>"Hi" . "Ha"</td>
  <td>HiHa</td>
</tr>
</table>

```php
<?php 
$x=10; 
echo "a." ".b";
echo -$x;  // -10

$txt1 = "Hello world!";
$txt2 = "What a nice day!";
echo $txt1 . " " . $txt2;
?>
```

<hr/>
<h2>PHP 数组</h2>
<p>数组能够在单个变量中存储多个值：</p>

```php
<?php
$cars=array("Volvo","BMW","Toyota");
echo "I like " . $cars[0] . ", " . $cars[1] . " and " . $cars[2] . ".";
?>
```

<p>在 PHP 中，有三种类型的数组：</p>

- 数值数组 - 带有数字 ID 键的数组
- 关联数组 - 带有指定的键的数组，每个键关联一个值
- 多维数组 - 包含一个或多个数组的数组

<h3>PHP 数值数组</h3>

    $cars=array("Volvo","BMW","Toyota");
    
<h4>获取数组的长度 - count() 函数</h4>

```php
<?php
$cars=array("Volvo","BMW","Toyota");
echo count($cars);
?>
```

<h4>遍历数值数组</h4>

```php
<?php
$cars=array("Volvo","BMW","Toyota");
$arrlength=count($cars);
 
for($x=0;$x<$arrlength;$x++)
{
  echo $cars[$x];
  echo "<br>";
}
?>
```

<h3>PHP 关联数组</h3>

    $age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
    
<p>实例</p>

```php
<?php
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
echo "Peter is " . $age['Peter'] . " years old.";
?>
```

<h3>遍历数值数组</h3>

```php
<?php
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
 
foreach($age as $x=>$x_value)
{
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```

<hr/>
<h2>PHP 超级全局变量</h2>
<p>PHP中预定义了几个超级全局变量（superglobals） ，这意味着它们在一个脚本的全部作用域中都可用。 你不需要特别说明，就可以在函数及类中使用。</p>
<h3>PHP $GLOBALS</h3>

<p><code>$GLOBALS</code> 是PHP的一个超级全局变量组，在一个PHP脚本的全部作用域中都可以访问。</p>

<p><code>$GLOBALS</code> 是一个包含了全部变量的全局组合数组。变量的名字就是数组的键。</p>

```php
<?php 
$x = 75; 
$y = 25;
 
function addition() 
{ 
  $GLOBALS['z'] = $GLOBALS['x'] + $GLOBALS['y']; 
}
 
addition(); 
echo $z;  // 100
?>
```

<p>以上实例中 <code>z</code> 是一个<code>$GLOBALS</code>数组中的超级全局变量，该变量同样可以在函数外访问。</p>

<h3>PHP $_SERVER</h3>

<p><code>$_SERVER</code> 是一个包含了诸如头信息(<code>header</code>)、路径(<code>path</code>)、以及脚本位置(<code>script locations</code>)等等信息的数组。这个数组中的项目由 Web 服务器创建。不能保证每个服务器都提供全部项目；服务器可能会忽略一些，或者提供一些没有在这里列举出来的项目。</p>

```php
<?php 
echo $_SERVER['PHP_SELF'];
echo "<br>";
?>
```

<h3>PHP $_REQUEST</h3>

<h3>PHP $_POST</h3>

<h3>PHP $_GET</h3>

<hr/>
<h2>PHP 面向对象</h2>

<h3>面向对象内容</h3>

- 类 - 定义了一件事物的抽象特点。类的定义包含了数据的形式以及对数据的操作。
- 对象 - 是类的实例。
- 成员变量 - 定义在类内部的变量。该变量的值对外是不可见的，但是可以通过成员函数访问，在类被实例化为对象后，该变量即可称为对象的属性。
- 成员函数 - 定义在类的内部，可用于访问对象的数据。
- 继承 - 继承性是子类自动共享父类数据结构和方法的机制，这是类之间的一种关系。在定义和实现一个类的时候，可以在一个已经存在的类的基础之上来进行，把这个已经存在的类所定义的内容作为自己的内容，并加入若干新的内容。
- 父类 - 一个类被其他类继承，可将该类称为父类，或基类，或超类。
- 子类 - 一个类继承其他类称为子类，也可称为派生类。
- 多态 - 多态性是指相同的函数或方法可作用于多种类型的对象上并获得不同的结果。不同的对象，收到同一消息可以产生不同的结果，这种现象称为多态性。
- 重载
- 抽象性
- 封装
- 构造函数 - 主要用来在创建对象时初始化对象， 即为对象成员变量赋初始值，总与new运算符一起使用在创建对象的语句中。
- 析构函数 - 析构函数(destructor) 与构造函数相反，当对象结束其生命周期时（例如对象所在的函数已调用完毕），系统自动执行析构函数。析构函数往往用来做"清理善后" 的工作（例如在建立对象时用new开辟了一片内存空间，应在退出前在析构函数中用delete释放）。

<p>类的变量使用 <code>var</code> 来声明, 变量也可以初始化值。</p>

```php
<?php 
class Site { 
  /* 成员变量 */ 
  var $url; 
  var $title; 
   
  /* 成员函数 */ 
  function setUrl($par){ 
     $this->url = $par; 
  } 
   
  function getUrl(){ 
     echo $this->url . PHP_EOL; 
  } 
   
  function setTitle($par){ 
     $this->title = $par; 
  } 
   
  function getTitle(){ 
     echo $this->title . PHP_EOL; 
  } 
} 

$runoob = new Site; 
$taobao = new Site; 
$google = new Site; 

// 调用成员函数，设置标题和URL 
$runoob->setTitle( "菜鸟教程" );

$runoob->setUrl( 'www.runoob.com' ); 

// 调用成员函数，获取标题和URL 
$runoob->getTitle();  // 菜鸟教程

$runoob->getUrl();  // www.runoob.com
?>
```

<h3>PHP 构造函数</h3>
<p>当new之后自定执行<code>construct</code>函数，现在我们就不需要再调用 <code>setTitle</code> 和 <code>setUrl</code> 方法了：</p>

```php
<?php
class Site
{
  function __construct($par1, $par2) {
    $this->url = $par1;
    $this->title = $par2;
  }

  function getUrl() {
    echo $this->url . PHP_EOL;
  }

  function getTitle() {
    echo $this->title . PHP_EOL;
  }
}

$runoob = new Site('www.baidu.com', '百度');
$runoob->getTitle();    // 百度
$runoob->getUrl();  // www.baidu.com
?>
```

<h3>析构函数</h3>
<p>析构函数(<code>destructor</code>) 与构造函数相反，当对象结束其生命周期时（例如对象所在的函数已调用完毕），系统自动执行析构函数。</p>

```php
<?php
class MyDestructableClass
{
  function __construct() {
    print "构造函数\n";
    $this->name = "MyDestructableClass";
  }

  function __destruct() {
    print "销毁 " . $this->name . "\n";
  }
}

$obj = new MyDestructableClass();
?>
```

<p>执行以上代码，输出结果为：</p>

    构造函数
    销毁 MyDestructableClass

<h3>继承</h3>
<p>PHP 使用关键字 <code>extends</code> 来继承一个类，PHP 不支持多继承，格式如下：</p>

```php
class Site
{
  var $category;
  function __construct($par1) {
    $this->category = $par1;
  }

  function getCate() {
    echo "getCate";
  }
}
class Child_Site extends Site
{
  function getCate() {
    echo $this->category . PHP_EOL;
  }
}

$c = new Child_Site('安安');
$c->getCate();
```
<p>上面代码中 <code>Child_Site</code> 类重写了 <code>getCate</code> 方法</p>

<h3>访问控制</h3>
<p>PHP 对属性或方法的访问控制，是通过在前面添加关键字 <code>public</code>（公有），<code>protected</code>（受保护）或 <code>private</code>（私有）来实现的。</p>

- public（公有）：公有的类成员可以在任何地方被访问。
- protected（受保护）：受保护的类成员则可以被其自身以及其子类和父类访问。
- private（私有）：私有的类成员则只能被其定义所在的类访问。

<h5>属性的访问控制</h5>
<p>类属性必须定义为公有，受保护，私有之一。如果用 <code>var</code> 定义，则被视为公有。</p>

```php
/**
 * Define MyClass
 */
class MyClass
{
  public $public = 'Public';
  protected $protected = 'Protected';
  private $private = 'Private';

  public function printHello()
  {
    echo $this->public . ' ';
    echo $this->protected . ' ';
    echo $this->private . ' ';
  }
}

$myclass = new MyClass();
echo $myclass->public;
echo $myclass->protected;  // 错误
echo $myclass->private;  // 错误
$myclass->printHello(); // Public Protected Private

/**
 * Define MyClass2
 */
class MyClass2 extends MyClass
{
  // public 和 protected 可以被继承，但 private 不能
  private $private = 'Private2';

  function printHello()
  {
    echo $this->public . ' ';
    echo $this->protected . ' ';
    echo $this->private . ' ';
  }
}

$myclass2 = new MyClass2();
echo $myclass2->public;
echo $myclass2->protected;  // 错误
echo $myclass2->private;  // 错误
$myclass2->printHello(); // Public Protected Private
```

<h4>方法的访问控制</h4>
<p>类中的方法可以被定义为公有，私有或受保护。如果没有设置这些关键字，则该方法默认为公有。</p>

```php
<?php
/**
 * Define MyClass
 */
class MyClass
{
  // 声明一个公有的构造函数
  public function __construct() { }

  // 声明一个公有的方法
  public function MyPublic() { }

  // 声明一个受保护的方法
  protected function MyProtected() { }

  // 声明一个私有的方法
  private function MyPrivate() { }

  // 此方法为公有
  function Foo() {
    $this->MyPublic();
    $this->MyProtected();
    $this->MyPrivate();
  }
}
$myclass = new MyClass();
$myclass->MyPublic(); // 正常执行
$myclass->MyProtected(); // 错误
$myclass->MyPrivate(); // 错误
$myclass->Foo();  // 公有，受保护，私有都可以执行


/**
 * Define MyClass2
 */
class MyClass2 extends MyClass
{
  // 此方法为公有
  function Foo2() {
    $this->MyPublic();
    $this->MyProtected();
    $this->MyPrivate(); // 报错
  }
}
$myclass2 = new MyClass2();
$myclass2->MyPublic(); // 正常执行
$myclass2->Foo2(); // 公有的和受保护的都可执行，但私有的不行
?>
```

<h4>接口</h4>
<p>使用接口（<code>interface</code>），可以指定某个类必须实现哪些方法，但不需要定义这些方法的具体内容。</p>
<p>接口是通过 <code>interface</code> 关键字来定义的，就像定义一个标准的类一样，但其中定义所有的方法都是空的。</p>
<p>接口中定义的所有方法都必须是公有，这是接口的特性。</p>
<p>要实现一个接口，使用 <code>implements</code></p> 操作符。类中必须实现接口中定义的所有方法，否则会报一个致命错误。类可以实现多个接口，用逗号来分隔多个接口的名称。</p>

```php
<?php
// 声明一个'iTemplate'接口
interface iTemplate
{
  public function setVariable($name, $var);
  public function getHtml($template);
}

// 实现接口
class Template implements iTemplate
{
  private $vars = array();
  
  public function setVariable($name, $var) {
    $this->vars[$name] = $var;
  }

  public function getHtml($template) {
    foreach ($this->vars as $name => $value) {
      $template = str_replace($name, $value, $template);
    }
    return $template;
  }
}

$arr = array("blue", "red", "green", "yellow");
$t = new Template();
$t->setVariable('blue', 'red');
$result = $t->getHtml($arr);
var_dump($result);
?>
```

<h4>常量</h4>
<p>可以把在类中始终保持不变的值定义为常量。在定义和使用常量的时候不需要使用 <code>$</code> 符号。</p>
<p>常量的值必须是一个定值，不能是变量，类属性，数学运算的结果或函数调用。</p>
<p>自 PHP 5.3.0 起，可以用一个变量来动态调用类。但该变量的值不能为关键字（如 <code>self</code>，<code>parent</code> 或 <code>static</code>）。</p>

```php
class MyClass
{
  const constant = '常量值';

  function showConstant()
  {
    echo self::constant . PHP_EOL;
  }
}

$myclass = new MyClass();
$myclass->showConstant();

$classname = "MyClass";
echo $classname::constant . PHP_EOL; // 自 5.3.0 起

echo MyClass::constant . PHP_EOL;

echo $myclass::constant . PHP_EOL; // 自 PHP 5.3.0 起
```

<h4>抽象类</h4>
<p>任何一个类，如果它里面至少有一个方法是被声明为抽象的，那么这个类就必须被声明为抽象的。</p>
<p>定义为抽象的类不能被实例化。</p>
<p>被定义为抽象的方法只是声明了其调用方式（参数），不能定义其具体的功能实现。</p>
<p>继承一个抽象类的时候，子类必须定义父类中的所有抽象方法；另外，这些方法的访问控制必须和父类中一样（或者更为宽松）。例如某个抽象方法被声明为受保护的，那么子类中实现的方法就应该声明为受保护的或者公有的，而不能定义为私有的。</p>

```php
<?php
abstract class AbstractClass
{
  // 强制要求子类定义这些方法
  abstract protected function getValue();
  abstract protected function prefixValue($prefix);

  // 普通方法（非抽象方法）
  public function printOut()
  {
    print $this->getValue() . PHP_EOL;
  }
}

class ConcreteClass1 extends AbstractClass
{
  protected function getValue()
  {
    return "ConcreteClass1";
  }
  public function prefixValue($prefix)
  {
    return "{$prefix}ConcreteClass1";
  }
}

class ConcreteClass2 extends AbstractClass
{
  protected function getValue()
  {
    return "ConcreteClass2";
  }
  public function prefixValue($prefix)
  {
    return "{$prefix}ConcreteClass2";
  }
}

$class1 = new ConcreteClass1;
$class1->printOut();
echo $class1->prefixValue('FOO_'),'<br/>';

$class2 = new ConcreteClass2;
$class2->printOut();
echo $class2->prefixValue('FOO_');
?>
```

<h4>Static 关键字</h4>
<p>声明类属性或方法为 <code>static</code>(静态)，就可以不实例化类而直接访问。</p>
<p>静态属性不能通过一个类已实例化的对象来访问（但静态方法可以）。</p>
<p>由于静态方法不需要通过对象即可调用，所以伪变量 $this 在静态方法中不可用。</p>
<p>静态属性不可以由对象通过 <code>-></code> 操作符来访问。</p>

```php
<?php
class Foo {
  public static $my_static = 'foo';

  public function staticValue(){
    return self::$my_static;
  }
}

print Foo::$my_static;  // foo

$foo = new Foo();
print $foo->staticValue();  // foo
?>
```

<h4>Final 关键字</h4>
<p>PHP 5 新增了一个 <code>final</code> 关键字。如果父类中的方法被声明为</p> <p><code>final</code>，则子类无法覆盖该方法。如果一个类被声明为 <code>final</code>，则不能被继承。</p>

```php
<?php
class BaseClass {
  public function test() {
    echo "BaseClass::test() called" . PHP_EOL;
  }
   
  final public function moreTesting() {
    echo "BaseClass::moreTesting() called"  . PHP_EOL;
  }
}

class ChildClass extends BaseClass {
  public function moreTesting() {
    echo "ChildClass::moreTesting() called"  . PHP_EOL;
  }
}
// 报错信息 Fatal error: Cannot override final method BaseClass::moreTesting()
?>
```

<h4>调用父类构造方法</h4>
<p>PHP 不会在子类的构造方法中自动的调用父类的构造方法。要执行父类的构造方法，需要在子类的构造方法中调用 <code>parent::__construct()</code> 。</p>

```php
<?php
class BaseClass
{
  function __construct() {
    print "BaseClass 类中构造方法" . '<br/>';
  }
}

class SubClass extends BaseClass
{
  function __construct() {
    parent::__construct();
    print "SubClass 类中构造方法" . '<br/>';
  }
}

class OtherSubClass extends BaseClass
{
  // 继承 BaseClass 的构造方法
}

// 调用 BaseClass 构造方法
$obj = new BaseClass;

// 调用 SubClass 构造方法
$obj = new SubClass;

// 调用 OtherSubClass 构造方法
$obj = new OtherSubClass;
?>
```
