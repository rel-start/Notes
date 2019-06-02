const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/views/" + "index.html");
});


var server = app.listen(8081, () => {
  console.log('接口已启动');
});
















