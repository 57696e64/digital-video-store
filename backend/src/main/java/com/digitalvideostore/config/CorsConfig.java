package com.digitalvideostore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS Configuration
 * 
 * - Allows frontend (running on localhost:3000) to make requests to backend (localhost:8080).
 * - Prevents CORS errors in the browser.
 */
@Configuration
public class CorsConfig {

	/**
	 * Configures CORS to allow requests from frontend origin.
	 *
	 * @return WebMvcConfigurer that applies the CORS policy
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				// Allow both localhost and Vercel frontend origins
				registry.addMapping("/**")
					.allowedOrigins(
						"http://localhost:3000",
						"https://digital-video-store-livid.vercel.app"
					)
					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
					.allowedHeaders("*");
			}
		};
	}
}