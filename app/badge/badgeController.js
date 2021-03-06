﻿
'use strict';
app.controller('badgeController', ['$scope', 'badgeService', 
    function ($scope,myService) {

        $scope.items = [];
        
        loadData();

        function loadData() {
            myService.getItems()
            .then(function () {
                $scope.items = myService.items;
            },
                function () {
                    //Error goes here...
                })
                .then(function () {
                    $scope.isBusy = false;
                });
        }
        
    }]);

app.controller('badgeAddController', ['$scope', 'badgeService', '$window',
    function categoryController($scope, myService, $window) {
        $scope.item = {};
        $scope.isEdit = false;

        $scope.cancel = function () {
            $window.location = "#/badge";
        };

        $scope.saveItem = function () {
            
            if ($scope.badgeForm.$invalid) return;
            myService.addItem($scope.item)
            .then(function () {
                $window.location = "#/badge";
            },
            function () {
                //Error        
            })
        };
    }]);

app.controller('badgeEditController', ['$scope', 'badgeService', '$window', '$routeParams',
    function categoryController($scope, myService, $window, $routeParams) {
        $scope.item = {};
        $scope.isEdit = true;

        var lFirstChange = true;

        $scope.badgeleveloptions =
            [
                "-",
                "Investiture",
                "Scout Craft",
                "Pioneer",
                "Explorer",
                "Adventurer",
                "Proficiency",
                "Service",
                "Organisation"
            ];

        if ($routeParams.Id) {
            $scope.item = myService.findItemById($routeParams.Id);
            $scope.$watchCollection('badge', function () {
                if (!lFirstChange) {
                    $('#deleteButton').hide(400);
                }
                lFirstChange = false;
            });
        }

        $scope.cancel = function () {
            $window.location = "#/badge";
        };

        $scope.modalDelete = function (size, badge) {

            var uibModalInstance = $modal.open({
                templateUrl: 'app/badge/views/deleteModal.html',
                controller: function ($scope, $uibModalInstance, item) {
                    $scope.item = item;
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.ok = function (item) {
                        myService.deleteItem(item.Id)
                        .then(function () {
                            $window.location = "#/badge";
                            $uibModalInstance.close(item);
                        },
                        function () {
                            //Error        
                        })
                    };
                },
                size: size,
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });
        };

        $scope.saveItem = function () {
            if ($scope.badgeForm.$invalid) return;
            myService.updateItem($scope.item)
            .then(function () {
                
                $window.location = "#/badge";
            },
            function () {
                //Error        
            })
            
        };
    }]);