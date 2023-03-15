package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.devsuperior.ControleDeVendas.entities.Customer;

public class CustomerDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String email;
	private LocalDate birthDate;
	private Double monthlyIncome;

	public CustomerDTO() {
	}

	public CustomerDTO(Long id, String name, String email, LocalDate birthDate,
			Double monthlyIncome) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.birthDate = birthDate;
		this.monthlyIncome = monthlyIncome;
	}

	public CustomerDTO(Customer entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.birthDate = entity.getBirthDate();
		this.monthlyIncome = entity.getMonthlyIncome();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public Double getMonthlyIncome() {
		return monthlyIncome;
	}

	public void setMonthlyIncome(Double monthlyIncome) {
		this.monthlyIncome = monthlyIncome;
	}

	@Override
	public String toString() {
		return getName();
	}
}
