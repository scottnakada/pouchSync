(function () { // IIFE to isolate scope
  'use strict';

  /* Reference the module for this program */
  angular.module('starter')
    /* Add the dataWrapper factory */
    .factory('pouchWrapper',
    /* Specify the operands as strings, so minification for production won't change the names */
    ['$rootScope', 'myPouchDB', '$q',
      function ($rootScope, myPouchDB, $q) {

        /* Create an array for storing the data */
        var data = [];

        /* Monitor the database for changes in real time, and handle with the handleUpdate function */
        myPouchDB.changes({live: true})
          .on('change', handleUpdate);

        /* Utility function for calling $apply to update the DOM  */
        /* on resolution of a promise */
        function resolve(value) {
          /* Ensure the DOM is updated due to an external change */
          $rootScope.$apply(function () {
            return $q.when(value);
          });
        }

        /* Utility function for calling $apply to update the DOM */
        /* on rejection of a promise */
        function reject(error) {
          /* Ensure the DOM is updated due to an external change */
          $rootScope.$apply(function () {
            return $q.reject(error);
          });
        }

        /* process changes to the mypouch database */
        function handleUpdate(change) {
          console.log("handleUpdate: change=", change);
          /* See if this is a add/change operation or a delete */
          if (!change.deleted) {
            /* Get the local record that has been added/changed */
            myPouchDB.get(change.id)
              .then(function (doc) {
                /* Search the local data to see if this is an update */
                for (var i = 0; i < data.length; ++i) {
                  if (data[i]._id === change.id) {
                    /* Ensure the DOM is updated due to an external change */
                    $rootScope.$apply(function () {
                      /* Remove the old copy of the updated record */
                      data.splice(i, 1);
                      /* Push the new copy into the data */
                      data.push(doc);
                    });
                    break;
                  }
                }
                /* Updated record not found, this must be an add */
                if (i == data.length) {
                  /* Ensure the DOM is updated due to an external change */
                  $rootScope.$apply(function () {
                    /* Push the new record into the data */
                    data.push(doc);
                  });
                }
              })
              /* Handle errors getting the changed document */
              .catch(function (error) {
                console.log("Error getting doc while handling a change: ", error);
              });

          } else {
            /* This is a delete operation */
            /* Search for the record to delete */
            for (var i = 0; i < data.length; ++i) {
              if (data[i]._id === change.id) {
                /* Ensure the DOM is updated due to an external change */
                $rootScope.$apply(function () {
                  /* Remove the old copy of the updated record */
                  data.splice(i, 1);
                });
                break;
              }
            }
          }
        }

        /* add a document to the database */
        function addPouch(doc) {
          console.log("addPouch: doc=", doc);
          /* Post the document generating a random _id */
          return myPouchDB.post(doc)
            .then(resolve)
            .catch(reject);
        }

        /* remove a document from the database */
        function removePouch(doc) {
          console.log("removePouch: id=", doc._id);
          /* Get the document to delete, so we have the correct _rev in the doc */
          return myPouchDB.get(doc._id)
            .then(function (resultDoc) {
              /* Remove the document */
              return myPouchDB.remove(resultDoc)
                .then(resolve)
                .catch(reject);
            })
            .catch(reject);
        }

        function updatePouch(updateDoc) {
          console.log("updatePouch: id=", updateDoc._id);
          /* Get the document to update, so we have the correct _rev in the doc */
          return myPouchDB.get(updateDoc._id)
            .then(function (resultDoc) {
              /* Replace the current rev of the document, with the new document */
              return myPouchDB.put(updateDoc, updateDoc._id, resultDoc._rev)
                .then(resolve)
                .catch(reject);
            })
            .catch(reject);
        }

        return {
          data: data,
          add: addPouch,
          remove: removePouch,
          update: updatePouch
        }
      }

    ]
  )
  ;
}()); // End IIFE
