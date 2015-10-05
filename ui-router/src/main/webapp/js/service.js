'use strict';

angular.module("router.factories", []).

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
			}
		}
	};

	this.setPid = function(pid) {
		this.pid = pid.substr(1, pid.length - 2);
	};
});