package com.devsuperior.ControleDeVendas.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.RoleDTO;
import com.devsuperior.ControleDeVendas.dto.UserDTO;
import com.devsuperior.ControleDeVendas.dto.UserInsertDTO;
import com.devsuperior.ControleDeVendas.dto.UserUpdateDTO;
import com.devsuperior.ControleDeVendas.entities.Role;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.RoleRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;
import com.devsuperior.ControleDeVendas.services.exceptions.UnauthorizedException;

@Service
public class UserService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable, Long id) {
		authService.ValidateAdmin(id);
		Page<User> page = repository.findAll(pageable);
		return page.map(x -> new UserDTO(x));
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		User user = authService.authenticated();
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));
		return new UserDTO(entity, entity.getRoles());
	}
	
	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User user = authService.authenticated();
		if (!user.hasRole("ROLE_ADMIN") || !user.hasRole("ROLE_MANAGER")) {
			User entity = new User();
			copyDtoToEntity(entity, dto);
			entity.setPassword(passwordEncoder.encode(dto.getPassword()));
			entity = repository.save(entity);
			return new UserDTO(entity);
		}
		else {
			throw new UnauthorizedException("Unauthorized User");
		}
		
	}
	
	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		User user = authService.authenticated();
		if (!user.hasRole("ROLE_ADMIN") || !user.hasRole("ROLE_MANAGER")) {
			try {
				User entity = repository.getOne(id);
				copyDtoToEntity(entity, dto);
				entity = repository.save(entity);
				return new UserDTO(entity);
			}
			catch (EntityNotFoundException e) {
				throw new ResourceNotFoundException("Entity not Found " + id);
			}
		}
		else {
			throw new UnauthorizedException("Unauthorized User");
		}
		
	}
	
	
	public void delete(Long id) {
		User user = authService.authenticated();
		if (!user.hasRole("ROLE_ADMIN") || !user.hasRole("ROLE_MANAGER")) {
			try {
				repository.deleteById(id);
			}
			catch(EntityNotFoundException e) {
				throw new ResourceNotFoundException("Entity not Found " + id);
			}
			catch(DataIntegrityViolationException e) {
				throw new DatabaseException("Integrity violation");
			}
		}
		else {
			throw new UnauthorizedException("Unauthorized User");
		}
		
	}
	
	public void copyDtoToEntity(User entity, UserDTO dto) {
		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.getRoles().clear();
		for(RoleDTO roleDTO : dto.getRoles()) {
			Role role = roleRepository.getOne(roleDTO.getId());
			entity.getRoles().add(role);
		}
	}
	
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = repository.findByEmail(username);
        if (user == null) {
            logger.error("User not found " + username);
            throw new UsernameNotFoundException("Email Not found");
        }
        logger.info("User found " + username);
        return user;
    }
	
}
