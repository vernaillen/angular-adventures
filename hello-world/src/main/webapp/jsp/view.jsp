<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="theme" %>
<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>

<portlet:defineObjects />
<theme:defineObjects />

<div id="<portlet:namespace />main" ng-cloak>
	<div ng-hide="<%= themeDisplay.isSignedIn() %>">You need to be logged in to use this portlet</div>
	<div ng-show="<%= themeDisplay.isSignedIn() %>">
		<label>Name:</label>
		<input type="text" ng-model="yourName" placeholder="Enter a name here">
		<hr>
		<h1>Hello {{yourName}}!</h1>
	</div>
</div>

<aui:script use="aui-base" position="inline">

	angular.bootstrap(document.getElementById('<portlet:namespace />main'), []);

</aui:script>
