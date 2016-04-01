
'use strict';
app.controller('badgeController', ['$scope', 'badgesService', 
    function ($scope,badgesService) {

        $scope.badges = [];
        
        loadBadgeData();

        function loadBadgeData() {
            badgesService.getBadges()
            .then(function () {
                $scope.badges = badgesService.badges;
            },
                function () {
                    //Error goes here...
                })
                .then(function () {
                    $scope.isBusy = false;
                });
        };



    }]);

app.controller('badgeAddController', ['$scope', 'badgesService', '$window',
    function categoryController($scope, badgesService, $window) {
        $scope.badge = {};
        $scope.isEdit = false;

        $scope.cancel = function () {
            $window.location = "#/badges";
        };

        $scope.saveBadge = function () {
            
            if ($scope.badgeForm.$invalid) return;
            badgesService.addBadge($scope.badge)
            .then(function () {
                $window.location = "#/badges";
            },
            function () {
                //Error        
            })
        };
    }]);

app.controller('badgeEditController', ['$scope', 'badgesService', '$window', '$routeParams',
    function categoryController($scope, badgesService, $window, $routeParams) {
        $scope.badge = {};
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
            $scope.badge = badgesService.findBadgeById($routeParams.Id);
            $scope.$watchCollection('badge', function () {
                if (!lFirstChange) {
                    $('#deleteButton').hide(400);
                }
                lFirstChange = false;
            });
        }

        $scope.cancel = function () {
            $window.location = "#/badges";
        };

        $scope.modalDelete = function (size, badge) {

            var uibModalInstance = $modal.open({
                templateUrl: 'app/badge/views/deleteModal.html',
                controller: function ($scope, $uibModalInstance, badge) {
                    $scope.badge = badge;
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.ok = function (badge) {
                        badgesService.deleteBadge(badge.Id)
                        .then(function () {
                            $window.location = "#/badges";
                            $uibModalInstance.close(badge);
                        },
                        function () {
                            //Error        
                        })
                    };
                },
                size: size,
                resolve: {
                    badge: function () {
                        return badge;
                    }
                }
            });
        };

        $scope.saveBadge = function () {
            if ($scope.badgeForm.$invalid) return;
            badgesService.updateBadge($scope.badge)
            .then(function () {
                
                $window.location = "#/badges";
            },
            function () {
                //Error        
            })
            
        };
    }]);