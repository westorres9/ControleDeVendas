package com.devsuperior.ControleDeVendas.services;

import java.io.IOException;
import java.util.UUID;

import org.hibernate.id.UUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.devsuperior.ControleDeVendas.components.UploadImageConfig;
@Service
public class CloudinaryUploadImageService {
		
	@Autowired
	public UploadImageConfig cloudinary;
	
	@Transactional(readOnly = true)
	public String uploadImageService(String image) {
		try {
			String randomName = UUID.randomUUID().toString();
			  cloudinary.cloudinaryImage().uploader().upload(image, ObjectUtils.asMap("public_id", randomName));
			  String url = cloudinary.cloudinaryImage().url().transformation(new Transformation().width(100).height(150).crop("fill")).generate(randomName);
			  return url;
		} catch (IOException e) {
			  throw new RuntimeException("error upload");
		}
	}
}
