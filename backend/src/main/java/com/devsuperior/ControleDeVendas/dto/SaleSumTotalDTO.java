package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

public class SaleSumTotalDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long deals;
	private Long calls;
	private Double amount;
	
	public SaleSumTotalDTO() {
	}

	public SaleSumTotalDTO(Long deals, Long calls, Double amount) {
		super();
		this.deals = deals;
		this.calls = calls;
		this.amount = amount;
	}
	
	public SaleSumTotalDTO(SaleSumTotal saleSumTotal) {
		this.deals = saleSumTotal.getDeals();
		this.calls = saleSumTotal.getCalls();
		this.amount = saleSumTotal.getAmount();
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

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	
}
