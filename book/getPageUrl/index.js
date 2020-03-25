/*
 *@description:获取表情包详情页面链接
 *@author: zyj
 *@date: 2020-03-25 12:00:13
 *@version: V1.0.0
*/

const { createFloder, fsDownload, getHtml, delDir, readDir, deleteFile, copyFolder, deleteFolder } = require('../../utils')
var cheerio = require('cheerio');
let fs = require('fs')
let maxPageSize = 100;
let nowPage = 1;
console.log('开始');
let baseUrl = 'https://www.fabiaoqing.com';
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'mysql.zyj1221.club',
    user: 'root',
    password: '123',
    database: 'expressions',
    supportBigNumbers: true,
    // debug: true
});

connection.connect();


// connection.query(sql, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results, fields);
//     // console.log('The solution is: ', results[0].solution);
// });



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

async function ask() {
    if (nowPage > maxPageSize) return;
    let requestUrl = `https://www.fabiaoqing.com/bqb/lists/type/hot/page/${nowPage++}.html`;

    let res = await getPageUrlArr(requestUrl)
    res.forEach(element => {
        let sql = "INSERT INTO `pageUrl` (`id`, `url`) VALUES (NULL, '" + element + "');"
        console.log(sql);
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log(results, fields);
            // console.log('The solution is: ', results[0].solution);
        });
    });
    setTimeout(() => {
        ask()
    }, 1000);
}
ask()