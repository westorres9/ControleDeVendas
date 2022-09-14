package com.devsuperior.ControleDeVendas.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.dto.SaleInsertDTO;
import com.devsuperior.ControleDeVendas.dto.SaleUpdateDTO;
import com.devsuperior.ControleDeVendas.entities.Sale;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.SaleRepository;
import com.devsuperior.ControleDeVendas.repositories.TeamRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;
import com.devsuperior.ControleDeVendas.services.exceptions.UnauthorizedException;

@Service
public class SaleService {

	@Autowired
	private SaleRepository repository;

	@Autowired
	private AuthService authService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TeamRepository teamRepository;

	@Transactional(readOnly = true)
	public Page<SaleDTO> findAllPaged(Pageable pageable) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_SELLER")) {
			Page<Sale> page = repository.findBySeller(user, pageable);
			return page.map(x -> new SaleDTO(x));
		} else if (user.hasRole("ROLE_MANAGER")) {
			Page<Sale> page = repository.findByTeam(user.getTeam(), pageable);
			return page.map(x -> new SaleDTO(x));
		} else {
			Page<Sale> page = repository.findAll(pageable);
			return page.map(x -> new SaleDTO(x));
		}
	}

	@Transactional(readOnly = true)
	public SaleDTO findById(Long id) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_SELLER")) {
			Optional<Sale> obj = repository.findById(id);
			Sale entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));
			if (user.getId().equals(entity.getSeller().getId())) {
				return new SaleDTO(entity);
			} else {
				throw new UnauthorizedException("Unauthorized Exception");
			}
		} else {
			Optional<Sale> obj = repository.findById(id);
			Sale entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));
			return new SaleDTO(entity);
		}
	}

	@Transactional
	public SaleDTO insert(SaleInsertDTO dto) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_SELLER")) {
			Sale entity = new Sale();
			entity.setDate(dto.getDate());
			entity.setVisited(dto.getVisited());
			entity.setDeals(dto.getDeals());
			entity.setAmount(dto.getAmount());
			user = userRepository.getOne(dto.getSellerId());
			entity.setSeller(user);
			Team team = teamRepository.getOne(dto.getTeamId());
			entity.setTeam(team);
			entity = repository.save(entity);
			return new SaleDTO(entity);
		} else {
			throw new UnauthorizedException("Unauthorized Exception");
		}

	}

	@Transactional
	public SaleDTO update(Long id, SaleUpdateDTO dto) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_SELLER")) {
			try {
				Sale entity = repository.getOne(id);
				entity.setDate(dto.getDate());
				entity.setVisited(dto.getVisited());
				entity.setDeals(dto.getDeals());
				entity.setAmount(dto.getAmount());
				entity.setSeller(userRepository.getOne(entity.getSeller().getId()));
				entity.setTeam(teamRepository.getOne(entity.getTeam().getId()));
				entity = repository.save(entity);
				return new SaleDTO(entity);
			} catch (EntityNotFoundException e) {
				throw new ResourceNotFoundException("Entity not Found " + id);
			}
		} else {
			throw new UnauthorizedException("Unauthorized Exception");
		}

	}

	public void delete(Long id) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_SELLER")) {
			try {
				repository.deleteById(id);
			} catch (EntityNotFoundException e) {
				throw new ResourceNotFoundException("Entity not Found " + id);
			} catch (DataIntegrityViolationException e) {
				throw new DatabaseException("Integrity violation");
			}
		}
		else {
			throw new UnauthorizedException("Unauthorized Exception");
		}

	}

}
