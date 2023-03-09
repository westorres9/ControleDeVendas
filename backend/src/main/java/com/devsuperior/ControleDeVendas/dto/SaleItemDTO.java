package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

import com.devsuperior.ControleDeVendas.entities.SaleItem;

public class SaleItemDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long productId;
	private String name;
	private Double price;
	private Integer quantity;
	private String imgUrl;

	public SaleItemDTO() {
	}

	public SaleItemDTO(Long productId, String name, Double price, Integer quantity, String imgUrl) {
		this.productId = productId;
		this.name = name;
		this.price = price;
		this.quantity = quantity;
		this.imgUrl = imgUrl;
	}

	public SaleItemDTO(SaleItem entity) {
		this.productId = entity.getProduct().getId();
		this.name = entity.getProduct().getName();
		this.price = entity.getPrice();
		this.quantity = entity.getQuantity();
		this.imgUrl = entity.getProduct().getImgUrl();
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	
	public Double getSubTotal () {
        return price * quantity;
    }

}
