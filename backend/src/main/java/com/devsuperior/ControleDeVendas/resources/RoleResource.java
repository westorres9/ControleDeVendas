package com.devsuperior.ControleDeVendas.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.ControleDeVendas.dto.RoleDTO;
import com.devsuperior.ControleDeVendas.services.RoleService;
@RestController
@RequestMapping(value = "/roles")
public class RoleResource {

	@Autowired
	private RoleService service;
	
	@GetMapping
	public ResponseEntity<List<RoleDTO>> findAll() {
		List<RoleDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
}
