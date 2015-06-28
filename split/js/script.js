var modify_buttons = function(id) {
	$(id).click(function() {
		var c = "." + id.substr(1,3) + "-btn";
		$(c).toggleClass("disabled");
	});

}

var main = function() {
	modify_buttons('#tax_box');
	modify_buttons('#tip_box');
	$('#tax_value').attr({
		'data-toggle': "modal",
	 	'data-target': "#taxModal" 
	});
}

$(document).ready(main);