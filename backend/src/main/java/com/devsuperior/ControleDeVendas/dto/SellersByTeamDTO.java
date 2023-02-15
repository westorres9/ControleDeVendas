package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

public class SellersByTeamDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String sellerName;
	public Long visited;
	public Long deals;
	public Double amount;
	
	public SellersByTeamDTO() {
	}

	public SellersByTeamDTO(String sellerName, Long visited, Long deals, Double amount) {
		this.sellerName = sellerName;
		this.visited = visited;
		this.deals = deals;
		this.amount = amount;
	}

	public String getSellerName() {
		return sellerName;
	}

	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
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
