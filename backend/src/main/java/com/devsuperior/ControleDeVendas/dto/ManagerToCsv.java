package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

import com.devsuperior.ControleDeVendas.entities.User;

public class ManagerToCsv implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;
	private String email;
	
	public ManagerToCsv() {
	}

	public ManagerToCsv(String name, String email) {
		this.name = name;
		this.email = email;
	}
	
	public ManagerToCsv(User entity) {
		this.name = entity.getName();
		this.email = entity.getEmail();
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
	
	

}
