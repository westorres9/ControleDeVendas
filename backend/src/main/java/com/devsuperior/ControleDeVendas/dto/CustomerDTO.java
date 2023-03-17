package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PositiveOrZero;

import com.devsuperior.ControleDeVendas.entities.Customer;

public class CustomerDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotEmpty(message = "nome da cliente deve ser preenchido")
	private String name;
	@Email(message = "Favor insira um email válido")
	@NotEmpty(message = "Email deve ser preenchido")
	private String email;
	private LocalDate birthDate;
	@PositiveOrZero(message = "Renda mensal deve ser 0 ou valor positivo")
	@NotEmpty(message = "Renda mensal deve ser preenchido")
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
