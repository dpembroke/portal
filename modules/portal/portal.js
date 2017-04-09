(function (win) {

    var controllerProvider = null;

    var module = angular.module('portal', ['ngResource', 'dndLists', 'angularBootstrapMaterial'], function ($controllerProvider) {
        controllerProvider = $controllerProvider;
    });

    define(['jquery', 'css!./portal.css', 'template!./portal.html', './message-service'], function ($, css, template, requireMessageService) {

        $('body').append(template);

        angular.bootstrap($('body'), ['portal']);

        var registerController = function(moduleName, controllerName) {
            var queue = angular.module(moduleName)._invokeQueue;
            for (var i = 0; i < queue.length; i++) {
                var call = queue[i];
                if (call[0] == "$controllerProvider" &&
                   call[1] == "register" &&
                   call[2][0] == controllerName) {
                    controllerProvider.register(controllerName, call[2][1]);
                }
            }
        }

        var registerModule = function (targetSelector, template, module, controller) {
            $(targetSelector).html(template);
            registerController(module, controller);
            //var $body = angular.element(document.body);

            angular.injector(['ng', module]).invoke(function ($compile, $rootScope) {            
            
                $compile($(targetSelector))($rootScope);
                $rootScope.$apply();
            });
        }
        
        var loadModule = function (moduleid, targetSelector, oncomplete) {
            require([moduleid], function (m) {
                registerModule(targetSelector, m.template, m.module, m.controller)
                if (oncomplete)
                    oncomplete({ module: m });
            });
        }

        module.directive('portalLoadModule', function () {
            return {
                restrict: 'A',
                scope: {
                    module: '=portalLoadModule',
                    loadComplete: '&'
                },
                link: function (scope, element, attrs) {
                    if(scope.module)
                        loadModule(scope.module, element, scope.loadComplete);
                }
            }
        });

        module.factory('dataService', ['$window',
            function ($window) {
                return {
                    find: function (data, l) {
                        for (var i = 0;i<l.length;i++)
                            if(l[i].id == data.id)
                                return l[i];
                        return null;
                    },
                    store: function (key, data) {
                    	$window[key] = data;
                    },
                    get: function (key) {
                    	return $window[key];
                    }
                }      
            }]);


        

        loadModule('portal/dialog/dialog', '#portal-dialog-module');
        loadModule('portal/menu/menu', '#portal-menu-module');
        loadModule('portal/footer/footer', '#portal-footer-module');
        
        return {
            loadModule: loadModule,
            pageSelector: '#portal-page-module'
        }
    });
})(window);
