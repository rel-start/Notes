# Linux command

标签（空格分隔）： Notes

---

<h2>虚拟机(VMware, Virtual Box，Virtual PC)</h2>

- 中文官网: https://www.vmware.com/cn.html

<h2>Linux</h2>

- Linux官网: http://www.linux.org

<h3>Linux版本</h3>

- Ubnutu图形界面的系统
- CentOS: 服务器用mini版
- redhat: 商业公司, 有很多商业软件



<h3>Linux基本操作命令-Terminal</h3>
<p>linux命令大全: http://man.linuxde.net/</p>
<p><img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/linux-default-directory.png" /></p>

- clear: 清理
- ls: 列出当前目录的内容
    - -l 显示长格式目录
        - 访问权限
        - 当前目录内存在的文件数量
        - 当前目录或文件属于哪个用户和组
        - 文件/目录（目录大小值是固定的,文件是实际大小）大小
        - 创建时间
        - 名称
    - -a 列出所有内容(包括隐藏文件)
        - <img src="https://raw.githubusercontent.com/rel-start/Notes/picture/picture/ls-a.png" />
- cd: 切换目录 linux下严格区分大小写
    - cd 相对路径(./)或绝对路径(/)
    - cd ..: 返回上一级目录
    - cd ~: 返回当前用户的目录`/home/point`
- dir: 同ls命令
- mv: 修改文件或目录名
- mkdir: 创建新目录
    - mkdir 文件名{在同一目录不能创建相同的目录或文件}
- cp: 复制. `cp 源文件 路径/复制后的文件名`
    - -r: 复制目录. `cp -r 目录名`
- pwd: 显示当前目录的绝对路径
- rm: 删除. `rm 文件名`
    - -r: 删除目录. `rm -r 目录名`


