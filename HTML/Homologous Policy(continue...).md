# Homologous Policy(continue...)

标签（空格分隔）： Notes

---

http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
http://www.ruanyifeng.com/blog/2018/07/indexeddb.html
雅虎军规
## 同源策略
### 1.1含义
最初，它的含义是指，A网页设置的 Cookie，B网页不能打开，除非这两个网页"同源"。所谓"同源"指的是"三个相同"。
- 协议相同
- 域名相同
- 端口相同

举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略）。它的同源情况如下。
```
http://www.example.com/dir2/other.html; 同源
http://example.com/dir/other.html; 不同源（域名不同）
http://v2.www.example.com/dir/other.html; 不同源（域名不同）
http://www.example.com:81/dir/other.html; 不同源（端口不同）
```

### 1.2含义
同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。
设想这样一种情况：A网站是一家银行，用户登录以后，又去浏览其他网站。如果其他网站可以读取A网站的 Cookie，会发生什么？

很显然，如果 Cookie 包含隐私（比如存款总额），这些信息就会泄漏。更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制(跨站攻击)。

由此可见，"同源政策"是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了。

### 1.3 限制范围(跨域)
随着互联网的发展，"同源政策"越来越严格。目前，如果非同源，共有三种行为受到限制。
```javascript
Cookie、LocalStorage 和 IndexDB 无法读取。
DOM 无法获得。
AJAX 请求不能发送。
```


### 1.4 设置同源策略(hosts)
```javascript
test.xxx.com a.html
<script>
document.domain = 'example.com';
document.cookie = 'test1=hello';
</script>

test2.xxx.com b.html
<script>
document.cookie
</script>
```

另外，服务器也可以在设置Cookie的时候，指定Cookie的所属域名为一级域名，比如`.example.com`。
```javascript
Set-Cookie: key=value; domain=.example.com; path=/
```
这样的话，二级域名和三级域名不用做任何设置，都可以读取这个Cookie。


## 跨域
`document.domain`, `window.postMessage`, JSONP都可以跨域
```javascript
## jsonp原理
<script>
function test(data) {
  // data = {123}
  console.log(data);
}
</script>
<script type="text/javascript" src="http://www.sss.com/index.php?callback=test"></script>
<!--
  if(callback) {
    callback({"data":123});
  } else {
    {"data":123}
  }
-->
```

### 1.1 怎么突破同源策略
`img`, `iframe`, `script(jsonp)`, `link(bacground)`css注入 css攻击漏洞

### 1.2 高阶WebSocket postMessage(iframe img)
代码写到img里面 img->http://www.jb51.net/article/102767.htm





