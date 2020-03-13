const http = require('http');
const fs = require('fs');
const path = require('path');

function getHtml(url) {
    return new Promise(function (resolve, reject) {
        let html;
        http.get(url, function (res) {
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
        if (res.statusCode !== 200) {
            cb(response.statusCode);
            return;
        }
        res.on('end', () => {
            console.log('finish download');
        });
        // 进度、超时等
        ws.on('finish', () => {
            ws.close();
        }).on('error', (err) => {
            fs.unlink(path);
        });

        res.pipe(ws);
    });
}

let myPath = 'test/dl/'
let imgReg = /<img.*?(?:>|\/>)/gi;
let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
let url = 'http://www.baidu.com/'
getHtml(url).then(res => {
    let imgArr = res.match(imgReg)
    var src = imgArr[0].match(srcReg)[1];
    if (src.indexOf('//') > -1) {
        src = 'http:' + src
    } else {
        src = 'http://' + src
    }
    let fileName = src.replace(/(.*\/)*([^.]+)/i, "$2");
    console.log(src);
    write(src, myPath + fileName)
})
// write(uri, path)
// const dest = path.join('custom_path', 'filename.extname');
// 你可能需要自行确保该路径存在
