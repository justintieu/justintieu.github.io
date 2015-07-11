$.fn.bootstrapSwitch.defaults.onText = 'YES';
$.fn.bootstrapSwitch.defaults.offText = 'NO';

$('input[name="splitting"]').on('switchChange.bootstrapSwitch', function(event, state) {
	if(state) {
		$('#amount_owed').prop("disabled", true);
	} else {
		$('#amount_owed').removeProp("disabled");
	}
});

function person(full_name, amount_owed, splitting) {
    this.full_name = full_name;
    this.amount_owed = amount_owed;
    this.splitting = splitting;
}

var main = function() {
	$("[name='splitting']").bootstrapSwitch();
}

$(document).ready(main);