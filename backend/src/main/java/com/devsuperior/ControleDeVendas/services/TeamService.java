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
import com.devsuperior.ControleDeVendas.dto.TeamDTO;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.entities.Team;
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
	private UserRepository userRepository;

	@Autowired
	private AuthService authService;

	@Transactional(readOnly = true)
	public Page<TeamDTO> findAll(Pageable pageable) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_MANAGER")) {
			Page<Team> page = repository.findByManage(user.getId(), pageable);
			return page.map(x -> new TeamDTO(x));
		} else {
			Page<Team> page = repository.findAll(pageable);
			return page.map(x -> new TeamDTO(x));
		}

	}

	@Transactional(readOnly = true)
	public TeamDTO findById(Long id) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_MANAGER")) {
			Optional<Team> obj = repository.findById(id);
			Team entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not Found"));
			if (!entity.getManagers().contains(user)) {
				throw new UnauthorizedException("Unauthorized");
			} else {
				return new TeamDTO(entity);
			}
		} else {
			Optional<Team> obj = repository.findById(id);
			Team entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not Found"));
			return new TeamDTO(entity);
		}

	}

	@Transactional
	public TeamDTO insert(TeamDTO dto) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_MANAGER")) {
			Team entity = new Team();
			entity.setName(dto.getName());
			entity.getManagers().add(user);
			entity = repository.save(entity);
			return new TeamDTO(entity);
		} else {
			throw new UnauthorizedException("Unauthorized");
		}

	}

	@Transactional
	public TeamDTO update(Long id, TeamDTO dto) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_MANAGER")) {
			try {
				Team entity = repository.getOne(id);
				if (!entity.getManagers().contains(user)) {
					throw new UnauthorizedException("Unauthorized");
				} else {
					entity.setName(dto.getName());
					entity.getManagers().add(user);
					entity = repository.save(entity);
					return new TeamDTO(entity);
				}

			} catch (EntityNotFoundException e) {
				throw new ResourceNotFoundException("Entity not Found " + id);
			}
		} else {
			throw new UnauthorizedException("Unauthorized");
		}

	}

	public void delete(Long id) {
		User user = authService.authenticated();
		if (user.hasRole("ROLE_MANAGER")) {
			try {
				repository.deleteById(id);
			} catch (EntityNotFoundException e) {
				throw new ResourceNotFoundException("Entity not Found " + id);
			} catch (DataIntegrityViolationException e) {
				throw new DatabaseException("Integrity violation");
			}
		} else {
			throw new UnauthorizedException("Unauthorized");
		}
	}

}
