# node基础api-crypto加密

标签（空格分隔）： Node

---

`crypto` 模块也是核心模块之一，提供了加密功能，包括对 `OpenSSL` 的哈希、`HMAC`、加密、解密、签名、以及验证功能的一整套封装。

<h2>MD5和SHA1</h2>

`MD5`是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：

```javascript
const crypto  = require('crypto');

const hash = crypto.createHash('md5');

// 可任意多次调用update()
hash.update('hello world');
hash.update('my namne is ty');

console.log(hash.digest('hex'))
// => 4ffc67c96a9db73178affc6f09d5a0e0
```

- [crypto.createHash(algorithm [，options])](http://nodejs.cn/api/crypto.html#crypto_crypto_createhash_algorithm_options) ：`algorithm`取决于平台上 OpenSSL 版本支持的可用算法。示例是'md5'，'sha256'，'sha512'等等
- [hash.update(data [，inputEncoding])](http://nodejs.cn/api/crypto.html#crypto_hash_update_data_inputencoding)：根据 `data`更新`hash`的内容,编码方式为 `inputEncoding`可以是 'utf8', 'ascii' 或者 'latin1'。也可以传入 Buffer
- [hash.digest(encoding)](http://nodejs.cn/api/crypto.html#crypto_hash_digest_encoding)：`encoding` 值可以是 'hex', 'latin1' 或者 'base64'. 如果`encoding` 输入的是字符串会被直接返回; 其它情况会返回一个 `a Buffer`.

<hr/>
<h2>Hmac</h2>

`Hmac`算法也是一种哈希算法，它可以利用`MD5`或`SHA1`等哈希算法。不同的是，`Hmac`还需要一个密钥：

```javascript
const crypto  = require('crypto');

const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('hello world');
hmac.update('my namne is ty');

console.log(hmac.digest('hex'))
// => a5aa9ac50a19b836d2bc4d427a6c470b809b9dad8f11da08adfe8261133dac67
```

只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以吧`Hmac`理解为用随机数“增强”的哈希算法。

<hr/>
<h2>AES</h2>

`AES`是一种常用的对称加密算法，加解密都用同一个密钥，`crypto`模块[Cipher 类](http://nodejs.cn/api/crypto.html#crypto_class_cipher)提供了`AES`支持，但是需要自己封装好函数，便于使用：

```javascript
// 加密
function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

// 解密
function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

var data = '你好，这是一段加密的消息'
var key = 'passworld!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log(`Plain text: ${data}`)
console.log(`Encrypt: ${encrypted}`)
console.log(`Decrypt: ${decrypted}`)
```

运行结果如下：

    Plain text: 你好，这是一段加密的消息
    Encrypt: c69c4355780dc153ffcc643eb...
    Decrypt: 你好，这是一段加密的消息

注意到`AES`有很多不同的算法，如`aes192`, `aes-128-ecb`, `aes-256-cbc`


<hr/>
<h2>Diffle-Hellman</h2>

[没看懂后面的代码，廖雪峰](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025778520640)

```javascript
var ming = crypto.createDiffieHellman(10);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log(`🍎Prime: ${prime.toString('hex')}`)
console.log(`🍎Generator: ${generator.toString('hex')}`)

var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

console.log(`🍌Secret of Xiao Ming: ${ming_secret.toString('hex')}`)
console.log(`🍌Secret of Xiao Hong: ${hong_secret.toString('hex')}`)
```

运行后的结果是：

    🍎Prime: 8c7b
    🍎Generator: 02
    🍌Secret of Xiao Ming: 0421
    🍌Secret of Xiao Hong: 0421


<hr/>
<h2>RSA</h2>

`RSA`算法是一种非对称加密算法，即由一个私钥和一个公钥构成的密钥对。通过私钥加密，公钥解密，或者通过公要加密，私钥解密。其中，公钥可以公开，私钥必须保密。

在使用 Node 进行 RSA 加密前，我们先要准备好私钥和公钥。

首先，在命令行执行以下命令以生成一个RSA密钥对：

```javascript
# openssl genrsa -aes256 -out rsa-key.pem 2048
```

根据提示输入密码，这个密码是用来加密`RSA`密钥的，加密方式指定为`AES256`，生成的`RSA`的密钥长度是`2048`位。执行成功后，我们获得了加密的`rsa-key.pem`文件。

第二步，通过上面的`rsa-key.pem`加密文件，我们可以导出原始的私钥，命令如下：

```javascript
# openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
```

输入第一步的密码，我们获得了解密后的私钥。

类似的，我们用下面的命令导出原始的公钥：

```javascript
# openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem
```

这样，我们就准备好了原始私钥文件`rsa-prv.pem`和原始公钥文件`rsa-pub.pem`，编码格式均为`PEM`。

下面，使用`crypto`模块提供的方法，即可实现非对称加解密。

首先，我们用私钥加密，公钥解密：

```javascript
const
    fs = require('fs'),
    crypto = require('crypto');

// 从文件加载key:
function loadKey(file) {
    // key实际上就是PEM编码的字符串:
    return fs.readFileSync(file, 'utf8');
}

let
    prvKey = loadKey('./rsa-prv.pem'),
    pubKey = loadKey('./rsa-pub.pem'),
    message = 'Hello, world!';

// 使用私钥加密:
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8'));
console.log('encrypted by private key: ' + enc_by_prv.toString('hex'));


let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'));
```

执行后，可以得到解密后的消息，与原始消息相同。

接下来我们使用公钥加密，私钥解密：

```javascript
// 使用公钥加密:
let enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf8'));
console.log('encrypted by public key: ' + enc_by_pub.toString('hex'));

// 使用私钥解密:
let dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub);
console.log('decrypted by private key: ' + dec_by_prv.toString('utf8'));
```

执行得到的解密后的消息仍与原始消息相同。

`crypto`模块也可以处理数字证书。数字证书通常用在`SSL`连接，也就是`Web`的`https`连接。一般情况下，`https`连接只需要处理服务器端的单向认证，如无特殊需求（例如自己作为`Root`给客户发认证证书），建议用反向代理服务器如`Nginx`等`Web`服务器去处理证书。