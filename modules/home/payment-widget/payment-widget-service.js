
angular.module('portal').factory('paymentWidgetService', ['$resource', '$rootScope', 'messageService', 'dataService',
  function ($resource, $rootScope, messageService, dataService) {
  	var debitableAccountsResource = $resource('/data/payment-widget/debitable-accounts.json', {}, {});
  	var creditableAccountsResource = $resource('/data/payment-widget/creditable-accounts.json', {}, {});
  	var paymentOptionsResource = $resource('/data/payment-widget/payment-options.json', {}, {});


  	return {
  		getDebitableAccounts: function (oncomplete) {
  			return debitableAccountsResource.get(null, oncomplete);
  		},
  		getCreditableAccounts: function (oncomplete) {
  			return creditableAccountsResource.get(null, oncomplete);
  		},
  		getPaymentOptions: function (payment, oncomplete) {
  			return paymentOptionsResource.get(null, oncomplete);
  		}
  	}

  }]);