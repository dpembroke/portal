(function (win) {
    var module = angular.module('widget2Module', ['portal'], function () { });

    define(['css!./widget2.css', 'template!./widget2.html', 'portal/portal'], function (css, template, portal) {

        module.controller('widget2Controller', ['$scope', '$rootScope', 'menuService', function ($scope, $rootScope, menuService) {

            

            menuService.getAllMenuItems(function (data) {
                $scope.selectedMenuId = '2';
                $scope.items = data;
            });

            $scope.click = function () {
                menuService.click({id:$scope.selectedMenuId});
            }
        }]);

        return {
            template: template,
            module: 'widget2Module',
            controller: 'widget2Controller',

            options: {
                title: 'Widget 2 - Menu API demo'
            }
        }
    });
})(window);