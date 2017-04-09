(function (win) {

    var module = angular.module('dashboardModule', ['portal'], function () { });

    define(['css!./dashboard.css', 'template!./dashboard.html', 'home/dashboard-service'], function (css, template, requireDashboardService) {

        module.controller('dashboardController', ['$scope', '$rootScope', 'dashboardService', 'dataService', '$timeout', 'dialogService', 'messageService', function ($scope, $rootScope, dashboardService, dataService, $timeout, dialogService, messageService) {

        	var getData = function(){
        		dashboardService.getNormalizedLayout(function (layout) {
        			$timeout(function () {
        				$scope.layout = layout;
        			});
        		});
        	}
        	getData();

            $scope.widgetLoadComplete = function (id, m) {
                var w = dashboardService.findWidget($scope.layout, id);
                if (w) {
                    $timeout(function () {
                        angular.merge(w.options, m.options);
                    });
                }
            }
            
            $scope.chooseLayout = function () {
                dialogService.show({
                    title: 'Please choose a layout',
                    module: 'home/layouts/layouts',
                    width: 450
                });
            }            

            messageService.on('portal.dashboard.layoutChanged', function (l) {
            	getData();
            });
        }]);

        return {
            template: template,
            module: 'dashboardModule',
            controller: 'dashboardController'
        }
    });
})(window);