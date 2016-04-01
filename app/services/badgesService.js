'use strict';

app.factory('badgesService', ['$http', 'ngAuthSettings', '$q',
    function ($http, ngAuthSettings, $q) {

    var _badges = [];

    var serviceBase = ngAuthSettings.CarrickAPI;

    var _getBadges = function () {
        var deferred = $q.defer();
        var controllerQuery = serviceBase + 'api/badge';

        $http.get(controllerQuery)
          .then(function (result) {
              // Successful
              angular.copy(result.data, _badges);
              deferred.resolve();
          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;
    };

    var _addBadge = function (_badge) {
        var deferred = $q.defer();
        var controllerQuery = serviceBase + 'api/badge/insert';

        $http.post(controllerQuery, _badge)
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

    var _updateBadge = function (_badge) {
        var deferred = $q.defer();
        var controllerQuery = serviceBase + 'api/badge/update';

        $http.post(controllerQuery, _badge)
          .then(function (result) {
              deferred.resolve();
          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;

    };

    var _deleteBadge = function (id) {
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


    var _findBadgeById = function(id) {
        var found = null;

        angular.forEach(_badges, function (badge) {
            if (badge.Id == id) {
                found = badge;
                return found;
            }
        });
        return found;
    };

    //Expose methods and fields through revealing pattern
    return {
        findBadgeById: _findBadgeById,
        badges: _badges,
        getBadges: _getBadges,
        addBadge: _addBadge,
        updateBadge: _updateBadge,
        deleteBadge: _deleteBadge
    }

}]);