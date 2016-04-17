
var app = angular.module('CarrickApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ui.calendar', 'ui.bootstrap']);



app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "app/views/signup.html"
    });

    // Scouting Events
    $routeProvider.when("/scoutingevent", {
        controller: "scoutingEventController",
        templateUrl: "app/scoutingevent/views/List.html"
    });

    $routeProvider.when('/scoutingevent/new', {
        controller: "scoutingEventAddController",
        templateUrl: "app/scoutingevent/views/DetailForm.html"
    });

    $routeProvider.when('/scoutingevent/:Id', {
        controller: "scoutingEventEditController",
        templateUrl: "app/scoutingevent/views/DetailForm.html"
    });

    // Badge
    $routeProvider.when('/badge', {
        controller: "badgeController",
        templateUrl: "app/badge/views/List.html"
    });
    
    $routeProvider.when('/badge/new', {
        controller: "badgeAddController",
        templateUrl: "app/badge/views/DetailForm.html"
    });

    $routeProvider.when('/badge/:Id', {
        controller: "badgeEditController",
        templateUrl: "app/badge/views/DetailForm.html"
    });


    // Person Badge
    $routeProvider.when('/personbadge', {
        controller: "personBadgeController",
        templateUrl: "app/personbadge/views/List.html"
    });   
    
    $routeProvider.when('/personbadge/new', {
        controller: "personBadgeAddController",
        templateUrl: "app/personbadge/views/DetailForm.html"
    });

    $routeProvider.when('/personbadge/:Id', {
        controller: "personBadgeEditController",
        templateUrl: "app/personBadge/views/DetailForm.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "app/views/associate.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

});

//var serviceBase = 'http://localhost:26264/';
//var serviceBase = 'http://ngauthenticationapi.azurewebsites.net/';
var serviceBase = 'https://localhost:44300/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp',
    CarrickAPI: 'https://localhost:44300/'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


