# NodeJS线上部署


标签（空格分隔）： Notes

---

`app.js`

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'hello mac'
});

app.listen('1234');
```

`nginx-conf/nginx.conf`

```javascript
upstream web_crm {
  server 192.168.0.169:1234;
  server 192.168.0.154:1234;
}

server {
  listen 8080;
  location / {
    proxy_pass http://web_crm;
  }
}
```

`pm2.json`

```javascript
{
  "name": "app",
  "script": "./app.js",
  "watch": true,
  "instances": "max",
  "exec_mode": "cluster"
}
```

线上只需要`npm install --production`就行。

第一次弄遇到[权限](https://stackoverflow.com/questions/23948527/13-permission-denied-while-connecting-to-upstreamnginx)问题。

```javascript
# setsebool -P httpd_can_network_connect 1
```




