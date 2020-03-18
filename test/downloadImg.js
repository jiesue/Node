

//var async = require("async"); // 解决异步问题

const { getHtml, fsDownload } = require('./utils');

let myPath = 'test/dl/'
let imgReg = /<img.*?(?:>|\/>)/gi;
let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
let url = 'http://www.win4000.com/wallpaper.html'
getHtml(url).then(res => {

    $ = cheerio.load(res);
    res = $.html()
    let imgArr = res.match(imgReg)
    // console.log(res.toString());
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
        fsDownload(src, myPath + fileName)
    }
})
// fsWrite(uri, path)
// const dest = path.join('custom_path', 'filename.extname');
// 你可能需要自行确保该路径存在
// getHtml(url)