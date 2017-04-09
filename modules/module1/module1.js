(function (win) {
    var module = angular.module('module1', [], function () { });

    define(['css!./module1.css', 'template!./module1.html', 'portal/portal'], function (css, template, portal) {


        module.controller('module1Controller', ['$scope', '$rootScope', function ($scope, $rootScope) {

        }]);

        return {
            template: template,
            module: 'module1',
            controller: 'module1Controller'
        }
    });
})(window);