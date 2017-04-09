angular.module('portal').factory('messageService', ['$rootScope', '$window',
  function ($rootScope, $window) {

      if(!$window.portalEvents)
          $window.portalEvents = {};

      return {
          on: function (name, callback) {
              var e = $window.portalEvents[name];
              if (e) {
                  e.push(callback);
              }
              else {
                  $window.portalEvents[name] = [callback];
              }
              
          },
          fire: function (name, data) {
              var e = $window.portalEvents[name];
              if (e) {
                  for (var i = 0 ; i < e.length; i++)
                      e[i](data);
              }
              //$rootScope.$broadcast(name, data);
          }
      }
  }]);