(function (win) {
    var module = angular.module('dialogModule', ['portal'], function () { });

    define(['css!./dialog.css', 'template!./dialog.html', './dialog-service', 'portal/portal'], function (css, template, requireDialogService, portal) {


        module.controller('dialogController', ['$scope', '$rootScope', 'dialogService', 'messageService', '$window', '$timeout', function ($scope, $rootScope, dialogService, messageService, $window, $timeout) {

            var positionDialog = function () {
                var dialog = document.getElementById('portal-dialog');
                var top = (($window.innerHeight / 2) - (dialog.offsetHeight / 2));
                var left = (($window.innerWidth / 2) - (dialog.offsetWidth / 2));
                if (top < 0)
                    top = 0;
                if (left < 0)
                    left = 0;
                $scope.top = top + 'px';
                $scope.left = left + 'px';
            }

            $scope.show = function (data) {
                $scope.display = true;

                if (data == null)
                    throw 'No data parameter provided';
                positionDialog();
                portal.loadModule(data.module, '#portal-dialog-body', function () {
                    $timeout(function () {
                    	$timeout(function () {
                    		positionDialog();
                    	});
                    });
                });

                $scope.title = data.title;

                if (!data.width)
                    data.width = 300;
                $scope.width = data.width + 'px';

                if (!data.height)
                    $scope.height = 'auto';
                else
                    $scope.height = data.height + 'px';

            }

            $scope.hide = function () {
                $scope.display = false;
            }           
            

            messageService.on('portal.dialog.show', function (data) {
                $timeout(function () {
                    $scope.show(data);
                });
            });

            messageService.on('portal.dialog.hide', function (data) {
                $timeout(function () {
                    $scope.hide();
                });
            });           

            $($window).resize(function () {
                if ($scope.display) {
                    $timeout(function () {
                        positionDialog();
                    });
                }
            });

        }]);

        return {
            template: template,
            module: 'dialogModule',
            controller: 'dialogController'
        }
    });
})(window);