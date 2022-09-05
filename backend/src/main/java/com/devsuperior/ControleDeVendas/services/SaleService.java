package com.devsuperior.ControleDeVendas.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.entities.Sale;
import com.devsuperior.ControleDeVendas.repositories.SaleRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository repository;
	
	@Transactional(readOnly = true)
	public Page<SaleDTO> findAllPaged(Pageable pageable) {
		Page<Sale> page = repository.findAll(pageable);
		return page.map(x -> new SaleDTO(x));
	}
	
	@Transactional(readOnly = true)
	public SaleDTO findById(Long id) {
		Optional<Sale> obj = repository.findById(id);
		Sale entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));
		return new SaleDTO(entity);
	}
	
	@Transactional
	public SaleDTO insert(SaleDTO dto) {
		Sale entity = new Sale();
		entity.setDate(dto.getDate());
		entity.setVisited(dto.getVisited());
		entity.setDeals(dto.getDeals());
		entity.setAmount(dto.getAmount());
		entity = repository.save(entity);
		return new SaleDTO(entity);
	}
	
	
	
}
