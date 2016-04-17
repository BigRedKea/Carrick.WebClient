'use strict';

app.factory('badgeService', ['$http', 'ngAuthSettings', '$q',
    function ($http, ngAuthSettings, $q) {

    var _items = [];

    var serviceBase = ngAuthSettings.CarrickAPI;

    var _getItems = function () {
        var deferred = $q.defer();
        var controllerQuery = serviceBase + 'api/badge/getactiveenableditems';

        $http.get(controllerQuery)
          .then(function (result) {
              // Successful
              angular.copy(result.data, _items);
              deferred.resolve();
          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;
    };

    var _addItem = function (_item) {
        var deferred = $q.defer();
        var controllerQuery = serviceBase + 'api/badge/insert';

        $http.post(controllerQuery, _item)
          .then(function (result) {
              //Success
              deferred.resolve();
          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;

    };

    var _updateItem = function (_item) {
        var deferred = $q.defer();
        var controllerQuery = serviceBase + 'api/badge/update';

        $http.post(controllerQuery, _item)
          .then(function (result) {
              deferred.resolve();
          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;

    };

    var _deleteItem = function (id) {
        var deferred = $q.defer();
        var controllerQuery = serviceBase + 'api/badge/delete/'+ id;

        $http.post(controllerQuery)
          .then(function (result) {
              deferred.resolve();
          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;

    };


    var _findItemById = function(id) {
        var found = null;

        angular.forEach(_items, function (item) {
            if (item.Id == id) {
                found = item;
                return found;
            }
        });
        return found;
    };

    //Expose methods and fields through revealing pattern
    return {
        findItemById: _findItemById,
        items: _items,
        getItems: _getItems,
        addItem: _addItem,
        updateItem: _updateItem,
        deleteItem: _deleteItem
    }

}]);