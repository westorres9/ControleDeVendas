package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

public class ProductMostSoldDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String name;
	private Long quantity;
	
	public ProductMostSoldDTO() {
	}

	public ProductMostSoldDTO(String name, Long quantity) {
		this.name = name;
		this.quantity = quantity;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	
	
}
