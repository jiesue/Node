const http = require('http');
const https = require('https');

const fs = require('fs');
const path = require('path');

function getHtml(url) {
    return new Promise(function (resolve, reject) {
        let html;
        let myhttp = url.indexOf('https') > -1 ? https : http;
        myhttp.get(url, function (res) {
            res.on("data", (data) => {
                html += data
            })
            res.on("end", () => {
                html = html.toString()
                resolve(html)
            })
        }).on("error", (e) => {
            reject(e)
        })
    })
}
function write(uri, path) {
    let ws = fs.createWriteStream(path);
    http.get(uri, (res) => {
        console.log(res);
        if (!res || res.statusCode !== 200) {
            console.log('444');
            return;
        }
        res.on('end', () => {
            console.log('finish download');
        });
        // 进度、超时等
        res.pipe(ws);
        ws.on('finish', () => {
            ws.close();
        }).on('error', (err) => {
            console.log('写错误');
        });


    }).on('error', (err) => {
        fs.unlink(path, function () {
            console.log('删除成功');
        });
        console.error(err);
    })
}

let myPath = 'test/dl/'
let imgReg = /<img.*?(?:>|\/>)/gi;
let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
let url = 'http://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=%E8%8A%B1%E7%93%A3%E7%BD%91'
getHtml(url).then(res => {
    let imgArr = res.match(imgReg)
    console.log(res.toString());
    for (let index = 0; index < imgArr.length; index++) {
        console.log(index);
        let element = imgArr[index];
        let src = element.match(srcReg)[1];
        if (src == 'http://' || src == 'https://' || src == '') return;
        if (src.indexOf('http://') > -1) {
            src = src
        } else if (src.indexOf('//') > -1) {
            src = 'http:' + src
        } else {
            src = 'http://' + src
        }
        let fileName = src.replace(/(.*\/)*([^.]+)/i, "$2");
        console.log(src);
        write(src, myPath + fileName)
    }


})
// write(uri, path)
// const dest = path.join('custom_path', 'filename.extname');
// 你可能需要自行确保该路径存在
