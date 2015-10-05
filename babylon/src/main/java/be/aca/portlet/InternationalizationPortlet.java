package be.aca.portlet;

import java.lang.reflect.Field;
import java.util.Locale;
import java.util.Map;

import com.google.common.base.Strings;
import com.liferay.portal.kernel.util.PortalClassLoaderUtil;
import com.liferay.portal.kernel.util.StringPool;

import be.aca.portlet.resource.ResourcePortlet;
import be.aca.portlet.resource.annotation.CacheResource;
import be.aca.portlet.resource.annotation.Param;
import be.aca.portlet.resource.annotation.Resource;

public class InternationalizationPortlet extends ResourcePortlet {

	private static final Locale DEFAULT_LIFERAY_LOCALE = new Locale(StringPool.BLANK);

	@Resource(id = "language")
	@CacheResource(keyParam = "locale")
	public Map<String, String> getLanguage(@Param String locale) throws Exception {
		Locale localeValue = DEFAULT_LIFERAY_LOCALE;
		if (!Strings.isNullOrEmpty(locale)) {
			localeValue = Locale.forLanguageTag(locale);
		}

		// Some ugly code, using the Liferay portal classloader to get at the language map
		// that contains a cached resource bundle for the active locales
		ClassLoader portalClassLoader = PortalClassLoaderUtil.getClassLoader();

		Class c = portalClassLoader.loadClass("com.liferay.portal.language.LanguageResources");
		Field f = c.getDeclaredField("_languageMaps");
		f.setAccessible(true);

		Map<Locale, Map<String, String>> bundles = (Map<Locale, Map<String, String>>) f.get(null);

		return bundles.get(localeValue);
	}
}