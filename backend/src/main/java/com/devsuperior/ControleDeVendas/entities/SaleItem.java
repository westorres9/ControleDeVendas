package com.devsuperior.ControleDeVendas.entities;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tb_sale_item")
public class SaleItem implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	private SaleItemPK id = new SaleItemPK();
	
	private Integer quantity;
	private Double price;
	
	public SaleItem() {
	}

	public SaleItem(Sale sale, Product product, Integer quantity, Double price) {
		id.setSale(sale);
		id.setProduct(product);
		this.quantity = quantity;
		this.price = price;
	}

	public Sale getSale() {
		return id.getSale();
	}
	
	public void setSale(Sale sale) {
		id.setSale(sale);
	}
	
	public Product getProduct() {
		return id.getProduct();
	}
	
	public void setProduct(Product product) {
		id.setProduct(product);
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}
	
	

}
