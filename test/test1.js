
// console.log(fs);
// let buf =new Buffer.allocUnsafe(5);
// console.log(new Buffer.allocUnsafe(1));

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

// var util = require('util');
// function Base() {
//     this.name = 'base';
//     this.base = 1991;
//     this.sayHello = function () {
//         console.log('Hello ' + this.name);
//     };
// }
// Base.prototype.showName = function () {
//     console.log(this.name);
// };
// function Sub() {
//     this.name = 'sub';
// }
// util.inherits(Sub, Base);
// var objBase = new Base();
// objBase.showName();
// objBase.sayHello();
// console.log(objBase);
// var objSub = new Sub();
// objSub.showName();
// //objSub.sayHello(); 
// console.log(objSub); 


// var fs = require('fs')
// var buf = new Buffer.alloc(9);
// console.log(buf);
// let fd;
// fd = fs.openSync('input.txt', 'r+')
// console.log(fd);
// let stats = fs.statSync('input.txt')
// console.log(stats.isFile(), stats.isDirectory());

// fs.read(fd, buf, 3, 4, 2, function (err, bytesRead, buffer) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(bytesRead + "  字节被读取");
//     console.log(buf, buf.toString());
//     fs.close(fd, function (err) {
//         if (err) {
//             console.log(err);
//         }
//         console.log("文件关闭成功");
//     });
// })
// console.log("准备删除文件！");

// fs.unlink('input.txt', function(err) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("文件删除成功！");
// });

// var fs = require("fs");
// // tmp 目录必须存在
// console.log("创建目录 /test/jie/");
// fs.mkdir("jie23ewq",function(err){
//    if (err) {
//        return console.error(err);
//    }
//    console.log("目录创建成功。");
// });
// fs.mkdir('./22/a/apple2', { recursive: true }, (err) => {
//     if (err) throw err;

//   });


// var fs = require("fs");

// console.log("查看 /test 目录");
// function my(file) {
//     fs.readdir(file, function (err, files) {
//         if (err) {
//             return console.error(err);
//         }
//         files.forEach(function (file1) {
//             console.log(file1);
//             let stat = fs.statSync(file)
//             if (stat.isDirectory()) {
//                 my(file1)
//             }
//         });
//     });
// }
// my('test')


// const fs = require("fs");

// //设置根目录
// var root = './佐证材料';

// var arr = [];

// //获取此文件夹下所有的文件(数组)
// var files = fs.readdirSync(root);

// //遍历这些文件或者文件夹
// for(var i=0;i<files.length;i++){
//     //为文件创建一个描述对象
//     var filePath = {};
//     //添加name属性
//     filePath.name = files[i];
//     var fileStat = fs.statSync(path.join(root,files[i]));
//     //判断是否是文件夹
//     if(fileStat.isDirectory()){
//         //文件夹类型则添加type属性为dir
//         filePath.type = 'dir';
//     }else{
//         //文件类型则添加type属性为文件后缀名
//         filePath.type = path.extname(files[i]).substring(1);
//     }
//     //将对象添加到数组中
//     arr.push(filePath);
// }
// //将数组转换成字符串后写入data.txt文件中保存
// fs.writeFileSync('./data.txt', JSON.stringify(arr));





// 执行前创建一个空的目录
console.log("准备!!");
// fs.rmdir('22', function (err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log('delete successful');
// })
// fs.readdir("/", function (err, files) {
//     if (err) {
//         return console.error(err);
//     }
//     files.forEach(function (file) {
//         console.log(file);
//     });
// });


// function deleteFolderRecursive(path) {
//     if( fs.existsSync(path) ) {
//         fs.readdirSync(path).forEach(function(file) {
//             var curPath = path + "/" + file;
//             if(fs.statSync(curPath).isDirectory()) { // recurse
//                 deleteFolderRecursive(curPath);
//             } else { // delete file
//                 fs.unlinkSync(curPath); 
//             }
//         });
//         fs.rmdirSync(path);
//     }
// };
// deleteFolderRecursive('test/a/')

// var http = require('http');
// var url = require('url');
// var util = require('util');

// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
//     res.end(util.inspect(url.parse(req.url, true)));
// }).listen(8000);

// var http = require('http');
// var querystring = require('querystring');

// var postHTML = 
//   '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
//   '<body>' +
//   '<form method="post">' +
//   '网站名： <input name="name"><br>' +
//   '网站 URL： <input name="url"><br>' +
//   '<input type="submit">' +
//   '</form>' +
//   '</body></html>';

// http.createServer(function (req, res) {
//   var body = "";
//   req.on('data', function (chunk) {
//     body += chunk;
//   });
//   req.on('end', function () {
//     // 解析参数
//     body = querystring.parse(body);
//     // 设置响应头部信息及编码
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

//     if(body.name && body.url) { // 输出提交的数据
//         res.write("网站名：" + body.name);
//         res.write("<br>");
//         res.write("网站 URL：" + body.url);
//     } else {  // 输出表单
//         res.write(postHTML);
//     }
//     res.end();
//   });
// }).listen(10);


// var os = require("os")
// console.log(os.loadavg());
//express_demo.js 文件
// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//    res.send('Hello World');
// })

// var server = app.listen(8081, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })


// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'mysql.zyj1221.club',
//     user: 'root',
//     password: '123',
//     database: 'typecho',
//     supportBigNumbers: true,
//     // debug: true
// });

// connection.connect();
// let sql = " select * from `typecho_comments`; "

// connection.query(sql, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results, fields);
//     // console.log('The solution is: ', results[0].solution);
// });






