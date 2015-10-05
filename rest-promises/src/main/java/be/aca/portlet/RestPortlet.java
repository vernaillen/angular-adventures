package be.aca.portlet;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import javax.portlet.PortletException;
import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.FieldNamingStrategy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.liferay.portal.kernel.dao.orm.QueryUtil;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portlet.bookmarks.model.BookmarksEntry;
import com.liferay.portlet.bookmarks.model.BookmarksFolderConstants;
import com.liferay.portlet.bookmarks.service.BookmarksEntryLocalServiceUtil;
import com.liferay.util.bridges.mvc.MVCPortlet;

public class RestPortlet extends MVCPortlet {

	private static final String BOOKMARKS = "bookmarks";

	public void serveResource(ResourceRequest resourceRequest, ResourceResponse resourceResponse) throws IOException, PortletException {
		String resourceId = resourceRequest.getResourceID();

		try {
			if (BOOKMARKS.equals(resourceId)) {
				long groupId = GetterUtil.getLong(resourceRequest.getParameter("groupId"));
				List<BookmarksEntry> bookmarks = BookmarksEntryLocalServiceUtil.getEntries(groupId, BookmarksFolderConstants.DEFAULT_PARENT_FOLDER_ID, QueryUtil.ALL_POS, QueryUtil.ALL_POS);

				Gson gson = new GsonBuilder()
						.setPrettyPrinting()
						.setFieldNamingStrategy(new FieldNamingStrategy() {
							@Override
							public String translateName(Field f) {
								String fieldName = f.getName();
								if (fieldName.startsWith("_") && fieldName.length() > 1) {
									fieldName = fieldName.substring(1);
								}
								return fieldName;
							}
						})
						.create();
				String json = gson.toJson(bookmarks);

				resourceResponse.getWriter().print(json);
			} else {
				throw new PortletException("Unknown resource ID");
			}
		} catch (Exception e) {
			throw new PortletException(e);
		}
	}
}