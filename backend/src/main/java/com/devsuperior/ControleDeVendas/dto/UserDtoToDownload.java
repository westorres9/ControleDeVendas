package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.devsuperior.ControleDeVendas.entities.User;
import com.opencsv.bean.CsvBindByName;

public class UserDtoToDownload implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@NotBlank(message = "campo requerido")
	@CsvBindByName(column = "Name", required = true)
	private String name;
	
	@Email(message = "Favor insira um email valido")
	@CsvBindByName(column = "Email", required = true)
	private String email;
	
	@Email(message = "Favor insira um email valido")
	@CsvBindByName(column = "imgUrl", required = true)
	private String imgUrl;
	
	@Email(message = "Vendedor deve pertencer a uma equipe")
	@CsvBindByName(column = "TeamId", required = true)
	private Long teamId;
	
	public UserDtoToDownload() {
	}

	public UserDtoToDownload(String name, String email, String password, String imgUrl, Long teamId) {
		this.name = name;
		this.email = email;
		this.imgUrl = imgUrl;
		this.teamId = teamId;
	}
	
	public UserDtoToDownload(User entity) {
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.imgUrl = entity.getImgUrl();
		this.teamId = entity.getTeam().getId();
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

	public Long getTeamId() {
		return teamId;
	}

	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}
	
}
