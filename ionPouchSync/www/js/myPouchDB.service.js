(function () { // IIFE to isolate scope
  'use strict';

  angular.module('starter')
    .factory('myPouchDB', function () {

      /* Create a pouch DB database in local storage */
      var myDB = new PouchDB('grocery-list', {auto_compaction: true});
      /* Synchronize the Pouch DB with a remote Couch DB on cloudant */
      /* COMMENT OUT THE NEXT THREE LINES IF YOU DON'T WANT TO SYNC WITH A COUCH DB DATABASE */
      myDB.sync('https://quickstartprototypes.cloudant.com/grocery-list', {
        live: true
      });

      /* Return the database reference, so we can operate on it */
      return myDB;
    });
}()); // End IIFE
