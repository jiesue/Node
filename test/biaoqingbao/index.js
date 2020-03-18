/*
 *@description:获取表情包
 *@author: zyj
 *@date: 2020-03-17 15:58:47
 *@version: V1.0.0
*/
const { fsWrite, getHtml, delDir, readDir, deleteFile, copyFolder, deleteFolder } = require('../utils')
var cheerio = require('cheerio');
let fs = require('fs')
console.log('开始');
let baseUrl = 'https://www.fabiaoqing.com/';

let $;
let pageUrlList = [];
let pageTitleList = [];
let requestUrl = 'https://www.fabiaoqing.com/bqb/lists/type/hot/page/1.html';
async function getPicPageUrl(url) {
    let htmlContent = await getHtml(url)
    $ = cheerio.load(htmlContent);
    $('.bqba').each((i, item) => {
        let title = $(item).find('.ui.header').text()
        pageTitleList.push(title)
        fs.writeFileSync('test/biaoqingbao/title.txt', title+'\r\n', {flag:'a'})
        pageUrlList.push(baseUrl + $(item).attr('href'))
        console.log(baseUrl + $(item).attr('href'));
    })

}

getPicPageUrl(requestUrl)
