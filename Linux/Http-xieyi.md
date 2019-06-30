# Http协议

标签（空格分隔）： Notes

---
[TOC]

<h2>HTTP 请求模型</h2>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model01.png"></p>

`server`服务器，一般指`Apache`、`nginx`主要做反向代理，也可以做服务器、`tomcat`

`http`请求模型有2个角色：`client`(客户机，一般指浏览器)与`server`(服务器)。实际网络传输的时候很多其他的东西：代理、网络设备，但是这些只起到传输的过程，不会参与到`http`请求当中、不会修改你的数据、也不会干扰你。

2个动作：response(响应)、request(请求)

<hr/>
<h2>浏览器行为与 HTTP 协议</h2>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model02.png"></p>

1. 用户`user`向浏览器`Browser`发出指令：`Bring me google.com`(带我去`google.com`)
2. `Browser`接收到指令，要检测网络是否通畅，先穿透内网、防火墙`firewall`（有软、硬防火墙，硬防火墙很昂贵\，）、外网`internet`以及一些其他
3. 然后需要做`DNS`解析（域名、`ip`地址转换的）。浏览器向`DNS`服务器询问`google.com`的`ip`地址得到结果是`23.45.67.89`
4. 这里网络通了，浏览器开始上路。期间还需要通过各种网关、各种路由器等
5. 经过长途跋涉来到`google`机房（里面有很多集群），从`ip`进入，通过反向代理分发给那只鸟（请求传到了），鸟给出反馈（不给与反馈就是服务器崩掉了）
6. 拿到响应数据就开始回去，得到的数据要做一系列的处理（缓存、dom解析、渲染、脚本与事件的绑定等）
7. 做完后给`user`看到

</hr>
<h2>什么是HTTP协议</h2>

`HTTP`是超文本传输协议，从`www`浏览器传输到本地浏览器的一种传输协议，网站是基于`HTTP`协议的，例如网站的图片、`CSS`、`JS`等都是基于`HTTP`协议进行传输的。

`HTTP`协议是由从客户机到服务器的请求(`Request`)和从服务器到客户机的响应(`response`)进行约束和规范。

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model03.png"></p>

`TCP/IP`事实协议（已经用上了，很长的技术沉淀），`ISO/OSI`标准协议（标准是后来定义的）

<hr/>
<h2>了解 TCP/IP 协议栈</h2>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model04.png"></p>

1. 应用层
   - 为用户提供所需要的各种服务，例如：`HTTP`、`FTP`、`DNS`、`SMTP`等.`https`的`s`是在会话层
2. 传输层
   - 为应用层提供端到端的通信功能，保证数据包的顺序传送及数据的完整性
   - 该层定义了两个主要的协议：传输控制协议（`TCP`）和用户数据报协议（`UDP`）
3. 网络层
   - 主要解决主机到主机的通信问题。`IP`协议是网际互联层最重要的协议。(ping taceroute)
4. 数据链路层
   - 数字信号(`01010001`)转成电信号
   - `5g`大多数在 网络层、(主)数据链路层、物理层
5. 物理层
   - 无线电波以及一些看得到的

<hr/>
<h2>在 TCP/IP 协议栈中的位置</h2>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model05.png"></p>

> 目前普遍应用版本`HTTP1.1`，`TLS、SSL`加密方案
> 正在逐步向`HTTP 2`迁移
> `HTTP`默认端口为`80`
> `HTTPS`默认端口号为`443`


<hr/>
<h2>HTTP 的工作过程</h2>

一次`HTTP`操作称为一个事务<sup>（一个操作要分成若干个步骤，步骤要执行一定的顺序去执行，任何步骤出错，整个操作失败）</sup>，其工作过程可分为四步

1. 首先客户机与服务器需要建立连接(`TCP`连接)。只要点击某个超链接，`HTTP`的工作开始

2. 建立连接后，客户机发送一个请求给服务器，请求方式的格式为：统一资源标识符(`URL`)、协议版本号，后边是`MIME`信息包括请求修饰符、客户机信息和可能的内容。

3. 服务器接到请求后，给予相应的响应信息，其格式为一个状态行，包括信息的协议版本号、一个成功或错误的代码，后边是`MIME`信息包括服务器信息、实体信息和可能的内容。

4. 客户端接收服务器所返回的信息通过浏览器显示在用户的显示屏上，然后客户机与服务器断开连接。

<hr/>
<h3>请求与相应</h3>

- HTTP请求组成：请求行、消息报头、请求正文。
- HTTP相应组成：状态行、消息报头、响应正文。
- 请求行组成：以一个方法符号开头，后面跟着请求的URI和协议的版本。
- 状态行组成：服务器HTTP协议的版本，服务器发回的响应状态代码和状
态代码的文本描述。

