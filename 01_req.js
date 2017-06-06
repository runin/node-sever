var http = require("http");
var fs = require("fs");
var url = require("url");
var server = http.createServer(function(req, res){
    if(req.url == "/favicon.ico") return;
    var path = url.parse(req.url).pathname;
    var query = url.parse(req.url, true).query;
    var name = query.name;
    var age = query.age;
    res.writeHead(200, {"Content-Type": "text/html;charset=UTF8"});

    res.end(`服务器接收到的参数是name=${name}---age=${age}`);
});
server.listen(3000, "127.0.0.1");