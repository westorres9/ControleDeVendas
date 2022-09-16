package com.devsuperior.ControleDeVendas.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.TeamDTO;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.TeamRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;
import com.devsuperior.ControleDeVendas.services.exceptions.UnauthorizedException;

@Service
public class TeamService {
	
	@Autowired
	private TeamRepository repository;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public Page<TeamDTO> findAllPaged(Pageable pageable) {
		User user = authService.authenticated();
		if(user.hasRole("ROLE_MANAGER")) {
			Page<Team> page = repository.findByManager(user, pageable);
			return page.map(x -> new TeamDTO(x));
		}
		else if (user.hasRole("ROLE_ADMIN")) {
			Page<Team> page = repository.findAll(pageable);
			return page.map(x -> new TeamDTO(x));
		}
		throw new UnauthorizedException("Unauthorized Exception");	
	}
	
	@Transactional(readOnly = true)
	public TeamDTO findById(Long id) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_ADMIN") ) {
			Optional<Team> obj = repository.findById(id);
			Team entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));
			return new TeamDTO(entity);
		} 
		else if (user.hasRole("ROLE_MANAGER")) {
			Optional<Team> obj = repository.findById(id);
			Team entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));
			if(entity.getManager().getId().equals(user.getId())) {
				return new TeamDTO(entity);
			}
			throw new UnauthorizedException("Unauthorized Exception");	
		}
		throw new UnauthorizedException("Unauthorized Exception");	
		
	}
	
	@Transactional
	public TeamDTO insert(TeamDTO dto) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_ADMIN")) {
			Team entity = new Team();
			entity.setName(dto.getName());
			user = userRepository.getOne(dto.getManagerId());
			entity.setManager(user);
			entity = repository.save(entity);
			return new TeamDTO(entity);
		}
		throw new UnauthorizedException("Unauthorized Exception");	
	}
	
	@Transactional
	public TeamDTO update(Long id, TeamDTO dto) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_ADMIN")) {
			try {
				Team entity = repository.getOne(id);
				entity.setName(dto.getName());
				entity.setManager(userRepository.getOne(entity.getManager().getId()));
				entity = repository.save(entity);
				return new TeamDTO(entity);
			}
			catch (EntityNotFoundException e) {
				throw new ResourceNotFoundException("Entity not Found " + id);
			}
		}
		throw new UnauthorizedException("Unauthorized Exception");
	}
	
	
	public void delete(Long id) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_ADMIN")) {
			try {
				repository.deleteById(id);
			}
			catch(EntityNotFoundException e) {
				throw new ResourceNotFoundException("Entity not Found " + id);
			}
			catch(DataIntegrityViolationException e) {
				throw new DatabaseException("Integrity violation");
			}
		}
		throw new UnauthorizedException("Unauthorized Exception");
		
	}
	
	
	
}
