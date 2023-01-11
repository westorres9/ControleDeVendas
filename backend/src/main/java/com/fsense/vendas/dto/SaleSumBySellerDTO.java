package com.fsense.vendas.dto;

import java.io.Serializable;

import com.fsense.vendas.entities.User;

public class SaleSumBySellerDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
	private String sellerName;
	private Double sum;
	
	public SaleSumBySellerDTO() {
	}

	public SaleSumBySellerDTO(User seller, Double sum) {
		this.sellerName = seller.getName();
		this.sum = sum;
	}

	public String getSellerName() {
		return sellerName;
	}

	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}

	public Double getSum() {
		return sum;
	}

	public void setSum(Double sum) {
		this.sum = sum;
	}
	
	
}
