# 后端语言核心知识

标签（空格分隔）： Notes

---

<h2>操作系统概述</h2>
讲讲操作系统 (操作系统需遵守POSIX标准)

- 那些古老的操作系统
- 更适合工作和娱乐的`windows`
- 适合开发的`Linux`
- 非常好用的`macOS`

`ubuntu`、`CentOS`(服务器)、`redhat`、`Fedora`(桌面)、`Debian`等哪个好？


<h2>操作系统概述</h2>
Windows系统下

- `putty`
- `xshell`
- 在`Cmder`终端环境下使用ssh命令

Linux和macOS系统下

- `ssh`命令

<h2>重要的常用Linux命令</h2>

- 行编辑器 `vi`/`vim`
- 服务管理命令 `systemctl`
- 网络管理命令 `ifonfig`、`ip`命令、`router`
- 命令行下载命令 `curl`、`wget`
- 怎么查看`Linux`命令的帮助
- 在终端中不小型 `ctrl + s` 了怎么办

<a href="https://www.cnblogs.com/ftl1012/p/netstat.html">netstat</a>、<a href="http://www.ttlsa.com/linux-command/ss-replace-netstat/">ss</a>、killw命令
```javascript
// netstat 需要提前安装
# yum install net-tools

// 查看计算机 80 端口（解决端口冲突）
// ‘|’管道命令是把前面(ss -an)的输出传给后面(grep 80)的命令
# netstat -an | grep 80
# ss -an | grep 80

// 查看 80 端口什么程序占用
# ss -anp | grep 80
```

`wget`命令
```javascript
// 下载 baidu 首页
# wget http://www.baidu.com
```

怎么查看`Linux`命令的帮助（--help、-h）
```javascript
// 详细的帮助文档
# man wget
```

<h2>常用Linux终端快捷键</h2>

- ctrl+c 结束正在运行的程序【ping、telnet等】
- ctrl+d 结束输入或退出shell
- ctrl+s 暂停屏幕输出
- ctrl+q 恢复屏幕输出
- ctrl+l 清屏，等同于Clear
- ctrl+a/ctrl+e 快速移动光标到行首/行

<h2>Linux进程管理相关命令</h2>

- top 命令（进程管理器）
- ps 命令
- kill、pkill：杀掉进程
- w 命令：查看哪些用户登录服务器
- last命令：所有的登录历史


ps 命令
```javascript
// ps命令通常搭配 aux
# ps aux | grep node
```
下图是 `ps aux` 的结果`（PID=1）`1号进程是协调其他进程的，不可杀
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/linux1.png" /></p>

kill、pkill命令
```javascript
// 杀掉进程
# kill pid
// 用文件名去杀
# pkill nginx
```

last命令
```javascript
// 最近10条登录记录
# last -n 10
// 登录失败记录
# lastb
```