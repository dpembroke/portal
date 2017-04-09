(function (win) {
    var module = angular.module('widget4Module', ['portal'], function () { });

    define(['css!./widget4.css', 'template!./widget4.html'], function (css, template) {

        module.controller('widget4Controller', ['$scope', '$rootScope', 'messageService', '$timeout', function ($scope, $rootScope, messageService, $timeout) {
            messageService.on('messageService.demo', function (data) {
                $timeout(function () {
                    $scope.messageReceived = data;
                });
            });
        }]);

        return {
            template: template,
            module: 'widget4Module',
            controller: 'widget4Controller',

            options: {
                title: 'Widget 4 - messageService API demo [receiving]'
            }
        }
    });
})(window);