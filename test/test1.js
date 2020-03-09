// let  fs = require('fs');
// console.log(fs);
// let buf = Buffer.allocUnsafe(5);
// console.log(buf);

// var http = require("http");
// http.createServer(function (request, response) {

//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, { 'Content-Type': 'text/plain' });

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');



// // 引入 events 模块
// var events = require('events');
// // 创建 eventEmitter 对象
// var eventEmitter = new events.EventEmitter();

// // 创建事件处理程序
// var connectHandler = function connected() {
//     console.log('连接成功。');

//     // 触发 data_received 事件 
//     eventEmitter.emit('data_received');
// }

// // 绑定 connection 事件处理程序
// eventEmitter.on('connection', connectHandler);

// // 使用匿名函数绑定 data_received 事件
// eventEmitter.on('data_received', function () {
//     console.log('数据接收成功。');
// });

// // 触发 connection 事件 
// eventEmitter.emit('connection');

// console.log("程序执行完毕。");


// var fs = require("fs");

// // fs.writeFileSync('input.txt','jie de file')
// // 异步读取
// fs.readFile('input.txt', function (err, data) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("异步读取: " + data.toString());
// });

// // 同步读取
// var data = fs.readFileSync('input.txt');
// console.log("同步读取: " + data.toString());

// console.log("程序执行完毕。");

// var data='';

// // 创建可读流
// var readerStream = fs.createReadStream('input.txt');
// // 设置编码为 utf8。
// readerStream.setEncoding('UTF8');

// // 处理流事件 --> data, end, and error
// readerStream.on('data', function(chunk) {
//    data += chunk;
//    console.log(chunk,1);
// });
// readerStream.on('end',function(){
//     console.log(data);
//  });

//  readerStream.on('error', function(err){
//     console.log(err.stack);
//  });

var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function () {
        console.log('Hello ' + this.name);
    };
}
Base.prototype.showName = function () {
    console.log(this.name);
};
function Sub() {
    this.name = 'sub';
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
//objSub.sayHello(); 
console.log(objSub); 