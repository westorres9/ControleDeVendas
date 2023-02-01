package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.math.BigInteger;

public class SaleSumTotalDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long visited;
	private Long deals;
	private Double amount;
	
	public SaleSumTotalDTO() {
	}
	
	public SaleSumTotalDTO(Long visited, Long deals, Double amount) {
		this.visited = visited;
		this.deals = deals;
		this.amount = amount;
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
