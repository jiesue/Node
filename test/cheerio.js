var cheerio = require('cheerio'); //快速、灵活、实施的jQuery核心实现
$ = cheerio.load('<h2 class = "title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');
console.log($.html());
