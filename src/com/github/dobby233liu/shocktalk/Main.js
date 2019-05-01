const express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');
var readline = require('readline');
var he = require('he');

eval(fs.readFileSync("./src/com/github/blowsie/htmlparser.js", "utf8"));

function readFileToArr(fReadName,callback){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        arr.push(line);
    });
    objReadline.on('close',function () {
        callback(arr);
    });
}

function parse (str) {
      // str假如为某个DOM字符串
      // 1. result为处理之后的DOM节点
      let result = ''
      // 2. 解码
      let decode = he.unescape(str, {
          strict: true
      })
      HTMLParser(decode, {
          start (tag, attrs, unary) {
              // 3. 过滤常见危险的标签
              if (tag === 'script' || tag === 'link' || tag === 'style' || tag === 'iframe' || tag === 'frame') return
              result += "<" + tag
              for (let i = 0; i < attrs.length; i++) {
                  let name = (attrs[i].name).toLowerCase()
                  let value = attrs[i].escaped
                  // 3. 过滤掉危险的style属性和js事件
                  if (name === 'style' || name === 'href' || name === 'src' || ~name.indexOf('on')) continue
                  result += ` ${name}=${value}`
              }
              result += `${unary ? ' /' : ''} >`
          },
          chars (text) {
              result += text
          },
          comment (text) {
              result += `<!-- ${text} -->`
          },
          end (tag) {
              result += `</${tag}>`
          }
      })
      return result
}

module.exports.main = function(argv, moduleDirectory){
	const app = express();
	if (argv.length < 1)
		throw new Error("You must specify a port!");
	console.log("-- Shocktalk server starting~! --");
	app.use(express.static(moduleDirectory + '/public'));
	app.use(bodyParser.text());
	app.post("/add", function(req, res, next){
		console.log(req.body);
		res.send(req.body + '?');
		var mBuf = Buffer.from(parse(req.body));
		fs.appendFileSync(moduleDirectory + "/data/talked.txt", mBuf, "utf8");
	});
	app.get("/safe_getlasttalked", function(req, res, next){
		readFileToArr(moduleDirectory + "/data/talked.txt", function(array){
			res.send(array[array.length - 1]);
		});
	});
	app.listen(argv[0], () => console.log("Shocktalk started on port " + argv[0] + "!"))
}