(function () { // IIFE to isolate scope
  'use strict';

  angular.module('yoPouchSyncApp')
    .factory('myPouchDB', function () {

      /* Create a pouch DB database in local storage */
      var myDB = new PouchDB('my-sdce', {auto_compaction:true});
      myDB.sync('https://quickstartprototypes.cloudant.com/my-sdce', {
        live: true
      });

      return myDB;
    });
}()); // End IIFE
