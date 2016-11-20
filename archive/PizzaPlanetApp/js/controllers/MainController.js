app.controller('MainController', ['$scope', function($scope) {
  $scope.today = new Date();

  $scope.appetizers = [
    {
      name: 'Caprese',
      description: 'Mozzarella, tomatoes, basil, balsmaic glaze.',
      price: 4.95
    },
    {
      name: 'Mozzarella Sticks',
      description: 'Served with marinara sauce.',
      price: 3.95
    },
    {
      name: 'Bruschetta',
      description: 'Grilled Bread garlic',
      price: 4.95
    }
  ];
  
  $scope.mains = [
  {
    name: 'Margherita',
    description: 'Marinara sauce, mozzarella, fresh basil',
    price: 6.95
  },
  {
    name: 'Margherita',
    description: 'Marinara sauce, mozzarella, fresh basil',
    price: 6.95
  },
  {
    name: 'Margherita',
    description: 'Marinara sauce, mozzarella, fresh basil',
    price: 6.95
  }
  ];

}]);