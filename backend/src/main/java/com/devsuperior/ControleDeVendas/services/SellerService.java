package com.devsuperior.ControleDeVendas.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.SellerToCsv;
import com.devsuperior.ControleDeVendas.dto.UserDTO;
import com.devsuperior.ControleDeVendas.dto.UserInsertDTO;
import com.devsuperior.ControleDeVendas.dto.UserUpdateDTO;
import com.devsuperior.ControleDeVendas.entities.PasswordResetToken;
import com.devsuperior.ControleDeVendas.entities.RoleType;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.PasswordResetTokenRepository;
import com.devsuperior.ControleDeVendas.repositories.RoleRepository;
import com.devsuperior.ControleDeVendas.repositories.TeamRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.ForbiddenException;
import com.devsuperior.ControleDeVendas.services.exceptions.InvalidTokenException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;

@Service
public class SellerService {
	
	@Autowired
	private PasswordResetTokenRepository passwordResetTokenRepository;
	
	private static String standardPassword = "123456";
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Value("${spring.mail.username}")
	private String mailSendFrom;
	
	@Autowired
    private AuthService authService;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private TeamRepository teamRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
    private BCryptPasswordEncoder passwordEncoder;
	
	@Transactional(readOnly = true)
	public List<SellerToCsv> findAllSellers(){
		User user = authService.authenticated();
		if(user.hasRole("ROLE_MANAGER")) {
			List<User> list = repository.findSellersByTeam(user.getId());
			return list.stream().map(x -> new SellerToCsv(x)).collect(Collectors.toList());
		}
		else {
			List<User> list = repository.findSellers();
			return list.stream().map(x -> new SellerToCsv(x)).collect(Collectors.toList());
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
	
	@Transactional
	public UserDTO findByEmail(String email) {
		User entity = repository.findByEmail(email);
		if(entity != null) {
			String token = UUID.randomUUID().toString();
			createPasswordResetTokenForUser(entity, token);
			 SimpleMailMessage message = new SimpleMailMessage();
		        message.setText("Segue link para redefinição de senha http://127.0.0.1:5500/app/index.html#/valid-token?token="+token);
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
		entity.setPassword(passwordEncoder.encode(standardPassword));
		entity.setImgUrl("https://user-images.githubusercontent.com/91570669/227945652-111c999f-a07c-4b1e-9eb8-24c83e90d2a4.png");
		entity.getRoles().clear();
		entity.getRoles().add(roleRepository.findByAuthority(RoleType.SELLER));
		entity = repository.save(entity);
		if(loggedUser.hasRole("ROLE_MANAGER")) {
			List<Team> teams = new ArrayList<>();
			teams.addAll(loggedUser.getTeams());
			Team team = teams.get(0);
			entity.setTeam(team);
			return new UserDTO(entity);
		}
		else if(loggedUser.hasRole("ROLE_ADMIN")) {
			Team team = teamRepository.getOne(1L);
			entity.setTeam(team);
			return new UserDTO(entity);
		}
		else {
			throw new ForbiddenException("Access denied");
		}	
	}
	
	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User loggedUser = authService.authenticated();
			User entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity.setImgUrl(dto.getImgUrl());
			entity.setPassword(passwordEncoder.encode(standardPassword));
			entity = repository.save(entity);
			List<Team> teams = new ArrayList<>();
			teams.addAll(loggedUser.getTeams());
			Team team = teams.get(0);
			entity.setTeam(team);
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
	
	public void createPasswordResetTokenForUser(User user, String token) {
		PasswordResetToken myToken = new PasswordResetToken(token, user.getId());
		passwordResetTokenRepository.save(myToken);
		
	}

	@Transactional
	public UserDTO validToken(String token) {
		
		final PasswordResetToken passToken = passwordResetTokenRepository.findByToken(token);
		
		if (!isTokenFound(passToken)) {
			throw new InvalidTokenException("token not found");
		}
		else if (isTokenExpired(passToken) == true) {
			throw new InvalidTokenException("token expired");
		}
		else {
			User user = repository.getOne(passToken.getUserId());
			return new UserDTO(user);
		}
	}
	
	private boolean isTokenFound(PasswordResetToken passToken) {
		return passToken != null;
	}
	
	private boolean isTokenExpired(PasswordResetToken passToken) {
		final Calendar cal = Calendar.getInstance();
		return passToken.getExpiryDate().before(cal.getTime());
	}

}
