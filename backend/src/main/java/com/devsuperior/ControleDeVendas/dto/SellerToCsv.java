package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.devsuperior.ControleDeVendas.entities.User;
import com.opencsv.bean.CsvBindByName;

public class SellerToCsv implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@NotBlank(message = "campo requerido")
	@CsvBindByName(column = "Name", required = true)
	private String name;
	
	@Email(message = "Favor insira um email valido")
	@CsvBindByName(column = "Email", required = true)
	private String email;
	
	@Email(message = "Vendedor deve pertencer a uma equipe")
	@CsvBindByName(column = "Team_Name", required = true)
	private String teamName;
	
	public SellerToCsv() {
	}

	public SellerToCsv(String name, String email,String teamName) {
		this.name = name;
		this.email = email;
		this.teamName = teamName;
	}
	
	public SellerToCsv(User entity) {
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.teamName = entity.getTeam().getName();
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

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
}
