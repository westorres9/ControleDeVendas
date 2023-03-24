package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.math.BigDecimal;

public class CustomersWithMostPurchasesDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;
	private Double quantity;
	
	public CustomersWithMostPurchasesDTO() {
	}

	public CustomersWithMostPurchasesDTO(String name, Double quantity) {
		this.name = name;
		this.quantity = quantity;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
}
