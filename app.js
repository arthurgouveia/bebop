var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('src'));

var server = app.listen(port, function () {
  console.log('App listening at port %s', port);
});
