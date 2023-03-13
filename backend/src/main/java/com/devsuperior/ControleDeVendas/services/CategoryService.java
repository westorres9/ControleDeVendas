package com.devsuperior.ControleDeVendas.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.CategoryDTO;
import com.devsuperior.ControleDeVendas.entities.Category;
import com.devsuperior.ControleDeVendas.repositories.CategoryRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {
		List<Category> list = categoryRepository.findAll();
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> opt = categoryRepository.findById(id);
		Category entity = opt.orElseThrow(() -> new ResourceNotFoundException("Id not found " + id));
		return new CategoryDTO(entity);
	}
	
	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = categoryRepository.save(entity);
		return new CategoryDTO(entity);
	}
	
	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		try {
			Category entity = categoryRepository.getOne(id);
			entity.setName(dto.getName());
			entity = categoryRepository.save(entity);
			return new CategoryDTO(entity);
		}
		catch(EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
	}
	
	public void delete(Long id) {
        try {
            categoryRepository.deleteById(id);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }
	
	
}
