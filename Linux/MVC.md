# Http 那些事

标签（空格分隔）： Notes

---

<h2>1. MVC 模式</h2>

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/mvc01.png"></p>

1. `view`（对应的UI）就是给`user`用于看的
2. 用户看到界面上的这些UI后，反馈给`controller`控制器（点按钮，触发按钮背后`action`，执行那个`action`由`controller`去管理）
3. `controller`要把这些事做完，需要有所反馈的结果以`model`（数据模型）出来
4. 然后在吧`model`灌到页面上

**⼀个典型的Web MVC流程：**

- `Controller`截获⽤户发出的请求
- `Controller`调⽤Model完成状态的读写操作
- `Controller`把数据传递给`View`
- `View`渲染最终结果并呈献给⽤户

> [CS](https://www.cnblogs.com/engeng/articles/5976292.html)即Client/Server（客户机/服务器）结构
> CS、桌面程序时代，点击按钮触发业务，这些业务逻辑需要写成对应的业务模块，封装到 dll(动态链接库文件)或者lib(静态数据连接库)

 - BS即Browser/Server（浏览器/服务器）结构

<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/mvc02.png"></p>

**当数据量不大的情况下**：统一请求，通过`controller`批量处理完数据，一口气灌到`view`上。**错误方式**：数据来，加工顶层，灌到页面上; 加工第二层，灌到页面上...

<h2>PHP 的 yii框架</h2>
 

