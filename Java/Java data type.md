# Java data type

标签（空格分隔）： Notes

---

<h2><a href="https://baike.baidu.com/item/java%E5%85%B3%E9%94%AE%E5%AD%97/5808816?fr=aladdin">java关键字</a></h2>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/java-gjz.png" /></p>
<p>关键字不能用作变量名、方法名、类名、包名和参数。</p>

<h2>注释</h2>

```java
单行注释: //
多行注释: /* 在结尾加上 */
文本注释: /** 文档注释一般用于方法或类上 */ 
```

<h2>标识符</h2>

1. 标识符是由数字、字母、下划线、美元符号构成其他符号不可以;
（0~9，a~z,A~Z, ”_”, ”$”)，其他符号不可以;
2. 必须以字母、下划线、美元符号开头，不能以数字开头;
3. 关键字不能作为标识符;
4. 标识符区分大小写;

<h2>数据类型</h2>
<h3>基本数据类型</h3>
<table>
  <tr>
    <th>类型描述</th>
    <th>关键字</th>
    <th>字节数</th>
    <th>取值范围</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td>字节型</td>
    <td>byte</td>
    <td>1</td>
    <td>-2<sup>7</sup>~2<sup>7</sup>-1(-128~127)</td>
    <td>0</td>
  </tr>
  <tr>
    <td>短整型</td>
    <td>short</td>
    <td>2</td>
    <td>-2<sup>15</sup>~2<sup>15</sup>-1(-32768~32767)</td>
    <td>0</td>
  </tr>
  <tr>
    <td>整型</td>
    <td>int</td>
    <td>4</td>
    <td>-2<sup>31</sup>~2<sup>31</sup>-1(-2147483648~2147483647)</td>
    <td>0</td>
  </tr>
  <tr>
    <td>长整型</td>
    <td>long</td>
    <td>8</td>
    <td>-2<sup>63</sup>~2<sup>63</sup>-1(-9223372036854775808~9223372036854775807)</td>
    <td>0L</td>
  </tr>
  <tr>
    <td>单精度浮点型</td>
    <td>float</td>
    <td>4</td>
    <td>大约±3.40282347E+38F(有效位数6~7位)</td>
    <td>0.0f</td>
  </tr>
  <tr>
    <td>双精度浮点型</td>
    <td>double</td>
    <td>8</td>
    <td>大约±1.79769313486231570E+308(有效位数15位)</td>
    <td>0.0d</td>
  </tr>
  <tr>
    <td>字符型(用单引号)</td>
    <td>char</td>
    <td>2</td>
    <td>0~2<sup>16</sup>-1 (0~65535)</td>
    <td>'\u0000'</td>
  </tr>
  <tr>
    <td>多个字符串(用双引号)</td>
    <td>String</td>
    <td></td>
    <td>例."发动机可三路"</td>
    <td></td>
  </tr>
  <tr>
    <td>布尔型</td>
    <td>boolean</td>
    <td>1</td>
    <td>true/false</td>
    <td>false</td>
  </tr>
</table>

<h2>字符编码</h2>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/character-encoding.png" /></p>

<h2>变量/常量</h2>

```java
## 变量
byte a = 1;
a = 333;
short b = 2;
int c = 3;
long d = 4.444L;
float e= 3.3f;
double f = 4.4, g = 5.5d;
char j = 'a', n = 97;
boolean m = true;
System.out.println(m);

## 常量
final double PI = 3.1415926;
System.out.println(PI);
```

<h3>强制类型装换</h3>

```java
int a = 30;
short b = 7;
System.out.println("a/b="+(a/b));  // 结果int类型,自动类型转换

/* short c = 7;
c = b+5;	// 错误,无法从int转为short类型

方法一:
int c = 7;
c = c+5; */


short c = 7;
c = (short)(b+5);
System.out.println(b);

// 强制类型转换
float f = 30.3f;
int x = (int)f;
System.out.println(x);

int t=78;
double v=33.3d;
v = t+v;	// t=t+v;报错, 无法将double转换为int
System.out.println(v);
```

<h2>数据类型之间的转换</h2>

    byte-->short(char)-->int--> long-->float-->double

