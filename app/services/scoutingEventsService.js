'use strict';
app.factory('scoutingEventsService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.CarrickAPI;

    var scoutingEventsServiceFactory = {};

    var _getScoutingEvents = function () {

        return $http.get(serviceBase + 'api/scoutingevent').then(function (results) {

            var newArray = [];
            //34 Jamboree 58 Butterfly'
            for (var i = 0; i < results.data.length; i++) {
                if ( results.data[i].StartDateTime !== null
                        && results.data[i].FinishDateTime !== null) {
                    //newArray.push(results[i]);

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

    scoutingEventsServiceFactory.getScoutingEvents = _getScoutingEvents;

    return scoutingEventsServiceFactory;

}]);