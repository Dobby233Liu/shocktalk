window.lastLine = "";
function refresh(){
	jQuery.get("./safe_getlasttalked", function(resp){
		if (window.lastLine != resp) {
			if (window.lastLine != "") document.getElementById("nmsg").play();
			window.lastLine = resp;
			var _p = document.createElement("p");
			_p.innerHTML = window.lastLine;
			document.body.appendChild(_p);
		}
	});
}
setInterval(refresh, 50);