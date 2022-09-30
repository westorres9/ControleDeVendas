package com.devsuperior.ControleDeVendas.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.TeamDTO;
import com.devsuperior.ControleDeVendas.dto.TeamDTO;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.repositories.TeamRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;
@Service
public class TeamService {
	
	@Autowired
	private TeamRepository repository;
	
	@Transactional(readOnly = true)
	public Page<TeamDTO> findAll(Pageable pageable) {
		Page<Team> page = repository.findAll(pageable);
		return page.map(x -> new TeamDTO(x));
	}
	
	@Transactional(readOnly = true)
	public TeamDTO findById(Long id) {
		Optional<Team> obj = repository.findById(id);
		Team entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not Found"));
		return new TeamDTO(entity);
	}

}
