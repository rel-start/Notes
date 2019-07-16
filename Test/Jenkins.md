# Jenkins

标签（空格分隔）： Notes

---

https://blog.csdn.net/xishaoguo/article/details/88577459

<h2>安装环境</h2>

1.安装[java运行环境](https://www.oracle.com/technetwork/java/javase/downloads/jdk11-downloads-5066655.html)

如果在终端运行，下面有命令有使用说明的话不用装了。`Ubuntu`下载`.deb`结尾的，`centos`、`Red Hat`下载`.rpm`的

```javascript
// 安装教程：https://docs.oracle.com/javase/9/install/installation-jdk-and-jre-linux-platforms.htm#JSJIG-GUID-09D016D5-AB67-4552-9312-3B249180BD0F
# rpm -ivh jdk-11.0.3_linux-x64_bin.rpm
```

这里我安装了`11.0.3`版本，然后运行`java -version`可以看到版本，说明安装完成了，教程链接里面也有说明。

2.安装[Jenkins中文官网](https://jenkins.io/zh/download/) <sup><a href="https://sysadminxpert.com/how-to-install-jenkins-on-linux/">url</a></sup>

可以用这种方法安装 [url](https://jenkins.io/zh/doc/pipeline/tour/getting-started/)

```javascript
// 直接用官网的方法下载：https://pkg.jenkins.io/redhat-stable/
# sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
# sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
# yum install jenkins
```

直接启动，`localhost:8080`就可以访问了
```javascript
# systemctl start jenkins
// 在8080端口服务名是java，哎～
# ss -anp | grep 8080
```

第一次安装，需要下图中的位置找一个你要`initialAdminPassword`

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/jenkins-01.png"></p>

下一步，就**安装推荐的插件**。安装完，注册用户或登陆就完成了。

<h3>使用jenkins自动化构建测试</h3>

我只做下简单的将github上的项目拉下来，`npm install`下
所以首先服务器上要有 git

```javascript
// https://www.tecmint.com/install-git-centos-fedora-redhat/
# yum install git
```

**`jenkins`上安装的插件**

- Pipeline NPM Integration Plugin
- NodeJS Plugin
- Node sharing executor
- Node Iterator API Plugin
- GitHub Integration Plugin
- GitHub Branch Source Plugin
- Git Changelog
- Docker plugin
- Distributed Fork plugin
- Build Timeout
- Publish Over SSH
- SSH Agent Plugin
- SSH Pipeline Steps
- SSH plugin
- Terminate ssh processes
- Timestamper
- Violation Comments to GitHub Plugin
- Yet Another Docker Plugin

哎～没具体看 先装上一堆

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/jenkins-02.png"></p>

设置完这个然后直接新建任务。

源码的地址

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/jenkins-03.png"></p>

然后设置下 `npm` 的 `path` 不然构建任务的时候一直报 找不到`npm`命令

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/jenkins-04.png"></p>

看下控制台输出

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/jenkins-05.png"></p>

`node app.js`。在打开`localhost:1234`可以看到页面

我的`app.js`内容下面这样。哎～头疼，jenkins装插件的时候不用翻墙，npm install 的时候又要翻墙。

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'hello wolrd'
});

app.listen('1234');
```

<br/>
<br/>
<hr/>
<h3>安装本地中文插件。</h3>

- `Manage Jenkins > Manage Plugins > Available > Locale plugin`
- 在到 `Manage Jenkins > Configure System > Default Language` 填上`zh_CN`，并且把下面的

<hr/>
<h2>Jenkins页面说明</h2>

<h3>Manage Plugins(系统配置)</h3>

- 主目录：jenkins服务的路径
- `Jenkins URL`：如果有域名的化可以换成域名
- `System Admin e-mail address`(系统管理员邮件地址)：填写邮箱构建状态可以通过邮件的形式通知你
- `GitHub`
- `Publish over SSH`：远程登录的相关信息
  - `Timeout(ms)`：超时
  - `Port`：ssh的端口
  - `Proxy`：发布的时候需要一个跳板机就需要这里填写

如果找不到上面的选项，可能是插件没有安装全。

<h3>configure Global Security(全局安全配置)</h3>

- `Agents`：是否允许你通过http的方式是否要加密，是否使用http本身的验证机制
- `Jenkins' own user database`
- `API Token`：安全验证机制。用于挂钩子(hooks)。

<h3>凭据配置</h3>

一般用不到，加证书等。先配置好到时候可以选择
一般是构建任务的时候加凭据，而不在这里设置。


<h3>Global Tool Configuration(全局工具配置)</h3>

- `Git`
- `NodeJS`
- `Docker`：微服务的包装和发布。

<h3>Reload Configurations from Disk(读取设置)</h3>

初始化所有设置。不要点

<h3>Manage Plugins(插件管理)</h3>

必须的插件

- `NodeJS Plugin`
- Github相关
- Git相关
- `SSH Agent Plugin`：远程登录支持的插件
- `Pipeline`：构建管道
- `Docker Pipeline`

<h3>负载统计</h3>

集群编译的时候显示服务器压力

<h3>准备关机</h3>

已经开始的任务等它做完，不允许新任务开启

<h3>My Views(我的视图)</h3>

当前用户创建的任务