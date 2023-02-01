package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.devsuperior.ControleDeVendas.entities.Role;
import com.devsuperior.ControleDeVendas.entities.User;

public class UserDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	@NotBlank(message = "campo requerido")
	private String name;
	@Email(message = "Favor insira um email valido")
	private String email;
	private String imgUrl;
	
	public UserDTO() {
	}

	public UserDTO(Long id, String name, String email,String imgUrl) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.imgUrl = imgUrl;
	}
	
	public UserDTO(User entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.imgUrl = entity.getImgUrl();
	}
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	
	

}