<p>自动转换（容量小-->容量大），强制转换（容量大-->容量小）。</p>

<h3>注意</h3>

- 在多种类型混合运算过程中，首先将所有数据转换成容量最大的那种，再进行计算。
- byte/short/char之间的计算不会相互转换，首先转换成int类型再计算。

<h2>运算符</h2>
`\t` = 相当于`tab`

<h3>算术运算符</h3>
<table>
    <tr>
        <th>运算符</th>
        <th>描述</th>
        <th>例子</th>
    </tr>
    <tr>
        <td>+</td>
        <td>加</td>
        <td></td>
      </tr>
      <tr>
        <td>-</td>
        <td>减</td>
        <td></td>
      </tr>
      <tr>
        <td>*</td>
        <td>乘</td>
        <td></td>
      </tr>
      <tr>
        <td>/</td>
        <td>除</td>
        <td>24/6=4</td>
      </tr>
      <tr>
        <td>%</td>
        <td>求余</td>
        <td>24%7=3</td>
      </tr>
      <tr>
        <td>++</td>
        <td>自增</td>
        <td>int i=5; i++;</td>
      </tr>
      <tr>
        <td>--</td>
        <td>自减</td>
        <td>int j=6; --j;</td>
      </tr>
</table>

<table>
  <caption>比较运算符</caption>
  <thead><tr>
    <th>运算符</th>
    <th>描述</th>
    <th>例子</th>
    <th>结果</th>
  </tr>
  <tr>
    <td>></td>
    <td>大于</td>
    <td>a=5;b=2;a>b</td>
    <td>true</td>
  </tr>
  <tr>
    <td>&lt;</td>
    <td>小于</td>
    <td>a=5;b=2;a<b</td>
    <td>false</td>
  </tr>
  <tr>
    <td>>=</td>
    <td>大于等于</td>
    <td>a=5;a>=3</td>
    <td>true</td>
  </tr>
  <tr>
    <td><=</td>
    <td>小于等于</td>
    <td>a=5;b=2;b<=a</td>
    <td>true</td>
  </tr>
  <tr>
    <td>==</td>
    <td>等于</td>
    <td>a=5;b=2;b==a</td>
    <td>false</td>
  </tr>
  <tr>
    <td>!=</td>
    <td>不等于</td>
    <td>b=2;b!=2</td>
    <td>false</td>
  </tr>
</table>

<h3>比较运算符</h3>
<table>
  <tr>
    <th>运算符</th>
    <th>描述</th>
    <th>例子</th>
  </tr>
  <tr>
    <td>=</td>
    <td>赋值</td>
    <td></td>
  </tr>
  <tr>
    <td>+=</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>-=</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>*=</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>/=</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>%=</td>
    <td></td>
    <td></td>
  </tr>
</table>

https://blog.csdn.net/sunbocong/article/details/81032758

<h3>比较运算符</h3>
<table>
  <tr>
    <th>运算符</th>
    <th>描述</th>
    <th>例子</th>
    <th></th>
  </tr>
  <tr>
    <td>&amp;&amp;</td>
    <td>逻辑与.当且仅当两个操作数都为真,条件才为真</td>
    <td>
        <ul>
            <li>int a=0,b=1,c=2; a&lt;b &amp;&amp; b&lt;c</li>
            <li>&&前后必须是表达式; <code>a&&b报错</code> <code>(0&lt;1)&&(1&lt;2)通过</code></li>
        </ul>
    </td>
    <td>true</td>
  </tr>
  <tr>
    <td>||</td>
    <td>逻辑或.如果任何两个操作数任何一个为真,条件为真</td>
    <td>int a=0,b=1,c=2; a&lt;b || b&gt;c</td>
    <td>true</td>
  </tr>
  <tr>
    <td>!</td>
    <td>逻辑非,永安里翻转操作数的逻辑状态,如果条件为true,则逻辑非原酸付将得到false</td>
    <td>int a=0,b=1,c=2; !(a&lt;b)</td>
    <td>false</td>
  </tr><tr style="display:none;"><td>!</td></tr>
</table>
<p><code>&</code>, <code>|</code> 判断符两侧表达式都需要判断;</p>