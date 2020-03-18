const http = require('http');
const https = require('https');
const request = require('request');
const fs = require('fs');
const path = require('path');
// const iconv = require('iconv-lite'); //转码
// const cheerio = require('cheerio'); //快速、灵活、实施的jQuery核心实现

function getHtml(url) {
    return new Promise(function (resolve, reject) {
        let html;
        let myhttp = url.indexOf('https') > -1 ? https : http;
        // headers: {
        //     "Connection": "keep-alive",
        //     "Content-Length": 111,
        //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        //     "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        // }//伪造请求头
        request({
            url: url,//请求路径
            method: "POST",//请求方式，默认为get
            headers: {//设置请求头
                "Connection": "keep-alive",
                "Content-Length": 111,
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
            },
           // body: JSON.stringify(requestData)//post参数字符串
        }, function (error, response, body) {
            // console.log(body) // 请求成功的处理逻辑
            resolve(body)
        })
    });
}

function fsWrite(uri, path) {
    let ws = fs.createWriteStream(path);
    console.log('下载链接：' + uri);
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

function delDir(path) {
    return new Promise(function (resolve, reject) {
        fs.rmdir(path, function (err) {
            if (err) {
                reject(err);
            }
            resolve('delete successful');
        })
    })

}

function readDir(path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, function (err, files) {
            if (err) {
                reject(err);
            }
            resolve(files)
        });
    })

}

function deleteFile(delPath, direct) {
    delPath = direct ? delPath : path.join(__dirname, delPath)
    try {
        /**
         * @desc 判断文件或文件夹是否存在
         */
        if (fs.existsSync(delPath)) {
            fs.unlinkSync(delPath);
        } else {
            console.log('inexistence path：', delPath);
        }
    } catch (error) {
        console.log('del error', error);
    }
}

/**
 * * @param { direct：Boolean } （是否需要处理地址）
 */
function copyFolder(copiedPath, resultPath, direct) {
    if (!direct) {
        copiedPath = path.join(__dirname, copiedPath)
        resultPath = path.join(__dirname, resultPath)
    }

    function createDir(dirPath) {
        fs.mkdirSync(dirPath)
    }

    if (fs.existsSync(copiedPath)) {
        createDir(resultPath)
        /**
         * @des 方式一：利用子进程操作命令行方式
         */
        // child_process.spawn('cp', ['-r', copiedPath, resultPath])

        /**
         * @des 方式二：
         */
        const files = fs.readdirSync(copiedPath, { withFileTypes: true });
        for (let i = 0; i < files.length; i++) {
            const cf = files[i]
            const ccp = path.join(copiedPath, cf.name)
            const crp = path.join(resultPath, cf.name)
            if (cf.isFile()) {
                /**
                 * @des 创建文件,使用流的形式可以读写大文件
                 */
                const readStream = fs.createReadStream(ccp)
                const writeStream = fs.createWriteStream(crp)
                readStream.pipe(writeStream)
            } else {
                try {
                    /**
                     * @des 判断读(R_OK | W_OK)写权限
                     */
                    fs.accessSync(path.join(crp, '..'), fs.constants.W_OK)
                    copyFolder(ccp, crp, true)
                } catch (error) {
                    console.log('folder write error:', error);
                }

            }
        }
    } else {
        console.log('do not exist path: ', copiedPath);
    }
}

function deleteFolder(delPath) {
    delPath = path.join(__dirname, delPath)

    try {
        if (fs.existsSync(delPath)) {
            const delFn = function (address) {
                const files = fs.readdirSync(address)
                for (let i = 0; i < files.length; i++) {
                    const dirPath = path.join(address, files[i])
                    if (fs.statSync(dirPath).isDirectory()) {
                        delFn(dirPath)
                    } else {
                        deleteFile(dirPath, true)
                    }
                }
                /**
                * @des 只能删空文件夹
                */
                fs.rmdirSync(address);
            }
            delFn(delPath);
        } else {
            console.log('do not exist: ', delPath);
        }
    } catch (error) {
        console.log('del folder error', error);
    }
}

module.exports = { fsWrite, getHtml, delDir, readDir, deleteFile, copyFolder, deleteFolder }