**请求**

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model06.png"></p>

**响应**

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model07.png"></p>

<hr/>
<h3>请求方法</h3>

- **GET**: 请求获取`Request-URI`所标识的资源。查
- **POST**: 在`Request-URI`所标识的资源后附加新的数据。改
- **PUT**: 请求服务器存储一个资源，并用`Request-URI`作为其标识。增
- **DELETE**: 请求服务器删除`Request-URI`所标识的资源。删
- **HEAD**: 请求获取由`Request-URI`所标识的资源的响应消息报头
- **TRACE**: 请求服务器回送收到的请求信息，主要用于测试或诊断
- **CONNECT**: `HTTP/1.1`协议中预留给能够将连接改为管道方式的代理服务器。
- **OPTIONS**: 请求查询服务器的性能，或者查询与资源相关的选项和需求

[Restful](http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html) 接口通常会应用: `get`、`post`、`put`、`delete`

<hr/>1xx：指示信息--表示请求已接收，继续处理
<h3>HTTP 状态码</h3>

状态代码有三位数字组成，第一个数字定义了响应的类别，且有五种可能取值（具体看<sup>HTTP协议_最新RFC文档_中文版.pdf 25页</sup>）：

- `1xx`：指示信息--表示请求已接收，继续处理
- `2xx`：成功--表示请求已被成功接收、理解、接受
- `3xx`：重定向--要完成请求必须进行更进一步的操作
- `4xx`：客户端错误--请求有语法错误或请求无法实现
- `5xx`：服务器端错误--服务器未能实现合法的请求

<hr/>
<h3>常用的请求报头</h3>

- **Accept**: 指定客户端接受哪些类型的信息。`eg：Accept：image/gif，Accept：text/htmlAccept-Charset`请求报头域用于指定客户端接受的字符集。
- **Accept-Encoding**：指定可接受的内容编码。`eg: Accept-Encoding: gzip, deflate, br`，支持压缩格式等
- **Accept-Language**: 请求报头域类似于Accept，但是它是用于指定一种自然语言。`zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7`
- **Cache-Control**: 缓存相关 `no-cache`
- **Connection**: `keep-alive`长连接（一次连接多次请求响应然后在断开），短连接(一次请求响应就断开，然后在连接)。
- **Cookie**
- **Host**: 域名。`www.baidu.com`
- **Referer**: 源头。`https://www.baidu.com/`
- **User-Agent**: 请求报头域允许客户端将它的操作系统、浏览器和其它属性告诉服务器。`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36`

<hr/>
<h3>常用的响应报头</h3>

- **Server**: 服务器信息`BWS/1.1`

<hr/>
<h2>cookies 与 session</h2>

> `Cookies`是保存在客户端的一小段文本（`ASCII`码，存在电脑中就是`.txt`文件），绝大部分在服务器生成（客户端也可以生成），随客户端点每一个请求发送该`url`下的所有cookies到服务器端。
> `Session`则保存在服务器端，用来维持会话。`http`协议是一种无状态(连接状态)协议，那么服务器无法正确识别客户端（TCP连接一次断开了，再次连接的时候如何识别客户端）。通过唯一的值sessionID来区别每一个用户。`SessionID`随每个连接请求发送到服务器，服务器根据`sessionID`来识别客户端，再通过`session 的key`获取`session`值。

<hr/>
<h3>Cookie 使用</h3>

- 与`Cookie`相关的`HTTP`扩展头
- 1) **Cookie**：客户端将服务器设置的`Cookie`返回到服务器;
- 2) **Set-Cookie**：服务器向客户端设置`Cookie`;
- 服务器在响应消息中用`Set-Cookie`头将`Cookie`的内容回送给客户端，客户端在新的请求中将相同的内容携带在`Cookie`头中发送给服务器。从而实现会话的保持

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model08.png"></p>

客户机第一次登陆没有`cookie`传过去，服务器给你一个`id`（`set-cookie`相当于身份证），第二次登陆的时候就可以`cookie`了，就可以一股脑传过去，服务器就知道你是老用于，就给你响应的反馈。比如你已经登陆了，不可能每刷新一次浏览器就需要重新登陆，需要做一个持久层

<h3>Session 的使用</h3>

- 使用`Cookie`来实现
- 使用`URL`回显来实现:token

<hr/>
<h2>HTTP 缓存机制</h2>

缓存会根据请求保存输出内容的副本，例如`html`页面，图片，文件，当下一个请求来到的时候：如果是相同的`URL`，缓存直接使用副本响应访问请求，而不是向源服务器再次发送请求。

**缓存的优点**

- 减少相应延迟
- 减少网络带宽消耗

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model09.png"></p>

