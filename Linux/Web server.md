# Web server

标签（空格分隔）： Notes

---

<h2>Web服务器基础原理和概念</h2>
<h3>用户访问百度</h3>

1. 浏览器输入网址: www.baidu.com(类似身份证号的ip 111.22.3.0)
2. 主机器找到理你最近压力最小(占用资源最少)的机器, 获取数据再返回给用户
3. 本机地址: 127.0.0.1(localhost)
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/web%20server.png" />

<h2>Apache服务器-XAMPP</h2>
<h3>Apache 80端口被阻止</h3>

- https://blog.csdn.net/ycl396232695/article/details/79908181

我这里Apache改成了: Main Pornt(801) SSL Port(4430)
<h3>基本入门</h3>

1. Explorer(锁定到xampp目录) -> htdocs -> 新建网站目录(web)
2. 当前WLAN ip地址(192.168.43.45)或者 127.0.0.1本地
3. <img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/ipconfig.png" />
4. 可以在当前WLAN下所有设备访问这个网站(192.168.43.45:801/web)


<h2>IIS服务器</h2>
<h3>win10启用或关闭IIS</h3>

- 控制面板->程序和功能->启用或关闭Windows功能
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/iis%20server.png" />

<h3>win10启用或关闭iis</h3>

- IIS管理界面(启动程序)
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/iis%20interface.png" />


