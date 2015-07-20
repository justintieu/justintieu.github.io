app.controller('MobileController', ['$scope', function($scope) {
    $scope.splitters = [];
    $scope.nonsplitters = [];
    $scope.persons = [];
    $scope.subtotal = 0;
    $scope.tax_percentage = 9;
    $scope.tax_amount = 0;
    $scope.tip_percentage = 15;
    $scope.tip_amount = 0;
    $scope.roundUp = false;
    $scope.total_bill = 0;
    $scope.splitters_amount = 0;

    $scope.add_new_person = function() {
        var full_name = $('#name').val();
        var isSplitting = $('input[name="splitting"]').bootstrapSwitch('state');
        var subtotal = (isSplitting) ? 0 : $('#amount_owed').val() - 0;
        if((full_name.length > 0 && isSplitting) || (!isSplitting && $('#amount_owed').val().length > 0)) {
            $('#newPersonModal').modal('hide');
            if(isSplitting) {
                $scope.splitters.push(new person(full_name, subtotal, isSplitting));
            } else {
                $scope.nonsplitters.push(new person(full_name, subtotal, isSplitting));
            }
            $scope.update_bill();
            reset_new_person_form();
        }
    }

    $scope.remove_person = function(full_name) {
        for (var i = 0; i < $scope.persons.length; i++) {
            if ($scope.persons[i].full_name == full_name) {
                if($scope.persons[i].isSplitting) {
                    $scope.splitters.splice(i, 1); 
                } else {
                    $scope.nonsplitters.splice(i-$scope.splitters.length, 1);
                }
                break;
            }
        }
        $scope.update_bill();
    }

    $scope.update_settings = function() {
        var tax_setting = $('#tax_percentage').val() - 0;
        var tip_setting = $('#tip_percentage').val() - 0;
        if(tax_setting >= 0 && tax_setting <= 100 && tip_setting >= 0 && tip_setting <= 100) {
            $scope.tax_percentage = tax_setting;
            $scope.tip_percentage = tip_setting;
            $scope.roundUp = $('input[name="rounding"]').bootstrapSwitch('state');
            $('#settingsModal').modal('hide');
            $scope.update_bill();
        }
    }

    $scope.update_tax = function() {
        $scope.tax_amount = ($scope.tax_percentage/100) * $scope.subtotal;
    }

    $scope.update_tip = function() {
        $scope.tip_amount = ($scope.tip_percentage/100) * $scope.subtotal;
    }

    $scope.update_total = function() {
        $scope.total_bill = $scope.subtotal + $scope.tax_amount + $scope.tip_amount;
    }

    $scope.update_bill = function() {
        $scope.update_tax();
        $scope.update_tip();
        $scope.update_total();
        
        //consider nonsplitters first
        var nonsplitters_amount = 0;
        for(var i = 0; i < $scope.nonsplitters.length; i++) {
            $scope.nonsplitters[i].tax_amount = ($scope.tax_percentage/100) * $scope.nonsplitters[i].subtotal;;
            $scope.nonsplitters[i].tip_amount = ($scope.tip_percentage/100) * $scope.nonsplitters[i].subtotal;
            nonsplitters_amount += ($scope.nonsplitters[i].subtotal + $scope.nonsplitters[i].tax_amount + $scope.nonsplitters[i].tip_amount);
        }

        //consider everyone after
        for(var i = 0; i < $scope.splitters.length; i++) {
            var s_total = ($scope.total_bill - nonsplitters_amount)/$scope.splitters.length;
            var s_tt = 1+(($scope.tax_percentage+$scope.tip_percentage)/100);
            var s_subtotal = s_total/s_tt;
            $scope.splitters[i].subtotal = s_subtotal;
            $scope.splitters[i].tax_amount = s_subtotal * ($scope.tax_percentage/100);
            $scope.splitters[i].tip_amount = s_subtotal * ($scope.tip_percentage/100);
        }
        $scope.persons = [];
        $scope.persons = $scope.splitters.concat($scope.nonsplitters);
    }

    $scope.set_bill = function() {
        $scope.subtotal = $('#bill_amount_input').val() - 0;
        $scope.update_bill();
    }
}]);