var express = require('express');
 var http = require('http')
 var https = require('https')
var app = express();
var jie = express()
app.use('/static',express.static(__dirname + '/public'));
// console.log(__dirname + '/public');
jie.get('/',function(req, res){
    console.log(jie.mountpath); // /jie
    res.send('Jie Homepage');
})

app.get('/', function(req, res) {
    res.send('hello world!');

});
app.use('/jie', jie)
// app.listen(5000);
// http .createServer(app).listen(5000);
https.createServer({}, app).listen(443);
 