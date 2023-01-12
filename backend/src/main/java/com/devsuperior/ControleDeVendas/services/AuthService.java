package com.devsuperior.ControleDeVendas.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.ForbiddenException;
import com.devsuperior.ControleDeVendas.services.exceptions.UnauthorizedException;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public User authenticated() {
		try {
			String username = SecurityContextHolder.getContext().getAuthentication().getName();
			return userRepository.findByEmail(username);
		}
		catch (Exception e) {
			throw new UnauthorizedException("Unauthorized"); 
		}
		
	}
	
	@Transactional(readOnly = true)
	public void validateSelf(Long userId) {
		User user = authenticated();
		if(!user.getId().equals(userId)) {
			throw new ForbiddenException("Forbidden Exception");
		}
	}
	
	@Transactional(readOnly = true)
	public void ValidateAdmin(Long userId) {
		User user = authenticated();
		if(!user.hasRole("ROLE_ADMIN")) {
			throw new ForbiddenException("Forbidden Exception");
		}
	}
	
	@Transactional(readOnly = true)
	public void ValidateSelfOrAdmin(Long userId) {
		User user = authenticated();
		if(!user.getId().equals(userId) || !user.hasRole("ROLE_ADMIN")) {
			throw new ForbiddenException("Forbidden Exception");
		}
	}
	
	@Transactional(readOnly = true)
	public void ValidateManagerOrAdmin(Long userId) {
		User user = authenticated();
		if(!user.hasRole("ROLE_ADMIN") || !user.hasRole("ROLE_MANAGER")) {
			throw new ForbiddenException("Forbidden Exception");
		}
	}
	
	
	
	
	
	
	
	
}
