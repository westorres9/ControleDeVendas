package com.devsuperior.ControleDeVendas.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSuccessDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumBySellerDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumByTeamDTO;
import com.devsuperior.ControleDeVendas.entities.Sale;
import com.devsuperior.ControleDeVendas.entities.SaleStatus;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.SaleRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;

@Service
public class SaleService {

    @Autowired
    private SaleRepository repository;
    
    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository  userRepository;
    
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
		User user = authService.authenticated();
		return repository.successGroupedBySeller();
	}

    @Transactional(readOnly = true)
    public Page<SaleDTO> findAllSales(String name,String minDate, String  maxDate, Pageable pageable) {
    	User user = authService.authenticated();
    	LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		LocalDate min = minDate.equals("") ? today.minusDays(365) : LocalDate.parse(minDate);
		LocalDate max = maxDate.equals("") ? today : LocalDate.parse(maxDate);
    	if(user.hasRole("ROLE_SELLER")) {
    		Page<Sale> page = repository.findBySeller(user.getId(),min, max,pageable);
    		return page.map(x -> new SaleDTO(x));
    	}
    	else if(user.hasRole("ROLE_MANAGER")) {
    		Page<Sale> page = repository.findByManager(user.getId(),name, min, max,pageable);
    		return page.map(x -> new SaleDTO(x));
    	}
        Page<Sale> page = repository.findAll(name, min, max,pageable);
        return page.map(x -> new SaleDTO(x));
    }

    @Transactional(readOnly = true)
    public SaleDTO findById(Long id) {
        Optional<Sale> obj = repository.findById(id);
        Sale entity = obj.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        return new SaleDTO(entity);
    }

    @Transactional
    public SaleDTO insert(SaleDTO dto) {
        Sale entity = new Sale();
        entity.setDate(LocalDate.now());
        entity.setAmount(dto.getAmount());
        entity.setDeals(dto.getDeals());
        entity.setVisited(dto.getVisited());
        entity.setStatus(SaleStatus.PENDING);
        entity.setSeller(userRepository.getOne(1L));
        entity = repository.save(entity);
        return new SaleDTO(entity);
    }

    @Transactional
    public SaleDTO update(Long id, SaleDTO dto) {
        try {
            Sale entity = repository.getOne(id);
            entity.setAmount(dto.getAmount());
            entity.setDeals(dto.getDeals());
            entity.setVisited(dto.getVisited());
            entity.setStatus(SaleStatus.PAID);
            entity.setSeller(userRepository.getOne(1L));
            entity = repository.save(entity);
            return new SaleDTO(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }
}
