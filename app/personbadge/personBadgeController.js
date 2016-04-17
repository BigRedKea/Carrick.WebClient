
'use strict';
app.controller('personBadgeController', ['$scope', 'personBadgeService',
    function ($scope,myService) {

        $scope.personBadges = [];
        
        loadBadgeData();

        function loadBadgeData() {
            myService.getItemsForPerson()
            .then(function () {
                $scope.personBadges = myService.personBadges;
            },
                function () {
                    //Error goes here...
                })
                .then(function () {
                    $scope.isBusy = false;
                });
        }
    }]);

app.controller('personBadgeAddController', ['$scope', 'personBadgeService', '$window',
    function categoryController($scope, myService, $window) {
        $scope.item = {};
        $scope.isEdit = false;

        $scope.cancel = function () {
            $window.location = "#/personbadge";
        };

        $scope.saveBadge = function () {
            
            if ($scope.personBadgeForm.$invalid) return;
            myService.addItem($scope.item)
            .then(function () {
                $window.location = "#/personbadge";
            },
            function () {
                //Error        
            })
        };
    }]);

app.controller('personBadgeEditController', ['$scope', 'personBadgeService', '$window', '$routeParams',
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
            $scope.$watchCollection('personBadge', function () {
                if (!lFirstChange) {
                    $('#deleteButton').hide(400);
                }
                lFirstChange = false;
            });
        }

        $scope.cancel = function () {
            $window.location = "#/personBadge";
        };

        $scope.modalDelete = function (size, personBadge) {

            var uibModalInstance = $modal.open({
                templateUrl: 'app/personBadge/views/deleteModal.html',
                controller: function ($scope, $uibModalInstance, personBadge) {
                    $scope.personBadge = personBadge;
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.ok = function (badge) {
                        myService.deleteItem(personBadge.Id)
                        .then(function () {
                            $window.location = "#/personBadge";
                            $uibModalInstance.close(personBadge);
                        },
                        function () {
                            //Error        
                        })
                    };
                },
                size: size,
                resolve: {
                    personBadge: function () {
                        return personBadge;
                    }
                }
            });
        };

        $scope.savePersonBadges = function () {
            if ($scope.badgeForm.$invalid) return;
            myService.updateItem($scope.personbadge)
            .then(function () {
                
                $window.location = "#/personBadge";
            },
            function () {
                //Error        
            })
            
        };
    }]);