'use strict';

app.factory('scoutingEventService', ['$http', 'ngAuthSettings','$q',
    function ($http, ngAuthSettings, $q) {
        var serviceBase = ngAuthSettings.CarrickAPI;

        var scoutingEventsServiceFactory = {};

        scoutingEventsServiceFactory.getItems = _getItems;

        var _items = [];

        var _getItems = function () {

            return $http.get(serviceBase + 'api/scoutingevent/getfutureitems').then(function (results) {

                var newArray = [];
                //34 Jamboree 58 Butterfly'
                for (var i = 0; i < results.data.length; i++) {
                    if ( results.data[i].StartDateTime !== null
                        && results.data[i].FinishDateTime !== null) {
                        //newArray.push(results[i]);
                        _items.push(results.data[i]);

                        var obj = {
                            "Id": results.data[i].Id,
                            "StartDateTime": results.data[i].StartDateTime,
                            "FinishDateTime": results.data[i].FinishDateTime,
                            "EventName": $.trim(results.data[i].EventName),
                            "title": $.trim(results.data[i].EventName),
                            "start": new Date(results.data[i].StartDateTime),
                            "end": new Date(results.data[i].FinishDateTime),
                            "allDay": true,
                            "link": results.data[i].LinkToMoreInformation,
                            "className": 'openSesame'
                        };
                        newArray.push(obj);

                    }
                }
                results.data = newArray;
                return results;
            });
        };

        var _addItem = function (_item) {
            var deferred = $q.defer();
            var controllerQuery = serviceBase + 'api/scoutingevent/insert';

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
            var controllerQuery = serviceBase + 'api/scoutingevent/update';

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
            var controllerQuery = serviceBase + 'api/scoutingevent/delete/'+ id;

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
            scoutingevents: _items,
            getItems: _getItems,
            addItem: _addItem,
            updateItem: _updateItem,
            deleteItem: _deleteItem
        }

    }]);