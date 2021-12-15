package kr.or.connect.reserproject.config;

import javax.servlet.Filter;


import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;



public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
	@Override
	protected Class<?>[] getRootConfigClasses() {
		// TODO Auto-generated method stub
		return new Class<?>[] {ApplicationConfig.class/*, SecurityConfig.class*/};
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		// TODO Auto-generated method stub
		return new Class<?>[] {MvcConfig.class};
	}

	@Override
	protected String[] getServletMappings() {
		// TODO Auto-generated method stub
		return new String[] {"/"};
	}
	
	 @Override
	    protected Filter[] getServletFilters() {
	        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
	        encodingFilter.setEncoding("UTF-8");

	        return new Filter[]{encodingFilter};
	    }
}
