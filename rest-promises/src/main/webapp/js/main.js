'use strict';

function bootstrapRest(id, portletId) {

	var app = angular.module(id, ["rest.factories"]);

	app.config(['urlProvider',
		function(urlProvider) {
			urlProvider.setPid(portletId);
		}
	]);

	app.controller("ListCtrl", ['$scope', 'url', 'bookmarkFactory', 'bookmark2Factory',
		function($scope, url, bookmarkFactory, bookmark2Factory) {
			$scope.portletId = portletId.substr(1, portletId.length - 2);

			$scope.page = url.createRenderUrl('list');

			$scope.model = {};

			bookmarkFactory.getBookmarks().then(function(bookmarks) {
				$scope.model.bookmarks = bookmarks;
			});

			bookmark2Factory.getBookmarks().then(function(bookmarks) {
				$scope.model.bookmarks2 = bookmarks;
			});
		}]
	);

	angular.bootstrap(document.getElementById(id),[id]);
}