package com.devsuperior.ControleDeVendas.resources;

import java.io.IOException;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.devsuperior.ControleDeVendas.dto.PathDTO;
import com.devsuperior.ControleDeVendas.dto.UserDTO;
import com.devsuperior.ControleDeVendas.dto.UserUpdateDTO;
import com.devsuperior.ControleDeVendas.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserResource {
	
	@Autowired
	private UserService service;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
		UserDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody UserUpdateDTO dto) {
		UserDTO newDto = service.update(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PostMapping("/{id}/image")
	public ResponseEntity<PathDTO> updateImage(@PathVariable Long id, @RequestParam(value = "file") MultipartFile file)throws IOException{
		String path = service.updateUserImage(id, file);
		if(path!= null) {
			PathDTO pathDTO = new PathDTO();
			pathDTO.setPathFile(path);
			return ResponseEntity.status(201).body(pathDTO);			
		}
		return ResponseEntity.badRequest().build();
	}
	
	@PutMapping("/{id}/username")
	public ResponseEntity<UserDTO> updateUsername(@PathVariable Long id, @RequestBody UserUpdateDTO dto) {
		UserDTO newDto = service.updateUsername(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping("/{id}/email")
	public ResponseEntity<UserDTO> updateEmail(@PathVariable Long id, @RequestBody UserUpdateDTO dto) {
		UserDTO newDto = service.updateEmail(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping("/{id}/password")
	public ResponseEntity<UserDTO> updatePassword(@PathVariable Long id, @RequestBody UserUpdateDTO dto) {
		UserDTO newDto = service.updatePassowrd(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
}
