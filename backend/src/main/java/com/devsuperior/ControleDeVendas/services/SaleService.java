package com.devsuperior.ControleDeVendas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.entities.Sale;
import com.devsuperior.ControleDeVendas.repositories.SaleRepository;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository repository;
	
	@Transactional(readOnly = true)
	public Page<SaleDTO> findAll(Pageable pageable) {
		Page<Sale> page = repository.findAll(pageable);
		return page.map(x -> new SaleDTO(x));
	}
}
