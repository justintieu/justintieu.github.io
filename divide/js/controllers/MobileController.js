app.controller('MobileController', ['$scope', function($scope) {
    $scope.persons = [];
    $scope.bill = 0;
    $scope.tax = 9;
    $scope.tip = 15;
    $scope.round = false;
    $scope.total_bill = 0;
    $scope.num_splitters = 0;
    $scope.add_new_person = function() {
        var name = $('#name').val();
        var splitting = $('input[name="splitting"]').bootstrapSwitch('state');
        var amount_owed = (splitting) ? 0 : $('#amount_owed').val() - 0;
        if((name.length > 0 && splitting) || (!splitting && $('#amount_owed').val().length > 0)) {
            $scope.persons.push(new person(name, amount_owed, splitting));
            $('#newPersonModal').modal('hide');
            if(splitting) {
                $scope.num_splitters++;
            }
            $scope.update_bill();
            reset_new_person_form();
        }
    }

    $scope.remove_person = function(name) {
        for (var i = 0; i < $scope.persons.length; i++) {
            if ($scope.persons[i].name == name) {
                if($scope.persons[i].splitting) {
                    $scope.num_splitters--;
                }
                $scope.persons.splice(i, 1);
                break;
            }
        }
        $scope.update_bill();
    }

    $scope.update_settings = function() {
        var tax_input = $('#tax_percentage').val() - 0;
        var tip_input = $('#tip_percentage').val() - 0;
        if(tax_input >= 0 && tax_input <= 100 && tip_input >= 0 && tip_input <= 100) {
            $scope.tax = tax_input;
            $scope.tip = tip_input;
            $scope.round = $('input[name="rounding"]').bootstrapSwitch('state');
            $('#settingsModal').modal('hide');
            $scope.update_bill();
        }
    }

    $scope.update_bill = function() {
        $scope.total_bill = $scope.bill + ($scope.tax/100*$scope.bill) + ($scope.tip/100*$scope.bill);
        
        //consider nonsplitters first
        for(var i = 0; i < $scope.persons.length; i++) {
            if(!$scope.persons[i].splitting) {
                var curr_amount = $scope.persons[i].amount_owed + ($scope.tax/100*$scope.persons[i].amount_owed) + ($scope.tip/100*$scope.persons[i].amount_owed);
                $scope.persons[i].final_amount = ($scope.round) ? Math.ceil(curr_amount) : curr_amount;
                $scope.total_bill = $scope.total_bill - curr_amount;
            }
        }
        //consider everyone after
        if($scope.total_bill >= 0) {
            for(var i = 0; i < $scope.persons.length; i++) {
                if($scope.persons[i].splitting) {
                    var curr_amount = $scope.total_bill/$scope.num_splitters;
                    $scope.persons[i].final_amount = ($scope.round) ? Math.ceil(curr_amount) : curr_amount;
                }
            }
        }
    }

    $scope.set_bill = function() {
        $scope.bill = $('#bill_amount_input').val() - 0;
        $scope.update_bill();
    }
}]);