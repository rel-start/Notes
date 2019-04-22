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
    <td>"发动机可三路"</td>
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

```
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

```
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




