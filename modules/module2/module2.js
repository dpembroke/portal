(function (win) {
    var module = angular.module('module2', [], function () { });

    define(['css!./module2.css', 'template!./module2.html', 'portal/portal'], function (css, template, portal) {


        module.controller('module2Controller', ['$scope', '$rootScope', function ($scope, $rootScope) {

        }]);

        return {
            template: template,
            module: 'module2',
            controller: 'module2Controller'
        }
    });
})(window);