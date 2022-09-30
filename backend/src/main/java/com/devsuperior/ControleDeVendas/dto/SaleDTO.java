package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

import com.devsuperior.ControleDeVendas.entities.Sale;

public class SaleDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private LocalDate date;
	private Integer visited;
	private Integer deals;
	private Double amount;
	private Long sellerId;
	
	public SaleDTO() {
	}

	public SaleDTO(Long id, LocalDate date, Integer visited, Integer deals, Double amount, Long sellerId) {
		this.id = id;
		this.date = date;
		this.visited = visited;
		this.deals = deals;
		this.amount = amount;
		this.sellerId = sellerId;
	}
	
	public SaleDTO(Sale entity) {
		this.id = entity.getId();
		this.date = entity.getDate();
		this.visited = entity.getVisited();
		this.deals = entity.getDeals();
		this.amount = entity.getAmount();
		this.sellerId = entity.getSeller().getId();
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

	public Integer getVisited() {
		return visited;
	}

	public void setVisited(Integer visited) {
		this.visited = visited;
	}

	public Integer getDeals() {
		return deals;
	}

	public void setDeals(Integer deals) {
		this.deals = deals;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Long getSellerId() {
		return sellerId;
	}

	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}
	
	
	
	
}