客户机向服务器请求，资源拿过来，电脑上需要保存一些资源。再次向服务器缓存，服务器检测本地是否有缓存（缓存协商），有缓存直接返回`304`，并且`304`不带响应体，服务器告诉客户机从本地拿。

<hr/>
<h3>浏览器缓存机制</h3>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model10.png"></p>

<hr/>
<h2>HTTPS 协议分析</h2>

- `HTTPS`协议的安全性由`SSL`协议实现，当前使用的`TLS`协议`1.2`版本包含了四个核
心子协议：握手协议、密钥配置切换协议、应用数据协议及报警协议。

- **数字证书**：数字证书是互联网通信中标识双方身份信息的数字文件，由`CA`签发。(`Symantec`)

- **CA**：`CA`（certification authority）是数字证书的签发机构。作为权威机构，其审
核申请者身份后签发数字证书，这样我们只需要校验数字证书即可确定对方的真
实身份。

- `HTTPS`协议、`SSL`协议、`TLS`协议、握手协议的关系
 1. `HTTPS`是`Hypertext Transfer Protocol over Secure Socket Layer`的缩写，即
`HTTP over SSL`，可理解为基于`SSL`的`HTTP`协议。`HTTPS`协议安全是由`SSL`协
议实现的。
 2. `SSL`协议是一种记录协议，扩展性良好，可以很方便的添加子协议，而握手协
议便是`SSL`协议的一个子协议。
 3. `TLS`协议是`SSL`协议的后续版本，本文中涉及的`SSL`协议默认是`TLS`协议`1.2`版
本。

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model11.png"></p>

<h2>HTTP2 协议分析</h2>

- 默认使用加密
  - 默认用到HTTPS协议
- 使用二进制格式传输，更高效、更紧凑。
  - http默认用文本格式
- 对报头压缩，降低开销。
  - 比如说报头的cookie会很大
- 多路复用，一个网络连接实现并行请求。
  - 网络通信上的概念
  - `HTTP1.1`每次请求一个资源，都必须有个传输链路。例如.`HTTP1.1`抓取3个文件，必须有3个链路。虽然支持多任务，客户端发起3个请求，那么服务器也必须有3个对应进程来响应3个请求(对服务器的压力可想而知)。`HTTP1.1`协议是串行的，一个做完才可以做另外一个。
  - `HTTP2`协议一个链路上可以并发，文件1切成若干小块，文件2也切成若干，传输过程中文件1、文件2分别发一个小块... 这样同样实现了多任务。例如. `HTTP1.1`抓取一个首页，必须要先抓取`html`骨架完，在抓取`css`才可以看到些效果，然后抓取`js`等；`HTTP2`的多路复用的话，像首页的图片同时在展示
  - C语言 -> Linux api -> 网络机制
- 服务器主动推送，减少请求的延迟
  - `ajax`会落后，不用再客户端一遍一遍刷(似`webSocket`也可能被取代)，可以减少服务器压力

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model12.png"></p>

<hr/>
<h3>HTTP2的伪头字段</h3>

伪头部字段是`http2`内置的几个特殊的以`:`开始的`key`，用于替代`HTTP/1.x`中请求行/响应行中的信息，比如请求方法，响应状态码等

- `:method` 目标URL模式部分（请求）
- `:scheme` 目标URL模式部分（请求）
- `:authority` 目标RUL认证部分（请求）
- `:path` 目标URL的路径和查询部分（绝对路径产生式和一个跟着"？"字符的查询产生式）。（请求）
- `:status` 响应头中的HTTP状态码部分（响应）

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model13.png"></p>

<h2>了解HTTP 3</h2>

多路复用的问题，重传的时候会大大降低效率。`http3` 就可以解决这一个问题

- HTTP 3 用`udp`协议，`udp`是对数据报的一个简单封装，灵活性更大，`tcp`、`udp`是对数据报封装
- QUIC协议是什么（Quick UDP Internet Connection）
- HTTP 3与HTTP 1.1和HTTP 2没有直接的关系
- HTTP 3不是http2的扩展
- HTTP 3将会是一个全新的WEB协议
- HTTP 3目前处于制订和测试阶段

<hr/>
<h2>HTTP 与反向代理</h2>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model14.png"></p>

**代理**

1. 代购的意义跟代理有点类似：代理在国外，你在国内，代理接收你的请求（你到达不了的地方），帮你带回来。
2. 安全等级比较高的公司，不允许访问外网。但你工作中又需要查找资料，处于安全性，加个代理。你不能直接访问到外网，必须通过代理服务器才能发出去，处于安全性，可以监视(代理服务器全都有记录)、阻断(只许访问白名单的网站、黑名单不能访问)客户机，控制你的流量（可以访问一些技术网站）。还可以做到 防火墙的一点作用

**反向代理**

