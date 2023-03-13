package com.devsuperior.ControleDeVendas.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.TeamDTO;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.TeamRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ForbiddenException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;

@Service
public class TeamService {

	@Autowired
	private TeamRepository repository;
	
	@Autowired
    private AuthService authService;

    @Autowired
    private UserRepository  userRepository;
	
	@Transactional(readOnly = true)
	public List<TeamDTO> findAll(){
		User user = authService.authenticated();
		if(user.hasRole("ROLE_MANAGER")) {
			List<Team> list = repository.findByManagerId(user.getId());
			return list.stream().map(x -> new TeamDTO(x)).collect(Collectors.toList());
		}
		List<Team> list = repository.findAll();
		return list.stream().map(x -> new TeamDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public TeamDTO findById(Long id) {
		User user = authService.authenticated();
		if(user.hasRole("ROLE_MANAGER")) {
			Optional<Team> obj = repository.findById(id);
	        Team entity = obj.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
	        if(entity.getManagers().contains(user)) {
	        	return new TeamDTO(entity, entity.getSellers());
	        }
	        else {
	        	throw new ForbiddenException("Forbidden Exception");
	        }
		}
		else {
			Optional<Team> obj = repository.findById(id);
	        Team entity = obj.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
	        return new TeamDTO(entity,entity.getSellers());
		}
		
	}
	
	@Transactional
	public TeamDTO insert(TeamDTO dto) {
		Team entity = new Team();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new TeamDTO(entity);
	}
	
	@Transactional
	public TeamDTO update(Long id, TeamDTO dto) {
		try {
			Team entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new TeamDTO(entity);
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
