'use strict';

function bootstrap(id, portletId) {

	var app = angular.module(id, []);

	app.controller("MainCtrl", ['$scope',
		function($scope) {
			$scope.portletId = portletId.substr(1, portletId.length - 2);

			$scope.page = getPartial($scope.portletId, 'page1');

			$scope.page1 = function() {
				$scope.page = getPartial($scope.portletId, 'page1');
			};

			$scope.page2 = function() {
				$scope.page = getPartial($scope.portletId, 'page2');
			};

			function getPartial(pid, name) {
				var renderURL = Liferay.PortletURL.createRenderURL();
				renderURL.setPortletId(pid);
				renderURL.setPortletMode('view');
				renderURL.setWindowState('exclusive');
				renderURL.setParameter('jspPage', '/partials/' + name + '.html');

				return renderURL.toString();
			}
		}]
	);

	angular.bootstrap(document.getElementById(id),[id]);
}