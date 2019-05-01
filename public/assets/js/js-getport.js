if 
	(location.port != "") 
{
	document.write(location.port);
} else {
	document.write("80");
}
document.write(".");
document.getElementById("port").remove();