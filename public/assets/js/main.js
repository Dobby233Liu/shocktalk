window.usrName = "Guest";
function newUserA(){
	window.usrName = parse(document.getElementById("usrname").value);
	document.getElementById("nuser").style.display = "none";
	document.getElementById("inpt").style.display = "block";
}
function submitA(){
	var c = parse(document.getElementById("cnte").value);
	post("./add", "\n[" + window.usrName + "-" + fmtTime(new Date()) + "] " + c, function(r){
		console.log(r);
	});
	document.getElementById("cnte").value = "";
}
function post(url, content, callback){
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		callback(this.responseText);
	};
	xhr.open("POST", url);
	xhr.send(content);
}
function fmtTime(hObj){
	return fmt0s(hObj.getHours()) + ":" + fmt0s(hObj.getMinutes()) + ":" + fmt0s(hObj.getSeconds());
}
function fmt0s(num){
	if (num.toString().length == 1){
		return "0" + num;
	}
	return num.toString();
}
function parse (str) {
	try{
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
					  if (name === 'href' || ~name.indexOf('on')) continue
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
		  });
		  return result
	}catch(e){
		console.error(e);
		return str;
	}
}