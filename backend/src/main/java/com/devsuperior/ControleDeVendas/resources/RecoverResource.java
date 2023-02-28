package com.devsuperior.ControleDeVendas.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.ControleDeVendas.dto.UserDTO;
import com.devsuperior.ControleDeVendas.services.SellerService;
@RestController
@RequestMapping(value = "/recover")
public class RecoverResource {
	@Autowired
	private SellerService service;
	@GetMapping(value = "/{email}")
	public ResponseEntity<UserDTO> findByEmail(@PathVariable String email) {
		UserDTO dto = service.findByEmail(email);
		return ResponseEntity.ok().body(dto);
	}
}
