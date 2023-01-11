package com.fsense.vendas.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fsense.vendas.entities.User;

public class UserDTO implements Serializable {
    private static final long serialVersionUID = 1L;

	private Long id;
    private String name;
    private String email;
    private String phone;
    private LocalDate birthDate;
    
    public UserDTO() {
    }

	public UserDTO(Long id, String name, String email, String phone, LocalDate birthDate) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.birthDate = birthDate;
	}
	
	public UserDTO(User entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.phone = entity.getPhone();
		this.birthDate = entity.getBirthDate();
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}
    
    

}
