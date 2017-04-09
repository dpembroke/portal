(function (win) {
    

    /*
    In this example the an extension to the menuModule (menu/menu-service) is loaded with require. Because of this the module must be defined before the define call.
    If the module depends on another module loaded by require, it should be defined inside the define call after the dependency has loaded so that it can be injected.
    */
    var module = angular.module('menuModule', ['portal'], function () { });

    define(['css!./menu.css', 'template!./menu.html', 'portal/portal', 'portal/menu/menu-service'], function (css, template, portal, requireMenuService) {

        //var menuModule = angular.module('menuModule', [], function () { });

        module.controller('menuController', ['$scope', '$rootScope', 'menuService', 'messageService', '$timeout', 'dataService', function ($scope, $rootScope, menuService, messageService, $timeout, dataService) {

            $scope.items = menuService.getAllMenuItems(function (items) {
                             

                messageService.on('portal.menu.click', function (data) {
                    $timeout(function () { 
                        if (data == null)
                            throw 'No Menu query parameters passed';
                        var item = dataService.find(data, $scope.items);
                        if (item == null)
                            throw 'No Menu Item found';
                        $scope.selectItem(item);
                    });
                });

                menuService.click({ id: 1 });
            });

            $scope.selectItem = function (i) {
                $scope.selected = i;
                portal.loadModule(i.module, portal.pageSelector);
            }            
        }]);

        return {
            template: template,
            module: 'menuModule',
            controller: 'menuController'
        }
    });
})(window);