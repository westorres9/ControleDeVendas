package com.devsuperior.ControleDeVendas.dto;

import com.devsuperior.ControleDeVendas.entities.Team;

import java.io.Serializable;

public class SaleSumByTeamDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long id;
    private String teamName;
    private Double sum;

    public SaleSumByTeamDTO() {
    }

    public SaleSumByTeamDTO(Long id, Team team, Double sum) {
    	this.id = team.getId();
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
