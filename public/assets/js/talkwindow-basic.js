window.lastLine = "";
window.alwaysxi = 0;
function refresh(){
	jQuery.get("./safe_getlasttalked", function(resp){
		if (window.lastLine != resp) {
			if (window.lastLine != "") {
				if (!isXile(resp))
					document.getElementById("nmsg").play();
				else {
					window.alwaysxi += 1
					checkXi(window.alwaysxi);
					document.getElementById("wxl").play();
				}
			}
			window.lastLine = resp;
			var _p = document.createElement("p");
			_p.innerHTML = window.lastLine;
			document.body.appendChild(_p);
		}
	});
}
function isXile(str){
	var zstr = str.toLowerCase();
	return (
		(
		zstr.indexOf("wo") >= 0 && 
		zstr.indexOf("xi") >= 0// &&
		// zstr.indexOf("le") >= 0
		) ||
		zstr.indexOf("汐") >= 0
	)
}
function checkXi(xi){
	var txi = parseInt(xi / 2);
	console.log(txi);
	switch (txi){
		case 1:
			document.getElementById("wxl").src = "./assets/sounds/woxile.ogg";
			break;
		case 4:
			document.getElementById("wxl").src = "./assets/sounds/woxl2.ogg";
			break;
		case 8:
			document.getElementById("wxl").src = "./assets/sounds/xile.ogg";
			break;
		default:
			if (txi >= 9)
				window.alwaysxi = 0;
			break;
	}
}
setInterval(refresh, 50);