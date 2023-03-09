package com.devsuperior.ControleDeVendas.dto;

import com.devsuperior.ControleDeVendas.entities.Team;

public class SumByTeamDTO {
	
	private Long id;
	private String teamName;
	private Double sum;
	
	public SumByTeamDTO() {
	}

	public SumByTeamDTO(Long id, Team team, Double sum) {
		this.id = id;
		this.teamName = team.getName();
		this.sum = sum;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public Double getSum() {
		return sum;
	}

	public void setSum(Double sum) {
		this.sum = sum;
	}
	
	
}
