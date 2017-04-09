(function (win) {
    var module = angular.module('widget3Module', ['portal'], function () { });

    define(['css!./widget3.css', 'template!./widget3.html', 'portal/portal'], function (css, template, portal) {

        module.controller('widget3Controller', ['$scope', '$rootScope', 'messageService', function ($scope, $rootScope, messageService) {

            $scope.message = 'message to send';
            $scope.send = function () {
                messageService.fire('messageService.demo', $scope.message);
            }
        }]);

        return {
            template: template,
            module: 'widget3Module',
            controller: 'widget3Controller',

            options: {
                title: 'Widget 3 - messageService API demo [sending]'
            }
        }
    });
})(window);