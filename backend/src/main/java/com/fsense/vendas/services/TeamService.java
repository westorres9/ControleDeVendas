package com.fsense.vendas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fsense.vendas.dto.TeamDTO;
import com.fsense.vendas.entities.Team;
import com.fsense.vendas.repositories.TeamRepository;

@Service
public class TeamService {
	
	@Autowired
	private TeamRepository repository;
	
	@Transactional(readOnly = true)
	public Page<TeamDTO> findAllPaged(Pageable pageable) {
		Page<Team> page = repository.findAll(pageable);
		return page.map(x -> new TeamDTO(x));
	}
	
}
