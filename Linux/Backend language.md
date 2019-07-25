# 后端语言核心

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

<h2>重要的常用 Linux 命令</h2>

- 行编辑器 `vi/vim`
- 服务管理命令 `systemctl`
- 网络管理命令 `ifconfig`、`ip`命令、`router`
- 命令行下载命令 `curl`、`wget`
- 帮助命令 `man`
- 网络诊断命令 `ping`

<h2>Linux 进程管理命令</h2>

- `top` 命令详解
- `ps` 命令详解
- `kill`、`pkill` 命令详解
   - `kill -9 nginx` 向 linux 发送9号信号，强制杀除
- `w` 命令详解
- `sed`

`grep`(管道) 主要用于帅选

```javascript
# ps aux | grep nginx
# ss -anp | grep 80
// 帅选出 index.html 中的div
# cat index.html | grep div
```

<h2>Linux 网络管理</h2>

- 查看和配置网络基本信息 `ifconfig`、`ip`
- [重启网卡](https://www.zybuluo.com/mdeditor#%E4%BF%AE%E6%94%B9%E7%BD%91%E5%8D%A1)
- 查看路由配置 `router`
- 排查网络故障 `tracerout`
- 怎样找到占用网络端口的进程
  - `ss`命令、`netstat`命令、`lsof`
  

<hr/>
<h2>Linux免密远程登录</h2>

- 免密登陆的原理 
- 配置免密登陆的步骤：
  - 1、生成秘钥对 
  - 2、上传配置公钥 
  - 3、配置本地私钥 
  - 4、免密登陆功能的本地配置文件


**正常登陆服务器**

```javascript
# ssh root@192.168.43.106
# 这里输入密码
```

**1、生成秘钥对 **

这里用的是不对称加密：上传配置公钥、配置本地私钥

下面代码中`test`，`test_rsa` 由你自己命名。

```javascript
# cd ~
# ssh-keygen -t rsa -C "test" -f "test_rsa"
```

用`ls`命令，查看下生成的公钥、私钥。可以看到多出2个文件`test_rsa`、`test_rsa.pub`。`.pub`结尾的是公钥。

**2、上传配置公钥 **

上传公钥到服务器对应账号的`home`路径下的.ssh/中，`test_rsa`是由第1部生成的公钥，这里不用加`.pub`，它自动回给你加。下面`61.135.169.121 或者 www.baidu.com` 换成你自己的`ip`或者域名。

如果`test_rsa.pub`的权限不是600，可以用这个命令改[权限](https://blog.csdn.net/nzing/article/details/9166057)`chmod 600 test_rsa.pub`。查看权限就是`ls -l`命令

```javascript

# chmod 600 test_rsa.pub
# ssh-copy-id -i "test_rsa" root@61.135.169.121 或者 www.baidu.com
```

待上传完，服务器`home`目录下会生成一个`.ssh`目录

```javascript
// 进入home
# cd ~
// 查看所有文件，包括隐藏文件
# ls -a
# cd .ssh
// 这里就有一个authorized_keys文件，应该我们生成的，ls查看
# ls
```

**3. 配置本地私钥**

回到本地命令窗口来

把第一步生成的私钥复制到你的`home`目录下的`.ssh/` 路径下 

```javascript
# cd ~/.ssh
# ls
// 移动私钥test_rsa
# mv test_rsa .ssh
// 配置你的私钥文件访问权限为 600 
# chmod 600 test_rsa
```

**4. 免密登录功能的本地配置文件**

编辑自己`home`目录的`.ssh/` 路径下的`config`文件 

```javascript
// 生成 config 文件
# touch config
# chmod 644 test_rsa
# vi config
```

上面`config`文件中编辑的内容格式如下：

```javascript
# 多主机配置
Host gateway-produce
HostName IP或绑定的域名
// 端口
Port 22
Host node-produce
HostName IP或绑定的域名
Port 22
Host java-produce
HostName IP或绑定的域名
Port 22

Host *-produce
User root
IdentityFile ~/.ssh/produce_key_rsa
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO

#单主机配置
// ssh evil-cloud 就可以登录了
Host evil-cloud
User root
HostName IP或绑定的域名
IdentityFile ~/.ssh/evilboy_rsa
Protocol 2
Compression yes
// 防止长时间不访问被服务器踢掉，心跳
ServerAliveInterval 60
// 多久发个心跳
ServerAliveCountMax 20
LogLevel INFO

#单主机配置
Host git.yideng.site
User git
IdentityFile ~/.ssh/evilboy_rsa
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO
```