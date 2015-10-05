<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>

<portlet:defineObjects />

<div id="<portlet:namespace />main" ng-controller="MainCtrl" ng-cloak>
	<div ng-include src="page"></div>
</div>

<aui:script use="liferay-portlet-url,aui-base">

	bootstrap('<portlet:namespace />main', '<portlet:namespace />');

</aui:script>