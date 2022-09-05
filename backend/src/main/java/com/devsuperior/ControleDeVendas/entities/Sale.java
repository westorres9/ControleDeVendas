package com.devsuperior.ControleDeVendas.entities;

import java.time.LocalDate;

public class Sale {
	
	private Long id;
	private LocalDate date;
	private Integer deals;
	private Integer visited;
	private Double amount;
	
	public Sale() {
	}
	
	public Sale(Long id, LocalDate date, Integer deals, Integer visited, Double amount) {
		super();
		this.id = id;
		this.date = date;
		this.deals = deals;
		this.visited = visited;
		this.amount = amount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Integer getDeals() {
		return deals;
	}

	public void setDeals(Integer deals) {
		this.deals = deals;
	}

	public Integer getVisited() {
		return visited;
	}

	public void setVisited(Integer visited) {
		this.visited = visited;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	
}
