# node基础api-querystring

标签（空格分隔）： Node

---

`querystring` 模块提供用于解析和格式化 `URL` 查询字符串

<h2>querystring.parse</h2>

解析 url 字符串

```javascript
querystring.parse('foo=bar&abc=xyz&abc=123');
// => { foo: 'bar', abc: [ 'xyz', '123' ] }
```

<h2>querystring.stringify</h2>

序列化 url 字符串

```javascript
querystring.stringify(res);
// => foo=bar&abc=xyz&abc=123
```




