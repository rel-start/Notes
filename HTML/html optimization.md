# html optimization

标签（空格分隔）： Notes

---

## HTML优化
### 1.1使用div进行布局 不要用div进行无意义的包裹 span行内常见的元素
### 1.2尽量少写html 一定要少写
html 第一减少dom渲染的时间 浪费整个文件大小
一个html元素最次最次 顶三个元素
https://www.cnblogs.com/freeyiyi1993/p/3615179.html

## HTML5标签
html5标签http://www.w3school.com.cn/tags/index.asp


- `<main>`标签：规定文档的主要内容
- `<header>`标签：页眉，主要用于页面的头部的信息介绍，也可用于板块头部
- `<nav>`标签：导航（包含链接的一个列表）
- `<footer>`标签：页脚，页面的底部 或 板块底部
- `<section>`标签：页面上的板块，用于划分页面上的不同区域，或者划分文章里不同的节（通常用于大点的板块）
- `<article>`标签：用来在页面中表示一套结构完整且独立的内容部分（可以用来呈现论坛的一个帖子，杂志或报纸中的一篇文章，一篇博客，用户提交的评论内容，可互动的页面模块挂件等）<br/>
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/article.png" />--- 独立的内容部分


- `<aside>`标签
    - 1）在<article>之外使用，作为页面或站点全局的附属信息部分；最近点的形式是侧边栏（sidebar），其中的内容可以是友情链接、附属导航或广告单元等
    - 2）被包含在<article>中作为主要内容的附属信息部分，其中的内容可以是与当前文章有关的引用、词汇列表等<br/>
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/aside.png" />

- `<time>`标签：用来表现时间或日期
- `<menu>`标签： 1.标签定义命令的列表或菜单   。 menuitem属性
                         2.标签用于上下文菜单、工具栏以及用于累出表单控件和命令
- `<time>`标签：用来表现时间或日期
- `<hgroup>`标签：页面上的一个标题组合。（一个标题和一个子标题，或者标语的组合）
- `<ins>`、`<del>`标签：文档的更新、删除
- `<figure>`标签：规定独立的流内容（图像、图表、照片、代码等等）
- `<details>`标签：用于描述文档或文档某个部分的细节（open默认展开）
- `<summary>`标签：detail元素的标题
- `<small>`标签：定义小号字体（大概0.8em）
- `<dialog>`标签：定义一段对话<br/>
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/dialog.png" />

- `<mark>`：定义带有记号的文本
- `<meter>`：定义度量衡。仅用于已知最大和最小值的度量
- `<progress>`：定义任何类型的任务的进度
```
<progress max=”100” value=”76”>
  <span>76</span>%
</progress>
```
- `<address>`：标签定义文档或文章的作者/拥有者的联系信息
    - 如果`<address>`元素位于`<body>`元素内，则它表示文档联系信息
    - 如果`<address>`元素位于`<article>`元素内，则它表示文章的联系信息
提示：`<address>`标签不应该用于描述通讯地址，除非它是联系信息的一部分
提示：`<address>`标签通常联通其他信息被包含在`<footer>`元素中

- `<ruby>`、`<rt>`、`<rp>`
- `<details>`标签用于描述文档或文档某个部分的细节<br/>
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/details.png" />
<br/>
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/figure.png" />

- `<keygen>`：规定用于表单的密钥生成器字段
- `<output>`：定义不同类型的输出，比如脚本的输出<br/>
<img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/output.png" />

- `<datalist>`：定义选项列表
<table>
  <tr>
    <th>属性</th>
    <th>值</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>cite</td>
    <td>URL</td>
    <td>该文档解释了文本被插入、删除的原因</td>
  </tr>
  <tr>
    <td>datetime</td>
    <td>YYY-MM-DDthh:mm:ssTZD</td>
    <td>规定文本被插入、删除的日期和时间</td>
  </tr>
</table>
		

<h3>内联标签：</h3>

<table>
  <tr>
    <th>属性</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>&lt;dfn&gt;</td>
    <td>定义一个定义项目</td>
  </tr>
  <tr>
    <td>&lt;code&gt;</td>
    <td>定义计算机代码文本</td>
  </tr>
  <tr>
    <td>&lt;samp&gt;</td>
    <td>定义样本文本。font-size: 13px; font-family: monospace;<br/><img src="https://raw.githubusercontent.com/rel-start/Notes/master/picture/samp.png" /></td>
  </tr>
  <tr>
    <td>&lt;kbd&gt;</td>
    <td>定义键盘文本。它表示文本是从键盘上键入的。它经常用在与计算机相关的文档或手册中</td>
  </tr>
  <tr>
    <td>&lt;var&gt;</td>
    <td>定义变量。您可以将此标签与&lt;pre&gt;及&lt;code&gt;标签配合使用</td>
  </tr>
  <tr>
    <td>&lt;em&gt;</td>
    <td>呈现为强调的文本</td>
  </tr>
  <tr>
    <td>&lt;strong&gt;</td>
    <td>定义重要的文本</td>
  </tr>
  <tr>
    <td>&lt;strong&gt;</td>
    <td>定义重要的文本</td>
  </tr>
  <tr>
    <td>&lt;tt&gt;</td>
    <td>呈现类似打字机或者等款的文本效果</td>
  </tr>
  <tr>
    <td>&lt;pre&gt;</td>
    <td>标签的一个常见应用就是用来表示计算机的源代码（保留空格和换行符）</td>
  </tr>
</table>


<h3>常用标签</h3>

- h1~h6：`<h1>`标签在一个页面上最好只出现一次（不成文规定）。并且用在logo身上
- `<ul>`，`<ol>`，`<li>`：子集不能出现其他标签，只能是`<li>`
- `<dl>`，`<dt>`，`<dd>`：子集不能出现其他标签，只能是dt（一次），dd（多次）




