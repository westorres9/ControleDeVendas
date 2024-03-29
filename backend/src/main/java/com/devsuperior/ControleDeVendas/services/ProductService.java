package com.devsuperior.ControleDeVendas.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.devsuperior.ControleDeVendas.dto.CategoryDTO;
import com.devsuperior.ControleDeVendas.dto.ProductDTO;
import com.devsuperior.ControleDeVendas.dto.ProductMostSoldDTO;
import com.devsuperior.ControleDeVendas.entities.Category;
import com.devsuperior.ControleDeVendas.entities.Product;
import com.devsuperior.ControleDeVendas.repositories.CategoryRepository;
import com.devsuperior.ControleDeVendas.repositories.ProductRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;
@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private UploadService uploadService;
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findAll() {
		List<Product> list = productRepository.findAll();
		return list.stream().map(x -> new ProductDTO(x, x.getCategories())).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> opt = productRepository.findById(id);
		Product entity = opt.orElseThrow(() -> new ResourceNotFoundException("Id not found " + id));
		return new ProductDTO(entity, entity.getCategories());
	}
	
	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setPrice(dto.getPrice());
		entity.setImgUrl(dto.getImgUrl());
		entity.getCategories().clear();
		for(CategoryDTO catDto : dto.getCategories()) {
			Category cat = categoryRepository.getOne(catDto.getId());
			entity.getCategories().add(cat);
		}
		entity = productRepository.save(entity);
		return new ProductDTO(entity);
	}
	
	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product entity = productRepository.getOne(id);
			entity.setName(dto.getName());
			entity.setDescription(dto.getDescription());
			entity.setPrice(dto.getPrice());
			entity.setImgUrl(dto.getImgUrl());
			entity.getCategories().clear();
			for(CategoryDTO catDto : dto.getCategories()) {
				Category cat = categoryRepository.getOne(catDto.getId());
				entity.getCategories().add(cat);
			}
			entity = productRepository.save(entity);
			return new ProductDTO(entity);
		}
		catch(EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
	}
	
	public void delete(Long id) {
        try {
            productRepository.deleteById(id);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }
	
	@Transactional(readOnly = true)
	public List<ProductMostSoldDTO> productsMostSold(String minDate, String  maxDate) {
		LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		LocalDate min = minDate.equals("") ? today.minusDays(365) : LocalDate.parse(minDate);
		LocalDate max = maxDate.equals("") ? today : LocalDate.parse(maxDate);
		List<ProductMostSoldDTO> listProductMostSold = productRepository.productsMostSold(min, max);
		List<ProductMostSoldDTO> top10 = new ArrayList<>();
		try {
			 top10 = listProductMostSold.subList(0, 10);
		}
		catch(IndexOutOfBoundsException e) {
			return listProductMostSold;
		}
		return top10;
		
	}
	
	@Transactional
	public String updateProductImage(Long id, MultipartFile file) {
		try {
			Product entity = productRepository.getOne(id);
			String imgUrl = uploadService.uploadImage(file);
			entity.setImgUrl(imgUrl);
			entity = productRepository.save(entity);
			return imgUrl;
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
}
 