(function () { // IIFE to isolate scope
    'use strict';

    angular.module('starter')
        .controller('HomeCtrl',
        ['$scope', 'pouchWrapper',
            function ($scope, pouchWrapper) {

                $scope.data = {
                    showDelete: false,
                    showReorder: false
                };

                $scope.moveItem = function (item, fromIndex, toIndex) {
                    //Move the item in the array
                    $scope.grocery.splice(fromIndex, 1);
                    $scope.grocery.splice(toIndex, 0, item);
                };

                $scope.grocery = pouchWrapper.data;

                $scope.groceryItem = {
                    text: ''
                };

                $scope.submit = function () {
                    console.log("submit: text='" + $scope.groceryItem.text + "'");
                    if ($scope.groceryItem.text !== '') {
                        var doc = {
                            type: 'grocery',
                            text: $scope.groceryItem.text
                        };
                        pouchWrapper.add(doc)
                            .then(function (res) {
                                $scope.groceryItem.text = '';
                            })
                            .catch(function (reason) {
                                console.log(reason);
                            });
                    }
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
