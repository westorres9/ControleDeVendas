package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

import com.devsuperior.ControleDeVendas.entities.Team;

public class TeamDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private Long managerId;
	private String managerName;
	
	public TeamDTO() {
	}

	public TeamDTO(Long id, String name, Long managerId, String managerName) {
		this.id = id;
		this.name = name;
		this.managerId = managerId;
		this.managerName = managerName;
	}
	
	public TeamDTO(Team entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.managerId = entity.getManager().getId();
		this.managerName = entity.getManager().getName();
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

	public Long getManagerId() {
		return managerId;
	}

	public void setManagerId(Long managerId) {
		this.managerId = managerId;
	}

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}
	
	

}
