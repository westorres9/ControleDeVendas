package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

import com.devsuperior.ControleDeVendas.entities.User;

public class SaleTaxSuccessDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String sellerName;
	private Long deals;
	private Long calls;
	
	public SaleTaxSuccessDTO() {
	}

	public SaleTaxSuccessDTO(User seller, Long deals, Long calls) {
		this.sellerName = seller.getName();
		this.deals = deals;
		this.calls = calls;
	}

	public String getSellerName() {
		return sellerName;
	}

	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}

	public Long getDeals() {
		return deals;
	}

	public void setDeals(Long deals) {
		this.deals = deals;
	}

	public Long getCalls() {
		return calls;
	}

	public void setCalls(Long calls) {
		this.calls = calls;
	}
	
	
}

