package com.devsuperior.ControleDeVendas.dto;

import com.devsuperior.ControleDeVendas.entities.Team;

import java.io.Serializable;

public class SaleSumByTeamDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String teamName;
    private Double sum;

    public SaleSumByTeamDTO() {
    }

    public SaleSumByTeamDTO(Team team, Double sum) {
        this.teamName = team.getName();
        this.sum = sum;
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
