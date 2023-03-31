package com.devsuperior.ControleDeVendas.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.UserDTO;
import com.devsuperior.ControleDeVendas.dto.UserUpdateDTO;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);


	@Autowired
	private UserRepository repository;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
    private BCryptPasswordEncoder passwordEncoder;

	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = repository.findByEmailWithRoles(username);
        if (user == null) {
            logger.error("User not found " + username);
            throw new UsernameNotFoundException("Email Not found");
        }
        logger.info("User found " + username);
        return user;
    }
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> opt = repository.findById(id);
		User entity = opt.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
		return new UserDTO(entity);
	}
	
	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		User entity = authService.authenticated();
		try {
			entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity.setEmail(dto.getEmail());
			entity.setImgUrl(dto.getImgUrl());
			entity.setPassword(passwordEncoder.encode(dto.getPassword()));
			entity = repository.save(entity);
			return new UserDTO(entity);
		}
		catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
	}
	
}
