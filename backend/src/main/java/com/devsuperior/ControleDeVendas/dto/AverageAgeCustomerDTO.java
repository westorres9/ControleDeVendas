package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.time.LocalDate;

public class AverageAgeCustomerDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Double averageAge;
	
	public AverageAgeCustomerDTO() {
	}

	public AverageAgeCustomerDTO(Double averageAge) {
		this.averageAge = LocalDate.now().getYear() - averageAge;
	}

	public Double getAverageAge() {
		return averageAge;
	}

	public void setAverageAge(Double averageAge) {
		this.averageAge = averageAge;
	}
	
	
}
