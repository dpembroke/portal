(function (win) {
	var module = angular.module('payment-widget-module', ['portal'], function () { });

	define(['css!./payment-widget.css', 'template!./payment-widget.html', 'home/payment-widget/payment-widget-service'], function (css, template, requirePaymentWidgetService) {

		module.controller('paymentWidgetCcontroller', ['$scope', '$rootScope', 'messageService', '$timeout', 'paymentWidgetService', function ($scope, $rootScope, messageService, $timeout, paymentWidgetService) {
			messageService.on('messageService.demo', function (data) {
				$timeout(function () {

				});
			});

			$scope.validateStep1 = function (valid) {
				if (!valid)
					return;
				paymentWidgetService.getPaymentOptions($scope.payment, function (data) {
					$scope.options = data.list;
					$scope.step = 2;
				});
			}

			$scope.validateStep2 = function (valid) {
				if (!valid)
					return;
				$scope.step = 3;
			}

			$scope.back = function () {
				$scope.step--;
			}

			$scope.errorMap = {
				required: "This field is required",
				email: "Please enter a valid email"
			}

			$scope.payment = {
				currency: "EUR",
				date: new Date()
			}

			$scope.step = 1;
			$scope.maxSteps = 3;

			paymentWidgetService.getDebitableAccounts(function (data) {
				$scope.debitableAccounts = data.list;
			});

			paymentWidgetService.getCreditableAccounts(function (data) {
				$scope.creditableAccounts = data.list;
			});

		}]);

		return {
			template: template,
			module: 'payment-widget-module',
			controller: 'payment-widget-controller',

			options: {
				title: 'Make a payment'
			}
		}
	});
})(window);
