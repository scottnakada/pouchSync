(function () { // IIFE to isolate scope
  'use strict';

  angular.module('yoPouchSyncApp')
    .controller('HomeCtrl',
    ['$scope', 'dataWrapper',
      function ($scope, dataWrapper) {

        $scope.grocery = dataWrapper.data;

        $scope.submit = function () {
          console.log("submit: text='" + $scope.text + "'");
          if ($scope.text !== '')
            var doc = {
              type: 'grocery',
              text: $scope.text
            };
          dataWrapper.add(doc).then(function (res) {
            $scope.text = '';
          })
            .catch(function (reason) {
              console.log(reason);
            });
        };

        $scope.remove = function (groceryItem) {
          dataWrapper.remove(groceryItem)
            .catch(function (reason) {
              console.log(reason);
            });
        };

        $scope.update = function (groceryItem) {
          dataWrapper.update(groceryItem)
            .catch(function (reason) {
              console.log("Problem updating database: ", reason);
            });
        };
      }
    ]
  );
}()); // End IIFE
