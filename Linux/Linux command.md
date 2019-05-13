# Linux command

标签（空格分隔）： Notes

---

<h2>虚拟机(VMware, Virtual Box，Virtual PC)</h2>

- 中文官网: https://www.vmware.com/cn.html

<h2>Linux</h2>

- Linux官网: http://www.linux.org
- Linux内核：https://www.kernel.org/

<h3>Linux版本</h3>

- Ubnutu图形界面的系统
- CentOS: 服务器用mini版
- redhat: 商业公司, 有很多商业软件



<h3>Linux基本操作命令-Terminal</h3>
<p>linux命令大全: http://man.linuxde.net/</p>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/linux-default-directory.png" /></p>
<p>清理</p>

```javascript
// 清理
# clear
```

<p>查看</p>

```javascript
// 列出当前目录的内容
# ls

// 显示长格式目录（1.访问权限、2.当前目录内存在的文件数量、3.当前目录或文件属于哪个用户和组、4.文件/目录（目录大小值是固定的,文件是实际大小）大小、5.创建时间、6.名称）
# ls -l
# ll

// 列出所有内容(包括隐藏文件)
# ls -a

// 同ls
# dir

// 显示当前目录的绝对路径
# pwd
```
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/ls-a.png" /></p>

<p>切换目录</p>

```javascript
// 切换目录 linux下严格区分大小写
# cd 相对路径(./)或绝对路径(/)

// 返回上一级目录
# cd ..

// 返回当前用户的目录`/home/point`
# cd ~
```
<p>修改文件或目录名</p>

```javascript
// 将文件ex3改名为new1
#mv ex3 new1
```
<p>创建新目录</p>

```javascript
// 在同一目录不能创建相同的目录或文件
# mkdir 文件名
```
<p>拷贝</p>

```javascript
# cp 源文件 路径/复制后的文件名

// 复制目录
# cp -r 目录名
```

<p>删除</p>

```javascript
# rm 文件名

// 删除目录
# rm -r 目录名
```

<p>ip命令</p>

```javascript
// 查看桥接的ip
# ip addr
```

<p>登出</p>

```javascript
# exit
```

<p>挂在文件（usb）</p>

```javascript
# mount
```

<h3>修改网卡</h3>

```javascript
# cd /etc/sysconfig/network-scripts

// 查看网卡，正常配置是 ONBOOT="yes"
# cat ifcfg-ens33

// 1. 断掉网络
# ifdown ens33
```

<hr/>
<h2>SSH</h2>

```javascript
// 连接本地linux
# ssh root@192.168.43.185

// 上传文件至 /root 目录
# scp ./notes.xmind root@192.168.43.185:/root
```

<hr/>
<h2><a href="https://baike.baidu.com/item/Vi%E7%BC%96%E8%BE%91%E5%99%A8/3521624?fr=aladdin">vi编辑器</a><h2>
<h3>创建hello.js 并进入</h3>

```
# vi hello.js
```
<h3>退出vi及保存文件</h3>
<p>命令行模式下保存并退出：输入hello world</p>
<p>在[命令行模式（command mode）]下，按一下[：]冒号键进入[Last line mode]，例如：</p>

```
:w filename //（输入 [w filename]将文章以指定的文件名filename保存）
:wq // (输入[wq]，存盘并退出vi)
:q! // (输入q!， 不存盘强制退出vi)
:x // (执行保存并退出vi编辑器)
```

