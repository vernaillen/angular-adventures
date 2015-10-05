'use strict';

function bootstrapRouter(id, portletId) {

	var app = angular.module(id, ["ui.router", "router.factories"]);

	app.run(['$rootScope', 'url',
		function($rootScope, url) {
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
				if (!toState.hasOwnProperty('fixedUrl')) {
					toState.templateUrl = url.createRenderUrl(toState.templateUrl);
					toState.fixedUrl = true;
				}
			});
		}
	]);

	app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 'urlProvider',
		function($urlRouterProvider, $stateProvider, $locationProvider, urlProvider) {
			urlProvider.setPid(portletId);

			$locationProvider.html5Mode(true);

			var currentPageUrl = Liferay.ThemeDisplay.getLayoutURL();
			currentPageUrl = currentPageUrl.substr(currentPageUrl.indexOf('/', 10));
			$urlRouterProvider.otherwise(currentPageUrl);

			$stateProvider
				.state("page1", {
					url: currentPageUrl,
					templateUrl: 'page1',
					controller: 'RouteCtrl'
				})
				.state("page2", {
					templateUrl: 'page2',
					controller: 'RouteCtrl'
				});
		}
	]);

	app.controller("RouteCtrl", ['$scope', 'url',
		function($scope, url) {
			//$scope.portletId = portletId.substr(1, portletId.length - 2);

			//$scope.page = url.createRenderUrl('page1');
		}]
	);

	angular.bootstrap(document.getElementById(id),[id]);
}