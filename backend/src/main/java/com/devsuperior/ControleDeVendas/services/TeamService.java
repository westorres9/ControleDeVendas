package com.devsuperior.ControleDeVendas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.TeamDTO;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.repositories.TeamRepository;

public class TeamService {
	
	@Autowired
	private TeamRepository repository;
	
	@Transactional(readOnly = true)
	public Page<TeamDTO> findAll(Pageable pageable) {
		Page<Team> page = repository.findAll(pageable);
		return page.map(x -> new TeamDTO(x));
	}

}
