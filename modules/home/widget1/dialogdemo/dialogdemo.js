(function (win) {
    var module = angular.module('dialogdemo', ['dialogModule'], function () { });

    define(['css!./dialogdemo.css', 'template!./dialogdemo.html', 'portal/portal'], function (css, template, portal) {


        module.controller('dialogdemoController', ['$scope', '$rootScope', 'dialogService', function ($scope, $rootScope, dialogService) {
            $scope.close = function () {
                dialogService.hide();
            };
        }]);

        return {
            template: template,
            module: 'dialogdemo',
            controller: 'dialogdemoController'
        }
    });
})(window);