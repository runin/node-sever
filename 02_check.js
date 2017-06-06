var http = require("http");
var url = require("url");

var server = http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    if(path == "/favicon.ico") return;
    if(/^\/(student|teacher)/gi.test(path)){
        if(/^\/student\/\d{9}$/gi.test(path)){
            res.writeHead(200, {"Content-Type": "text/html;charset=UTF8"});
            res.end(`您所查询的学生id为：${path.match(/\d{9}$/)}`);
        }else if(/^\/teacher\/\d{6}$/gi.test(path)){
            res.writeHead(200, {"Content-Type": "text/html;charset=UTF8"});
            res.end(`您所查询的老师id为：${path.match(/\d{6}$/)}`);
        }else{
            res.writeHead(200, {"Content-Type": "text/html;charset=UTF8"});
            res.end(`您的id不对`);
        }
    }else{
        res.writeHead(404, {"Content-Type": "text/html;charset=UTF8"});
        res.end("只能帮你的到这里了，嘻嘻~~~");
    }
});
server.listen(3000, "127.0.0.1");