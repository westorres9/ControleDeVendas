package com.devsuperior.ControleDeVendas.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.ControleDeVendas.dto.CustomerDTO;
import com.devsuperior.ControleDeVendas.services.CustomerService;
@RestController
@RequestMapping(value = "/customers")
public class CustomerResource {
	
	@Autowired
	private CustomerService customerService;
	
	@GetMapping
	public ResponseEntity<List<CustomerDTO>> findAllCustomers() {
		List<CustomerDTO> page = customerService.findAll();
		return ResponseEntity.ok().body(page);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<CustomerDTO> findById(@PathVariable Long id) {
		CustomerDTO dto = customerService.findById(id);
		return ResponseEntity.ok().body(dto);
	}

	@PostMapping
	public ResponseEntity<CustomerDTO> insert(@RequestBody CustomerDTO dto) {
		dto = customerService.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}

	@PutMapping("/{id}")
	public ResponseEntity<CustomerDTO> update(@PathVariable Long id, @RequestBody CustomerDTO dto) {
		CustomerDTO newDto = customerService.update(id, dto);
		return ResponseEntity.ok().body(newDto);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		customerService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
