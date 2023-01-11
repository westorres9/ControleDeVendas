package com.fsense.vendas.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fsense.vendas.dto.TeamDTO;
import com.fsense.vendas.services.TeamService;

@RestController
@RequestMapping("/teams")
public class TeamResource {
	
	@Autowired
	private TeamService service;
	
	@GetMapping
	public ResponseEntity<Page<TeamDTO>> findAll(Pageable pageable) {
		Page<TeamDTO> page = service.findAllPaged(pageable);
		return ResponseEntity.ok().body(page);
	}
}
