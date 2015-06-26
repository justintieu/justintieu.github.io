var modify_buttons = function(id) {
	var new_id = '#'+id;
	var c = "." + id.substr(0,3) + "-btn";
	$(c).toggleClass("disabled");
}

var main = function() {
	$('#tax_box').click(function() {
		modify_buttons(this.id);
	});

	$('#tip_box').click(function() {
		modify_buttons(this.id);
	});

}

$(document).ready(main);