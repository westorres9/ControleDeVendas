package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

public class SaleSumTotalByMonthDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer month;
	public Long visited;
	public Long deals;
	public Double amount;
	
	public SaleSumTotalByMonthDTO() {
	}

	public SaleSumTotalByMonthDTO(Integer month, Long visited, Long deals, Double amount) {
		this.month = month;
		this.visited = visited;
		this.deals = deals;
		this.amount = amount;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Long getVisited() {
		return visited;
	}

	public void setVisited(Long visited) {
		this.visited = visited;
	}

	public Long getDeals() {
		return deals;
	}

	public void setDeals(Long deals) {
		this.deals = deals;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	
	
	
	
	
}
