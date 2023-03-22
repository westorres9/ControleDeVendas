package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

public class AverageMonthlyIncomeCustomerDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Double averageIncome;
	
	public AverageMonthlyIncomeCustomerDTO() {	// TODO Auto-generated constructor stub
	}

	public AverageMonthlyIncomeCustomerDTO(Double averageIncome) {
		this.averageIncome = averageIncome;
	}

	public Double getAverageIncome() {
		return averageIncome;
	}

	public void setAverageIncome(Double averageIncome) {
		this.averageIncome = averageIncome;
	}
	
	
	
	
}
