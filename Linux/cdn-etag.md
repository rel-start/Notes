# 前端性能优化基础

标签（空格分隔）： Linux

---

[Navigation Timing](https://w3c.github.io/navigation-timing/)

<h2>DNS详解</h2>

- DNS是 Domain Name System，域名系统，用于将域名转换为IP
- 顶级域名：baidu.com
  - 二级域名www.baidu.com
- 域名资源记录
- 域名服务器：用于将域名转换为IP
- 域名解析
  - 反向解析ip转为域名
  - 正向相反

<h3>域名解析</h3>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-01.png"></p>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-02.png"></p>

mac 本地域名解析`/etc/hosts`

<h2>TCP三次握手与四次挥手</h2>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-03.png"></p>

从数据发送端开始，往下每经过一层都要加该层的`head`，物理层没有头直接以比特流的形式到达接收短的物理层，然后一层层上去，并处理掉该层的`head`

<h2>TCP协议模型</h2>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-04.png"></p>

- `ping`命令用的是 ICMP 协议(原始数据报)
- `COM`口串口通信上 SLIP 协议（前面是数据后面是校验位）
- PPP 协议 运营商拨号相关
- ISO2110 是一些物理硬件的标准（如网卡的标准）

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-05.png"></p>

- TCP协议的头最小站24个字节。下面的都是2进制数据
- `Source Port`(源端口)客户端/`Desination Port`(目的端口)服务端80各占2个字节
- `Sequence Number`是个int占4个字节。
  - 例. 100M的数据必须要分割开传输(整个传输的话如果里面一点错误就需要整个重传)，这个顺序号就用到了。
- `Acknowledgment Number`应答号。如果有丢包用到
- `Offset`偏移量，决定tcp头的大小
- `TCP Flags`标记位
- `Window`移动窗口
- `Checksum`校验位
- `Urgent Pointer`指针
- `TCP Options`tcp控制选项

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-06.png"></p>


<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-07.png"></p>

ping www.baidu.com 不同地区ping的ip不同

<h2>缓存机制</h2>

缓存会根据请求保存输出内容的副本，例如html页面，图片，文件，当下一个请求来到的时候：如果是相同的URL，缓存直接使用副本响应访问请求，而不是向源服务器再次发送请求。

**缓存的优点**

- 减少相应延迟
- 减少网络带宽消耗

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-08.png"></p>

> 强制缓存：只要你资源过来我就缓存。
> 对比缓存：比较是否需要缓存。
> 浏览器是强制、对比缓存综合起来使用。强制缓存：服务器把资源推过来，不要求你一定要缓存慢，但是对你的缓存做了失效规则(到期时间)，如果缓存就要对比缓存时间，超过时间就要在去发起请求；对比缓存：需要协商了，浏览器(client)第一次去拿缓存，服务器会把缓存标记和资源发到client，client根据服务器发过来的缓存标记看是否需要缓存。client再次发起请求就不是先找本地的，而是先把本地缓存的状态发给服务器让服务器去决定，是否需要重新在服务器来取资源

<h2>浏览器缓存机制- 浏览器第一次请求</h2>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-11.png"></p>

<h2>浏览器缓存机制- 浏览器再次请求</h2>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-11.png"></p>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-09.png"></p>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/dns-10.png"></p>

可以在`nginx`服务器做这两种策略