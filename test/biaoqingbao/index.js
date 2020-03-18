/*
 *@description:获取表情包
 *@author: zyj
 *@date: 2020-03-17 15:58:47
 *@version: V1.0.0
*/
const { createFloder, fsDownload, getHtml, delDir, readDir, deleteFile, copyFolder, deleteFolder } = require('../utils')
var cheerio = require('cheerio');
let fs = require('fs')
console.log('开始');
let baseUrl = 'https://www.fabiaoqing.com/';

let $;
let pageSize = 1;
//获取列表页中的详情页的URL 返回链接数组
async function getPageUrlArr(url) {
    let htmlContent = await getHtml(url)
    // console.log(htmlContent);
    let pageUrlArr = []
    $ = cheerio.load(htmlContent);
    $('.bqba').each((i, item) => {
        let pageUrl = baseUrl + $(item).attr('href')
        pageUrlArr.push(pageUrl)
    })
    return pageUrlArr;

}

//获取一个详情页中图片链接并返回下载promise数组
function getDownloadPromiseArr(htmlContent) {
    let $ = cheerio.load(htmlContent);
    let promiseObj = [];
    // console.log( $('.bqbppdetail') );
    let title = $('#container h1.ui.header').eq(0).text();
    title = title.replace(/[^\u4e00-\u9fa5|,]+/g, '')
    let floderPath = './biaoqingbao/' + title;
    createFloder(floderPath)
    $('.bqbppdetail.lazy').each((i, item) => {
        let url = $(item).attr('data-original');
        // console.log(url);
        let fileName = url.replace(/(.*\/)*([^.]+)/i, "$2");
        let p = fsDownload(url, floderPath + '/' + fileName);
        promiseObj.push(p)
    })
    return promiseObj
}

let maxPage = 2

// 主函数
async function ask() {
    console.log('start');
    let requestUrl = `https://www.fabiaoqing.com/bqb/lists/type/hot/page/${pageSize++}.html`;
    if (pageSize > maxPage) return;
    console.log('step 1');
    let pageUrlArr = await getPageUrlArr(requestUrl);
    console.log('step 2');

    let htmlP = [];
    pageUrlArr.forEach(url => {
        htmlP.push(getHtml(url))
    });
    console.log('step 3');
    Promise.all(htmlP).then((result) => {
        result.forEach(res => {
            let downloadP = getDownloadPromiseArr(res);
            Promise.all(downloadP).then(res => {
                //迭代
                ask()
            })
        });
    })

}

ask()