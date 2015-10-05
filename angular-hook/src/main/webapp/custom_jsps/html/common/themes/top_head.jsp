<%@ taglib uri="http://liferay.com/tld/util" prefix="liferay-util" %>

<%@ page import="com.liferay.portal.kernel.util.StringUtil" %>

<liferay-util:buffer var="html">
	<liferay-util:include page="/html/common/themes/top_head.portal.jsp" />
</liferay-util:buffer>

<%
	html = StringUtil.add(
			html,
			"<base href='/'>",
			"\n");

	html = StringUtil.add(
			html,
			"<script src=\"/html/js/angular.js\" type=\"text/javascript\"></script>",
			"\n");

	html = StringUtil.add(
			html,
			"<script src=\"/html/js/angular-ui-router.js\" type=\"text/javascript\"></script>",
			"\n");

	html = StringUtil.add(
			html,
			"<script src=\"/html/js/angular-translate.js\" type=\"text/javascript\"></script>",
			"\n");

	html = StringUtil.add(
			html,
			"<script src=\"/html/js/angular-translate-loader-url.js\" type=\"text/javascript\"></script>",
			"\n");
%>

<%= html %>