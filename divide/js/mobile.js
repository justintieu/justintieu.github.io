$.fn.bootstrapSwitch.defaults.onText = 'YES';
$.fn.bootstrapSwitch.defaults.offText = 'NO';

$('input[name="splitting"]').on('switchChange.bootstrapSwitch', function(event, state) {
	if(state) {
		$('#amount_owed').prop("disabled", true);
	} else {
		$('#amount_owed').removeProp("disabled");
	}
});

$('#newPersonModal').on('hide.bs.modal', function (e) {
  reset_new_person_form();
})

var reset_new_person_form = function() {
    $('#name').val("");
    if(!$('input[name="splitting"]').bootstrapSwitch('state')) {
        $('input[name="splitting"]').bootstrapSwitch('state', true, true);
    }
    $('#amount_owed').val("");
    $('#amount_owed').prop("disabled", true);
}

function person(full_name, subtotal, isSplitting) {
    this.full_name = full_name;
    this.subtotal = subtotal;
    this.isSplitting = isSplitting;
    this.tax_amount = 0;
    this.tip_amount = 0;
}

var main = function() {
	$("input[name='splitting']").bootstrapSwitch();
	$("input[name='rounding']").bootstrapSwitch();
}

$(document).ready(main);