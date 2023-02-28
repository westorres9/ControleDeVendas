package com.devsuperior.ControleDeVendas.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.UserDTO;
import com.devsuperior.ControleDeVendas.dto.UserDtoToDownload;
import com.devsuperior.ControleDeVendas.dto.UserInsertDTO;
import com.devsuperior.ControleDeVendas.dto.UserUpdateDTO;
import com.devsuperior.ControleDeVendas.entities.RoleType;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.RoleRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;

@Service
public class SellerService {
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Value("${spring.mail.username}")
	private String mailSendFrom;
	
	@Autowired
    private AuthService authService;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
    private BCryptPasswordEncoder passwordEncoder;
	
	@Transactional(readOnly = true)
	public List<UserDtoToDownload> findAllSellers(){
		User user = authService.authenticated();
		if(user.hasRole("ROLE_MANAGER")) {
			List<User> list = repository.findSellersByTeam(user.getId());
			return list.stream().map(x -> new UserDtoToDownload(x)).collect(Collectors.toList());
		}
		else {
			List<User> list = repository.findSellers();
			return list.stream().map(x -> new UserDtoToDownload(x)).collect(Collectors.toList());
		}
	}
	
	@Transactional(readOnly = true)
	public List<UserDTO> findAll(String name){
		User user = authService.authenticated();
		if(user.hasRole("ROLE_MANAGER")) {
			List<User> list = repository.findSellersByTeam(user.getId());
			return list.stream().map(x -> new UserDTO(x)).collect(Collectors.toList());
		}
		else {
			List<User> list = repository.findSellersByName(name);
			return list.stream().map(x -> new UserDTO(x)).collect(Collectors.toList());
		}	
	}
	
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
        User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        if(entity.hasRole("ROLE_SELLER")) {
        	 return new UserDTO(entity);
        }
        else {
        	throw new ResourceNotFoundException("Id not found " + id);
        }       
	}
	
	@Transactional(readOnly = true)
	public UserDTO findByEmail(String email) {
		User entity = repository.findByEmail(email);
		if(entity != null) {
			 SimpleMailMessage message = new SimpleMailMessage();
		        message.setText("Segue link para redefinição de senha http://127.0.0.1:5500/app/index.html#/reset-password");
		        message.setTo(email);
		        message.setSubject("Redefinição de Senha");
		        message.setFrom(mailSendFrom);

		        try {
		            mailSender.send(message);
		        } catch (Exception e) {
		            e.printStackTrace();
		        }
			return new UserDTO(entity);
		}
		else {
			throw new ResourceNotFoundException("Email not found " + email);
		}
	}
	
	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User loggedUser = authService.authenticated();
		User entity = new User();
		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity.setImgUrl(dto.getImgUrl());
		entity.getRoles().clear();
		entity.getRoles().add(roleRepository.findByAuthority(RoleType.SELLER));
		entity = repository.save(entity);
		List<Team> teams = new ArrayList<>();
		teams.addAll(loggedUser.getTeams());
		Team team = teams.get(0);
		entity.setTeam(team);
		return new UserDTO(entity);
	}
	
	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity.setImgUrl(dto.getImgUrl());
			entity.setPassword(passwordEncoder.encode(dto.getPassword()));
			entity = repository.save(entity);
			return new UserDTO(entity);
		}
		catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
	}
	
	public void delete(Long id) {
        try {
            repository.deleteById(id);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
    }

}
