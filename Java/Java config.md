# Java config

标签（空格分隔）： Notes

---

<h2>Java三大体系</h2>

- `Java SE`。JavaSE以前称为J2SE.它允许开发和部署在桌面、服务器、嵌入式环境和实施环境中使用的Java应用程序。JavaSE 包括支持Java　Ｗeb服务开发的类，并为Java Platform,Enterprise Edition(Java EE)提供基础。
- `Java EE`。这个版本以前被称为J2EE.企业版本帮助开发和部署可移植、健壮、可伸缩切安全的服务端Java应用。Java EE是在JavaSE的基础上构建的他提供Web 服务、组建模型、管理和通信API.可以用来实现企业级的面向服务体系结构(service-oriented architecture,SOA)和web2.0应用程序。
- `Java ME`。Java ME为在移动设备和嵌入式设备（比如手机、PDA、电视机顶盒和打印机）上运行的应用程序提供一个健壮且灵活的环境。Java ME包括灵活的用户界面、健壮的安全模式、许多内置的网络协议以及对于动态下载的连网和离线应用程序的丰富支持。基于Java ME规范的应用程序只需要编写一次，就可以用于许多设备，而且可以利用每个设备的本级功能。

<h2>Java语言的主要特点</h2>

- 跨平台性
- 可靠安全
- 完全面向对象
- 多线程

<h2>工具</h2>

- [Eclipse](https://www.eclipse.org/downloads/)
- [JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html)

<h2><a href="https://www.cnblogs.com/zhangzongxing01/p/5559126.html">JDK、JRE、JVM三者间的关系</a></h2>

- JDK: java开发工具包, 用来开发java程序的
- jvm: java虚拟机, 用来解释字节码文件
- jre: java运行时的环境

<h2>检测jdk是否完整安装</h2>

- <img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/javac_01.png" />
- `javac` 与 `java` 指令

<h2>配置环境变量</h2>

- <img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/environment%20variable.gif" />
- 此电脑 -> 属性 -> 高级系统设置 -> 高级 -> 环境变量 -> 系统变量
- `JAVA_HOME`: `C:\Program Files (x86)\Java\jdk1.7.0_72`
- `PATH`: `%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin`<sup><a href="https://zhuanlan.zhihu.com/p/32485771">JAVA环境变量的作用及配置</a></sup>

<h2>第一个Java</h2>

<a href="https://www.cnblogs.com/codingbylch/p/5851544.html">main入口的详解</a>

```java
package com.tz.javase_day;// 明确属于哪个包

public class HelloWorld {
  // void 声明当前成员方法没有返回值
  // static 表明具有静态属性
  public static void main(String[] args) {    // 程序主入口
    // 系统 输出 换行打印
    System.out.println("helloWorld,..");
  }
}
```

<h2><a href="https://baike.baidu.com/item/java%E5%85%B3%E9%94%AE%E5%AD%97/5808816?fr=aladdin">java关键字</a></h2>

<h2>java执行三步骤</h2>

1. 建立源文件 `HelloWorld.java`
2. 编译文件 `javac HelloWorld.java`, 编码之后会产生一个 `.class` 文件
3. 运行文件 `java HelloWorld`
