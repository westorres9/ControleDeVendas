package com.devsuperior.ControleDeVendas.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.ManagerToCsv;
import com.devsuperior.ControleDeVendas.dto.UserDTO;
import com.devsuperior.ControleDeVendas.dto.UserInsertDTO;
import com.devsuperior.ControleDeVendas.entities.RoleType;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.RoleRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ForbiddenException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;
@Service
public class ManagerService {

	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
    private BCryptPasswordEncoder passwordEncoder;
	
	private static String standardPassword = "123456";
	
	@Transactional(readOnly = true)
	public List<UserDTO> findAll(String name){
		List<User> list = repository.findManagersByName(name);
		return list.stream().map(x -> new UserDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<ManagerToCsv> findManagers() {
		List<User> list = repository.findManagers();
		return list.stream().map(x -> new ManagerToCsv(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
        User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        if(entity.hasRole("ROLE_MANAGER")) {
        	 return new UserDTO(entity);
        }
        else {
        	throw new ResourceNotFoundException("Id not found " + id);
        }       
	}
	
	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setPassword(passwordEncoder.encode(standardPassword));
		entity.setImgUrl("https://user-images.githubusercontent.com/91570669/227945652-111c999f-a07c-4b1e-9eb8-24c83e90d2a4.png");
		entity.getRoles().clear();
		entity.getRoles().add(roleRepository.findByAuthority(RoleType.MANAGER));
		entity = repository.save(entity);
		return new UserDTO(entity);
	}
	
	@Transactional
	public UserDTO update(Long id, UserInsertDTO dto) {
		User user = authService.authenticated();
		if(user.hasRole("ROLE_ADMIN")) {
			try {
				User entity = repository.getOne(id);
				entity.setName(dto.getName());
				entity.setEmail(dto.getEmail());
				entity = repository.save(entity);
				return new UserDTO(entity);
			}
			catch (EntityNotFoundException e) {
	            throw new ResourceNotFoundException("Id not found " + id);
	        }
		}
		else if (user.hasRole("ROLE_MANAGER")) {
			try {
				User entity = repository.getOne(id);
				entity.setName(dto.getName());
				entity.setEmail(dto.getEmail());
				entity.setImgUrl(dto.getImgUrl());
				entity.setPassword(dto.getPassword());
				entity = repository.save(entity);
				return new UserDTO(entity);
			}
			catch (EntityNotFoundException e) {
	            throw new ResourceNotFoundException("Id not found " + id);
	        }
		}
		else {
	            throw new ForbiddenException("Bad Request");
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
