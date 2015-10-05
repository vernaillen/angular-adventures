'use strict';

function bootstrapBabylon(id, portletId) {

	var app = angular.module(id, ["pascalprecht.translate", "babylon.factories"]);

	app.config(['urlProvider', '$translateProvider',
		function(urlProvider, $translateProvider) {
			urlProvider.setPid(portletId);

			$translateProvider.useUrlLoader(urlProvider.$get().createResourceUrl('language', 'locale', Liferay.ThemeDisplay.getBCP47LanguageId()));
			$translateProvider.preferredLanguage(Liferay.ThemeDisplay.getBCP47LanguageId());
		}
	]);

	app.controller("BabylonCtrl", ['$scope', 'url',
		function($scope, url) {
			$scope.page = url.createRenderUrl('babylon');
		}]
	);

	angular.bootstrap(document.getElementById(id),[id]);
}