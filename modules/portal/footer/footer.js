(function (win) {

    var module = angular.module('portalFooterModule', [], function () { });

    define(['css!./footer.css', 'template!./footer.html', 'portal/portal'], function (css, template, portal) {

        module.controller('footerController', ['$scope', '$rootScope', function ($scope, $rootScope) {

        }]);

        return {
            template: template,
            module: 'portalFooterModule',
            controller: 'footerController'
        }
    });
})(window);