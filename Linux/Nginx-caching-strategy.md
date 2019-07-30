# Nginx缓存策略

标签（空格分隔）： Linux

---

```javascript
http {
    # etag缓存策略
    etag off;
    #gzip  on;
    # 所有的都缓存30天强缓
    #expires 30d;
    # 不让浏览器缓存
    add_header Cache-Control no-cache;
    
    server {
        listen       8080;
        server_name  localhost;

        #location ~ \.(gif|jpg|jpeg|png|bmp|ico)$ {
        #    root /usr/local/var/www/img/;
        #    expires 30d;
        #}
    }
}
```




