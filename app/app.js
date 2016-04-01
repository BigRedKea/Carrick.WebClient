
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

    $routeProvider.when("/scoutingevents", {
        controller: "scoutingEventController",
        templateUrl: "app/scoutingevent/views/scoutingevents.html"
    });

   /* $routeProvider.when('/badges', {
        controller: "badgeController",
        templateUrl: "app/badge/views/badgesList.html"
    });*/

    $routeProvider.when('/badges', {
        controller: "crudController",
        templateUrl: "app/crud/crud.html"
    });
    

    $routeProvider.when('/badge/newbadge', {
        templateUrl: "app/badge/views/badgeForm.html",
        controller: "badgeAddController"
    });

    $routeProvider.when('/badges/:Id', {
        templateUrl: "app/badge/views/badgeForm.html",
        controller: "badgeEditController"
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


