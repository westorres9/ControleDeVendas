package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.time.LocalDate;

public class SalesByDateDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private LocalDate date;
	private Double amount;
	
	public SalesByDateDTO() {
	}

	public SalesByDateDTO(LocalDate date, Double amount) {
		this.date = date;
		this.amount = amount;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}
}
