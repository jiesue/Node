let express = require('express');
let router = require('./router')
let app = express()
app.use(router);
app.use(express.static("/jie"))
app.listen(8000,()=>{
    console.log('serve in 8000 port');
})
