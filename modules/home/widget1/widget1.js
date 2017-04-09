(function (win) {
    var module = angular.module('widget1Module', ['portal'], function () { });

    define(['css!./widget1.css', 'template!./widget1.html'], function (css, template) {
        
        module.controller('widget1Controller', ['$scope', '$rootScope', 'dialogService', function ($scope, $rootScope, dialogService) {
            $scope.openDialog = function () {

                var rootId = $rootScope.$id;

                dialogService.show({
                    title: 'demo dialog',
                    module: 'home/widget1/dialogdemo/dialogdemo',
                    //width: 300,
                    //height: 60
                });
            }
        }]);

        return {
            template: template,
            module: 'widget1Module',
            controller: 'widget1Controller',

            options: {
                title: 'Widget 1 - Dialog API demo'
            }
        }
    });
})(window);