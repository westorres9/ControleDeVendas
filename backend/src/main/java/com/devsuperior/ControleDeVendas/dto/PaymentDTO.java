package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

import com.devsuperior.ControleDeVendas.entities.Payment;

public class PaymentDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	private LocalDate moment;

	public PaymentDTO() {
	}

	public PaymentDTO(Long id, LocalDate moment) {
		this.id = id;
		this.moment = moment;
	}

	public PaymentDTO(Payment entity) {
		this.id = entity.getId();
		this.moment = entity.getMoment();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getMoment() {
		return moment;
	}

	public void setMoment(LocalDate moment) {
		this.moment = moment;
	}

	@Override
	public String toString() {
		return moment.toString();
	}

}
