(function () { // IIFE to isolate scope
  'use strict';

  angular.module('yoPouchSyncApp')
    .controller('HomeCtrl',
    ['$scope', 'pouchWrapper',
      function ($scope, pouchWrapper) {

        $scope.grocery = pouchWrapper.data;

        $scope.submit = function () {
          console.log("submit: text='" + $scope.text + "'");
          if ($scope.text !== '')
            var doc = {
              type: 'grocery',
              text: $scope.text
            };
          pouchWrapper.add(doc).then(function (res) {
            $scope.text = '';
          })
            .catch(function (reason) {
              console.log(reason);
            });
        };

        $scope.remove = function (groceryItem) {
          pouchWrapper.remove(groceryItem)
            .catch(function (reason) {
              console.log(reason);
            });
        };

        $scope.update = function (groceryItem) {
          pouchWrapper.update(groceryItem)
            .catch(function (reason) {
              console.log("Problem updating database: ", reason);
            });
        };
      }
    ]
  );
}()); // End IIFE
