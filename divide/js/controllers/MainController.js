app.controller('MainController', ['$scope', function($scope) {
    $scope.people = {
        title: "No. of People",
        type: "people",
        class: "people-btn",
        id: "",
        amount: 2,
        amount_id: "people_value"
    };
    $scope.tax = {
        title: "Tax Percentage",
        type: "tax",
        class: "tax-btn",
        id: "tax_box",
        amount: 9,
        amount_id: "tax_value"
    };
    $scope.tip = {
        title: "Tip Percentage",
        type: "tip",
        class: "tip-btn",
        id: "tip_box",
        amount: 15,
        amount_id: "tip_value"
    };

    $scope.bill_data = [$scope.people, $scope.tax, $scope.tip];
    $scope.nonsplitters = [];


    $scope.add = function() {
        var input_name = $("#new_name").val();
        var input_value = $("#new_owes").val() - 0;
        if (input_name && input_value) {
            $scope.nonsplitters.push({
                name: input_name,
                owes: input_value
            });
            $("#new_name").val("");
            $("#new_owes").val("");
        } else {
            alert("You must enter a valid name and amount");
        }
    }

    $scope.remove = function(name) {
        for (var i = 0; i < $scope.nonsplitters.length; i++) {
            if ($scope.nonsplitters[i].name == name) {
                $scope.nonsplitters.splice(i, 1);
            }
        }
    }

    $scope.update_value = function(type, value) {
        if (type == "people") {
            var updated_val = $scope.people.amount + value;
            if (updated_val >= 2) {
                $scope.people.amount = updated_val;
            }
        } else if (type == "tax") {
            var updated_val = $scope.tax.amount + value;
            if (updated_val >= 0 && updated_val <= 100) {
                $scope.tax.amount = updated_val;
            }
        } else if (type == "tip") {
            var updated_val = $scope.tip.amount + value;
            if (updated_val >= 0) {
                $scope.tip.amount = updated_val;
            }
        } else {
            console.log("error");
        }
    }

    $scope.split = function() {
        $("#result").html("");
        var total = $('#bill_total').val() - 0;
        var round_up = $('#round_up')[0].checked;
        if (total > 0) {
            if ($('#tax_box')[0].checked) {
                total = total + total * ($scope.tax.amount / 100);
            }

            if ($('#tip_box')[0].checked) {
                total = total + total * ($scope.tip.amount / 100);
            }
            total = total.toFixed(2) - 0;
            $('.panel-title').text("Bill Total: " + total);
            var num_nonsplitters = $scope.nonsplitters.length;
            for (var i = 0; i < num_nonsplitters; i++) {
                var n = $scope.nonsplitters[i]['name'];
                var o = $scope.nonsplitters[i]['owes'];
                if ($('#tax_box')[0].checked) {
                    o = o + o * ($scope.tax.amount / 100);
                }
                if ($('#tip_box')[0].checked) {
                    o = o + o * ($scope.tip.amount / 100);
                }
                if(round_up) {
                  o = Math.ceil(o);
                }
                o = o.toFixed(2) - 0;
                total -= o;

                var label = $("<label>");
                var checkbox = $("<input>").attr("type", "checkbox");

                label.append(checkbox);
                label.append(n + " owes $" + o);
                var li = $("<li>").attr("class", "list-group-item").append($("<div>").attr("class", "checkbox").append(label));

                $("#result").append(li);
            }
            var num_people = $scope.people.amount - num_nonsplitters;
            if (num_people > 0 && total >= 0) {
                for (var i = 0; i < num_people; i++) {
                    var value = (total / num_people);
                    if(round_up) {
                      value = Math.ceil(value);
                    }
                    var label = $("<label>");
                    var checkbox = $("<input>").attr("type", "checkbox");
                    label.append(checkbox);
                    label.append("person " + (i + 1) + " owes $" + value.toFixed(2));
                    var li = $("<li>").attr("class", "list-group-item").append($("<div>").attr("class", "checkbox").append(label));

                    $("#result").append(li);
                }
            }
            if ($('.result_panel').hasClass('hide')) {
                $('.result_panel').toggleClass('hide');
            }
        }
    }

    $scope.clear = function() {
        $('.result_panel').toggleClass('hide');
        $("#result").html("");
        $scope.nonsplitters = [];
    }

    $scope.update_tax = function() {
        $scope.tax.amount = $('#new_tax').val() - 0;
    }
}]);