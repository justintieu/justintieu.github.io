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
  $scope.splitters = [];


  $scope.add = function() {
    $scope.splitters.push({name:$("#new_name").val(), owes:$("#new_owes").val() - 0});
    $("#new_name").val("");
    $("#new_owes").val("");
  }

  $scope.remove = function(name) {
    $scope.splitters.pop(name);
  }

  $scope.update_value = function(type, value) {
    if(type == "people") {
      var updated_val = $scope.people.amount + value;
      if(updated_val >= 2) {
        $scope.people.amount = updated_val;
      }
    } else if(type == "tax") {
        var updated_val = $scope.tax.amount + value;
        if(updated_val >= 0 && updated_val <= 100) {
          $scope.tax.amount = updated_val;
        }
    } else if(type == "tip") {
        var updated_val = $scope.tip.amount + value;
        if(updated_val >= 0) {
          $scope.tip.amount = updated_val;
        }
    } else {
        console.log("error");
    }
  }

  $scope.split = function() {
    var total = $('#bill_total').val() - 0;
    if($('#tax_box')[0].checked) {
      total = total + total * ($scope.tax.amount/100);
    }

    if($('#tip_box')[0].checked) {
      total = total + total * ($scope.tip.amount/100);
    }    
    total = total.toFixed(2) - 0;
    var output = $("<div>").text("after tax: $" + total);
    var num_nonsplitters = $scope.splitters.length;
    for(var i = 0; i < num_nonsplitters; i++) {
      var n = $scope.splitters[i]['name'];
      var o = $scope.splitters[i]['owes'];
      if($('#tax_box')[0].checked) {
        o = o + o * ($scope.tax.amount/100);
      }
      if($('#tip_box')[0].checked) {
        o = o + o * ($scope.tip.amount/100);
      }
      o = o.toFixed(2) - 0;
      total -= o;
      output.append("<br/>" + n + " owes $" + o);
    }
    var num_people = $scope.people.amount - num_nonsplitters;
    if(num_people > 0) {
      output.append("<br/> everyone else pays $" + (total/num_people).toFixed(2));
    }
    $("#results").html(output);
  }

  $scope.clear = function() {
    $("#results").html("");
    $scope.splitters = [];
  }

  $scope.update_tax = function() {
    $scope.tax.amount = $('#new_tax').val() - 0;
  }
}]);