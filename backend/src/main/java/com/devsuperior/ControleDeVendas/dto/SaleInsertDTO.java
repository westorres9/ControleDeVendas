package com.devsuperior.ControleDeVendas.dto;

public class SaleInsertDTO extends SaleDTO {
	private static final long serialVersionUID = 1L;
	
	private Long sellerId;
	
	private Long teamId;
	
	public SaleInsertDTO() {
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

	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}
	
	

}
