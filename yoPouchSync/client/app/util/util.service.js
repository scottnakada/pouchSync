(function () { // IIFE to isolate scope
  'use strict';

  angular.module('yoPouchSyncApp')
    .factory('util', [
      '$q',
      '$rootScope',
      function ($q, $rootScope) {
        return {
          resolve: function (value) {
            $rootScope.$apply(function () {
              return $q.when(value);
            });
          },
          reject: function (error) {
            $rootScope.$apply(function () {
              return $q.reject(error);
            });
          }
        };
      }
    ]
  );
}()); // End IIFE
