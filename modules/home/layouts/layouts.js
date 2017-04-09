(function (win) {
    var module = angular.module('layouts', ['portal'], function () { });

    define(['css!./layouts.css', 'template!./layouts.html', 'portal/portal'], function (css, template, portal) {
        
        module.controller('layoutsController', ['$scope', '$rootScope', 'dashboardService', '$timeout', 'dataService', function ($scope, $rootScope, dashboardService, $timeout, dataService) {
            dashboardService.getDashboardData(function (data) {
                $timeout(function () {
                    $scope.layouts = data.layouts;
                    $scope.selected = dataService.find({ id: data.selectedLayoutId }, data.layouts);
                });
            });

            $scope.selectLayout = function (l) {
                $scope.selected = l;
                dashboardService.selectLayout(l);
            }
        }]);

        return {
            template: template,
            module: 'layouts',
            controller: 'layoutsController'
        }
    });
})(window);