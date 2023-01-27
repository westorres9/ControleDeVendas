package com.devsuperior.ControleDeVendas.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import com.devsuperior.ControleDeVendas.dto.SaleSuccessDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumBySellerDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumByTeamDTO;
import com.devsuperior.ControleDeVendas.entities.SaleStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.entities.Sale;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.SaleRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;
import com.devsuperior.ControleDeVendas.services.exceptions.UnauthorizedException;

@Service
public class SaleService {

    @Autowired
    private SaleRepository repository;

    @Autowired
    private UserRepository  userRepository;

    @Transactional(readOnly = true)
    public Page<SaleDTO> findAllSales(Pageable pageable) {
        Page<Sale> page = repository.findAll(pageable);
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
            throw new ResourceNotFoundException("Ifd not found " + id);
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
