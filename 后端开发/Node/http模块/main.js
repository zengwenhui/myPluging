"use strict"
var http = require("http");
var url = require("url");
var server = http.createServer((request, response) => {
    console.log("请求方式：" + request.method)
    console.log("请求的url" + request.url)
    console.log(url.parse("http://user:pass@host.com:8080/path/to/file?query=string#hash"))
    response.writeHead(200, {
        "Content-type": "text/javascript"
    })
    response.end("{'data':{}}")
})
server.listen(8001)
console.log("服务创建成功")