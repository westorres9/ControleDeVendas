package com.fsense.vendas.dto;

import java.io.Serializable;

import com.fsense.vendas.entities.Team;

public class SaleSumByTeamDTO  implements Serializable {
    private static final long serialVersionUID = 1L;
    
	private String teamName;
	private Double sum;
	
	public SaleSumByTeamDTO() {
	}

	public SaleSumByTeamDTO(Team team, Double sum) {
		this.teamName = team.getName();
		this.sum = sum;
	}

	public String getSellerName() {
		return teamName;
	}

	public void setSellerName(String teamName) {
		this.teamName = teamName;
	}

	public Double getSum() {
		return sum;
	}

	public void setSum(Double sum) {
		this.sum = sum;
	}
	
	
	

}
