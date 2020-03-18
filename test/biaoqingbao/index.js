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
let pageUrlList = [];
let pageSize = 1;
let requestUrl = `https://www.fabiaoqing.com/bqb/lists/type/hot/page/${pageSize}.html`;
async function getPicPageUrl(url) {
    let htmlContent = await getHtml(url)
    // console.log(htmlContent);
    $ = cheerio.load(htmlContent);
    $('.bqba').each((i, item) => {
        let pageUrl = baseUrl + $(item).attr('href')
        console.log(i);
        // pageUrlList.push(baseUrl + $(item).attr('href'))
        setTimeout(() => {
            getHtml(pageUrl).then(res => {
                getImgUrl(res)
            })
        }, 1000 * i);

    })

}
//async function return a Promise without res
// getPicPageUrl(requestUrl).then(res => {

//     getHtml(pageUrlList[0]).then(res => {
//         getImgUrl(res)
//     })
// })
let imgUrlList = [];
function getImgUrl(htmlContent) {
    let $ = cheerio.load(htmlContent);
    // console.log( $('.bqbppdetail') );

    let title = $('#container h1.ui.header').eq(0).text();
    title = title.replace(/[^\u4e00-\u9fa5|,]+/g, '')
    let floderPath = './biaoqingbao/' + title;
    createFloder(floderPath)
    $('.bqbppdetail.lazy').each((i, item) => {
        let url = $(item).attr('data-original');
        // console.log(url);
        let fileName = url.replace(/(.*\/)*([^.]+)/i, "$2");
        fsDownload(url, floderPath + '/' + fileName);
    })
}

let maxPage = 10

for (let i = 1; i < maxPage + 1; i++) {
    let requestUrl = `https://www.fabiaoqing.com/bqb/lists/type/hot/page/${i}.html`;
    setTimeout(() => {
        getPicPageUrl(requestUrl)
    }, i * 1000);
}
