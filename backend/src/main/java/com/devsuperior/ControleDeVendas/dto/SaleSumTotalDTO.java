package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

public class SaleSumTotalDTO implements SaleSumTotal, Serializable {
	private static final long serialVersionUID = 1L;
	
	public Long visited;
	public Long deals;
	public Double amount;
	
	public SaleSumTotalDTO() {
	}
	
	public SaleSumTotalDTO(Long visited, Long deals, Double amount) {
		this.visited = visited;
		this.deals = deals;
		this.amount = amount;
	}

	public SaleSumTotalDTO(SaleSumTotal sumtotal) {
		this.visited = sumtotal.getVisited();
		this.deals = sumtotal.getDeals();
		this.amount = sumtotal.getAmount();
	}

	public void setVisited(Long visited) {
		this.visited = visited;
	}

	public void setDeals(Long deals) {
		this.deals = deals;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}


	@Override
	public Long getVisited() {
		return visited;
	}

	@Override
	public Long getDeals() {
		return deals;
	}

	@Override
	public Double getAmount() {
		return amount;
	}
	
	
	
}
