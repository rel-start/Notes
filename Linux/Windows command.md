# Windows command

标签（空格分隔）： Notes

---
https://www.cnblogs.com/kekec/p/3662125.html

<h3>Windows基本操作命令-cmd</h3>
win + R 可以调出cmd

- cls 清除屏幕
- dir: 列出目录
    - 文件/目录创建日期
    - 文件/目录创建时间
    - 代表是文件还是目录(<code>&lt;DIR&gt;</code>为目录, 反之为文件)
    - 文件大小
    - 文件名/目录名
- cd: 进入目录. `cd 目录名`. `e:`(可以直接进入e盘)
    - cd ..: 返回上一级目录
    - cd /d d: 表示直接转换到后面的路径，否则如果切换盘符，就需要再输入盘符才能切换路径
        - /d- 此开关可立即cd更改驱动器和目录。没有它你就必须这样做cd %~d0 & cd %~p0。<sup><a href="https://stackoverflow.com/questions/18309941/what-does-it-mean-by-command-cd-d-dp0-in-windows">(未懂)</a></sup>
- md: 创建目录. `md move`
- rd: 删除目录
    - rd movie // 删除单签目录下的movie空文件夹
    - rd /s /q d:\test //使用安静模式删除d:\test（除目录本身外，还将删除指定目录下的所有子目录和文件）
- copy: 拷贝文件
    - copy 1.txt aaa // 将文件拷贝并放入aaa目录
- ipconfig: 查看当前ip

<h3>工具</h3>
<p><a href="http://www.cygwin.com/">Cygwin</a>: 在Windows下模拟Linux命令</p>
    

