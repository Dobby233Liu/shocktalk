window.lastLine = "";
function refresh(){
	jQuery.get("./safe_getlasttalked", function(resp){
		if (window.lastLine != resp) {
			window.lastLine = resp;
			var _p = document.createElement("p");
			_p.innerHTML = window.lastLine;
			document.body.appendChild(_p);
			document.getElementById("nmsg").play();
		}
	});
}
setInterval(refresh, 50);