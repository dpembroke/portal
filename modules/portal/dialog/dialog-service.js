angular.module('portal').factory('dialogService', ['$rootScope', 'messageService',
  function ($rootScope, messageService) {
      return {
          show: function (data) {              
              messageService.fire('portal.dialog.show', data);
          },
          hide: function (data) {              
              messageService.fire('portal.dialog.hide');
          }
      }
  }]);