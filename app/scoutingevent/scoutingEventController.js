'use strict';
app.controller('scoutingEventController', ['$scope', 'scoutingEventsService', 'uiCalendarConfig'
    , function ($scope, scoutingEventsService, uiCalendarConfig) {

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        scoutingEventsService.getScoutingEvents().then(function (results) {

            //$scope.scoutingEvents = results.data;
            $scope.events = results.data;
            $scope.eventSources = [ $scope.eventsF];

            //$scope.isNew = !$routeParams.Id;

            $scope.editEvent = function (event) {
                $scope.opts = ['on', 'off'];

                if (event === 'new') {
                    $scope.newEvent = true;
                    $scope.event = {EventName: ''};
                }
                else {
                    $scope.newEvent = false;
                    $scope.event = event;
                }
            };

        }, function (error) {
            //alert(error.data.message);
        });
        

        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var events = $scope.events;
            callback(events);
        };

        $scope.alertOnEventClick = function( date, jsEvent, view){
            $scope.alertMessage = (date.title + ' was clicked ');
        };

        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = ('Event dropped to make dayDelta ' + delta);
        };

        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
            $scope.alertMessage = ('Event resized to make dayDelta ' + delta);
        };

        $scope.addRemoveEventSource = function(sources,source) {
            var canAdd = 0;
            angular.forEach(sources,function(value, key){
                if(sources[key] === source){
                    sources.splice(key,1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };

        $scope.addEvent = function() {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };

        $scope.remove = function(index) {
            $scope.events.splice(index,1);
        };

        $scope.changeView = function(view,calendar) {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
            }
        };

        $scope.renderCalender = function(calendar) {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };

        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };

        /* event sources array*/
        $scope.eventSources = [ $scope.eventsF];




        /* $scope.calEventsExt = {
         color: '#f00',
         textColor: 'yellow',
         events: [
         {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
         {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
         {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
         ]
         };*/

                /* Render Tooltip */
       /* HACK $compile $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            $compile(element)($scope);
        };*/
       //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

        /* event source that pulls from google.com */
        /* http://fullcalendar.io/docs/google_calendar/ */
        /*$scope.eventSource = {        };*/
    }]);