package com.fsense.vendas.services;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fsense.vendas.dto.SaleDTO;
import com.fsense.vendas.dto.SaleSuccessDTO;
import com.fsense.vendas.dto.SaleSumBySellerDTO;
import com.fsense.vendas.dto.SaleSumByTeamDTO;
import com.fsense.vendas.entities.Sale;
import com.fsense.vendas.entities.User;
import com.fsense.vendas.repositories.SaleRepository;
import com.fsense.vendas.repositories.UserRepository;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Transactional(readOnly = true)
	public Page<SaleDTO> findAllPaged(Pageable pageable) {
		Page<Sale> page = repository.findAll(pageable);
		return page.map(x -> new SaleDTO(x));
	}
	
	@Transactional(readOnly = true)
	public List<SaleSumBySellerDTO> amountGroupedBySeller() {
		return repository.amountGroupedBySeller();
	}
	
	@Transactional(readOnly = true)
	public List<SaleSumByTeamDTO> amountGroupedByTeam() {
		return repository.amountGroupedByTeam();
	}
	
	@Transactional(readOnly = true)
	public List<SaleSuccessDTO> successGroupedBySeller() {
		return repository.successGroupedBySeller();
	}
	
	@Transactional
	public SaleDTO findById(Long id) {
		Optional<Sale> obj = repository.findById(id);
		Sale entity = obj.orElseThrow(() -> new EntityNotFoundException("Entity Not Found"));
		return new SaleDTO(entity);
	}
	
	@Transactional
	public SaleDTO insert(SaleDTO dto) {
		User user = userRepository.getReferenceById(dto.getSellerId());
		Sale entity = new Sale();
		entity.setDate(LocalDate.now());
		entity.setVisited(dto.getVisited());
		entity.setDeals(dto.getDeals());
		entity.setSeller(user);
		entity = repository.save(entity);
		return new SaleDTO(entity);
	}
		
}
