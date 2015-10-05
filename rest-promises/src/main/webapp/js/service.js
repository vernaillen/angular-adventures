'use strict';

angular.module("rest.factories", []).

provider('url', function() {
	this.pid = '';

	this.$get = function() {
		var pid = this.pid;
		return {
			createRenderUrl: function(page) {
				var resourceURL = Liferay.PortletURL.createRenderURL();
				resourceURL.setPortletId(pid);
				resourceURL.setPortletMode('view');
				resourceURL.setWindowState('exclusive');
				resourceURL.setParameter('jspPage', '/partials/' + page + '.html');

				return resourceURL.toString();
			},
			createResourceUrl: function(resourceId, paramName, paramValue) {
				// Need to set both resourceId and portletId for request to work
				// resourceId can be used to check and distinguish on server side
				var resourceURL = Liferay.PortletURL.createResourceURL();
				resourceURL.setPortletId(pid);
				resourceURL.setResourceId(resourceId);
				resourceURL.setParameter(paramName, paramValue);

				return resourceURL.toString();
			}
		}
	};

	this.setPid = function(pid) {
		this.pid = pid.substr(1, pid.length - 2);
	};
}).
factory('bookmarkFactory', function($q) {
	var getBookmarks = function() {
		var deferred = $q.defer();

		Liferay.Service(
			'/bookmarksentry/get-group-entries',
			{
				groupId: Liferay.ThemeDisplay.getScopeGroupId(),
				start: -1,
				end: -1
			},
			function(obj) {
				deferred.resolve(obj);
			}
		);

		return deferred.promise;
	};

	return {
		getBookmarks: getBookmarks
	};
}).
factory('bookmark2Factory', ['$q', '$http', 'url', function($q, $http, url) {
	var getBookmarks = function() {
		var deferred = $q.defer();
		var resource = url.createResourceUrl("bookmarks", "groupId", Liferay.ThemeDisplay.getScopeGroupId());

		$http.get(resource.toString()).success(function(data, status, headers, config) {
			deferred.resolve(data);
		});

		return deferred.promise;
	};

	return {
		getBookmarks: getBookmarks
	};
}]);