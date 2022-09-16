package com.devsuperior.ControleDeVendas.dto;

public class SaleUpdateDTO extends SaleDTO{
	private static final long serialVersionUID = 1L;
	
private Long sellerId;
	
	private Long teamId;
	
	public SaleUpdateDTO() {
		super();
	}

	public Long getSellerId() {
		return sellerId;
	}

	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}

	public Long getTeamId() {
		return teamId;
	}

}