1. 客户机在外网，服务器在内网，服务器出口只有一个。客户端只能通过一个入口(`IP`)访问服务器。一个`IP`如何分发到对应的服务器，就需要反向代理服务器。反向代理解析`http`头，找到资源地址（`Remote Address`），根据资源地址以及内部的映射表：`a`服务器对应`a`服务器的`ip`、`b`服务器对应`b`; 对外提供服务的端口是同一个`ip`，在`http`层上进行分拣

<hr/>
<h3>反向代理的用途</h3>



- 加密和SSL加速
 - 减轻服务器的压力，分担一些运算量(cup)比较高的操作。`web Server`负责一些`IO`
- 负载均衡
 - `10k`衡量并发`10k`连接
 - 如何让多个服务器做一样的工作，就需要用到负载均衡，分别分发给服务器
- 缓存静态内容
- 压缩
- 减速上传
- 安全
- 外网发布

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/http-model15.png"></p>

<hr/>
<h2>让nginx跑起来</h2>

- 在`Linux`下的两种安装方案：`yum`/`apt`安装、源码编译安装
- 准备环境：`Linux`服务器、`gcc`编译器、`nginx`源代码
- 获取`nginx`源码：`http://nginx.org`
- 编译安装`nginx`源码
- 配置规则

<h3>安装 nginx</h3>

```javascript
// 下载 nginx 压缩包
# wget http://nginx.org/download/nginx-1.16.0.tar.gz

// 解压 nginx 包
// z: gz；x: 解压缩；v: 解压缩的过程要看到；f: 解压缩后要放到一个目录上
# tar zxvf nginx-1.16.0.tar.gz

// 一键安装上面四个依赖
# yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

上面，`gcc`是C语言编译器

安装nginx。所有C语言源代码编译脚本统一是`configure`，[权限](https://www.runoob.com/linux/linux-file-attr-permission.html)

```javascript
//进入nginx目录
# cd nginx-1.16.0
//执行命令
# ./configure
```

如果支持的话会输出 `Makefile`，给编译器用

```javascript
//执行make命令
make
//会把编译出来的，复制到安装目录下
make install
```

将nginx复制到etc下

```javascript
cp -r conf /etc/nginx
```

以上的方法等同于下面的代码，并且还配置好了，上面的方法还需要自己去配置。
centos 提供的`nginx`的源自动化安装教程：https://www.cnblogs.com/songxingzhu/p/8568432.html

```javascript
// 添加源
# sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
// 安装Nginx。通过yum search nginx看看是否已经添加源成功。如果成功则执行下列命令安装Nginx。
# sudo yum install -y nginx
```

查看服务状态

```javascript
# systemctl {status | stop | start | restart} nginx

# nginx -s reload
// ps下nginx进程
# ps aux | grep nginx
```

<hr/>
<h3>Nginx 常用功能</h3>

1. Http代理，反向代理
2. 负载均衡
3. web缓存
4. Nginx相关地址
 - 源码：https://trac.nginx.org/nginx/browser
 - 官网：http://www.nginx.org/


<hr/>
<h3>Nginx 配置文件结构</h3>
 
默认的 `/etc/nginx/nginx.conf`
 
```javascript
# 配服务的用户身份
user  nginx;

# 最多有1个工作进程。
worker_processes 1;
```

linux下只有多进程，实现多任务就需要主进程`master process`拉起子进程`worker process`
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/nginx01.png" /></p>

进程并非越多越好，一般1个进程占`1`个`cup`核心

```javascript
# 错误日志
error_log  /var/log/nginx/error.log warn;
# nginx.pid 帮助操作系统管理进程
pid        /var/run/nginx.pid;

# 配置事件
events {
  # 工作连接数：同时并发多少连接
  worker_connections  1024;
}

# 提供http服务
http {
  include       /etc/nginx/mime.types;
  # http头默认以流的形式传输
  default_type  application/octet-stream;
  
  # 日志输出的格式
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
  # 访问日志的路径
  access_log  /var/log/nginx/access.log  main;
  
  # 下面是一些开关
  sendfile        on;
  #tcp_nopush     on;
  
  # 长连接，65s不连接就断开
  # keepalive_timeout  0;
  keepalive_timeout  65;
  
  #gzip  on;
}

server {
  # nginx默认端口
  listen       80;
  # 改成公网域名
  server_name  localhost;
}
```

<h3>nginx 配置反向代理</h3>

```javascript
...

http {
  upstream mysvr {
    ip_hash;
    server 192.168.10.121:3333 weight=2;
    server 192.168.10.122:3333;
  }
  server {
    location /	{																			      proxy_pass http://mysvr;
  }
}
```

- `weight=2`：表示2次`192.168.10.121`，1次`192.168.10.122`
- `ip_hash`：不如第一次代理到`192.168.10.122`，那么以后都是这个ip，再也不会轮询