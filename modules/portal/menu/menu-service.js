
angular.module('portal').factory('menuService', ['$resource', '$rootScope', 'messageService',
  function ($resource, $rootScope, messageService) {
      var resource = $resource('/data/menu.json', {}, {});
      return {
          getAllMenuItems: function (oncomplete) {
              return resource.query(null, oncomplete);
          },
          click: function (data) {
              messageService.fire('portal.menu.click', data);
          }
      }      
  }]);