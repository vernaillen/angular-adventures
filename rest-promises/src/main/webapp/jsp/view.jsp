<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="theme" %>
<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>

<portlet:defineObjects />
<theme:defineObjects />

<div id="<portlet:namespace />main" ng-controller="ListCtrl" ng-cloak>
	<div ng-hide="<%= themeDisplay.isSignedIn() %>">You need to be logged in to use this portlet</div>
	<div ng-show="<%= themeDisplay.isSignedIn() %>" ng-include src="page"></div>
</div>

<aui:script use="liferay-portlet-url,liferay-service,aui-base" position="inline">

	bootstrapRest('<portlet:namespace />main', '<portlet:namespace />');

</aui:script>