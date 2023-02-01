package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;

public class TeamDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String imgUrl;
	private List<UserDTO> sellers = new ArrayList<>();
	
	public TeamDTO() {
	}

	public TeamDTO(Long id, String name,String imgUrl) {
		this.id = id;
		this.name = name;
		this.imgUrl = imgUrl;

	}
	
	public TeamDTO(Team entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.imgUrl = entity.getImgUrl();
	}
	
	public TeamDTO(Team entity, List<User> sellers) {
		this(entity);
		sellers.forEach(seller -> this.sellers.add(new UserDTO(seller)));
		
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

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public List<UserDTO> getSellers() {
		return sellers;
	}
}
