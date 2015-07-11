app.controller('MobileController', ['$scope', function($scope) {
    $scope.persons = {};
    $scope.num_persons = 0;
    $scope.bill = 0;
    $scope.tax = 9;
    $scope.tip = 15;
    $scope.add_new_person = function() {
        $('#newPersonModal').modal('hide');
        var name = $('#name').val();
        var splitting = $.fn.bootstrapSwitch.defaults.state;
        var amount_owed = (splitting) ? $('#amount_owed').val() : null;
        $scope.persons[name] = new person(name, amount_owed, splitting);
        $scope.num_persons++;
        console.log($scope.persons);
        $scope.update_bill();
        $('#new_person_form')[0].reset();
    }

    $scope.remove_person = function(name) {
        $scope.persons.remove(name);
        $scope.num_persons--;
        $scope.update_bill();
    }

    $scope.update_bill = function() {

    }
}]);