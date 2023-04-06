package com.devsuperior.ControleDeVendas.components;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.cloudinary.Cloudinary;
@Component
public class UploadImageConfig {
	
	@Bean
	public Cloudinary cloudinaryImage() {
		Map config = new HashMap();
		config.put("cloud_name", "dm6it5mnf");
		config.put("api_key", "846855831743626");
		config.put("api_secret", "8fifRjo6drXUjQHLCX0Psx1hoYQ");
		Cloudinary cloudinary = new Cloudinary(config);
		return cloudinary;
	}
}
