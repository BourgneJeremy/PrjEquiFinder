import { homePage, addPage, findPage } from "./templates.js";

var url = window.location.pathname;

var homeTemplate = homePage;
var addTemplate = addPage;
var findTemplate = findPage;

if (url === "/EquiFinder/") {
	if ($("#addPage").innerHTML !== null) {
		$("#addPage").hide();
	}
	
	if ($("#findPage").innerHTML !== null) {
		$("#findPage").hide();
	}
	
	$("#homePage").prepend(homeTemplate);
	$("#homePage").show();
	
} else if (url === "/EquiFinder/ajouter") {
	if ($("#homePage").innerHTML !== null) {
		$("#homePage").hide();
	}
	
	if ($("#findPage").innerHTML !== null) {
		$("#findPage").hide();
	}
	
	$("#addPage").prepend(addTemplate);
	$("#addPage").show();
	
} else if (url === "/EquiFinder/rechercher" || url === "/EquiFinder/FindServlet") {
	if ($("#homePage").innerHTML !== null) {
		$("#homePage").hide();
	}
	
	if ($("#addPage").innerHTML !== null) {
		$("#addPage").hide();
	}
	
	$("#findPage").prepend(findTemplate);
	$("#findPage").show();
}