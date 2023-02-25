package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.devsuperior.ControleDeVendas.entities.Sale;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;

public class SaleDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@CsvBindByName(column = "Id", required = true)
	private Long id;
	
	@CsvBindByName(column = "Date", required = true)
	@CsvDate("yyyy-MM-dd")
	private LocalDate date;
    
	@CsvBindByName(column = "Visitas", required = true)
	private Integer visited;
	
	@CsvBindByName(column = "Vendas", required = true)
	private Integer deals;
	
	@CsvBindByName(column = "Total", required = true)
	private Double amount;
	
	@CsvBindByName(column = "Status", required = true)
	private String status;
	
	@CsvBindByName(column = "Id Vendedor", required = true)
	private Long sellerId;
	
	@CsvBindByName(column = "Nome Vendedor", required = true)
	private String sellerName;
	
	public SaleDTO() {
	}

	public SaleDTO(Long id, LocalDate date, Integer visited, Integer deals, Double amount,String status, Long sellerId, String sellerName) {
		this.id = id;
		this.date = date;
		this.visited = visited;
		this.deals = deals;
		this.amount = amount;
		this.status = status;
		this.sellerId = sellerId;
		this.sellerName = sellerName;
	}
	
	public SaleDTO(Sale entity) {
		this.id = entity.getId();
		this.date = entity.getDate();
		this.visited = entity.getVisited();
		this.deals = entity.getDeals();
		this.amount = entity.getAmount();
		this.status = entity.getStatus().toString();
		this.sellerId = entity.getSeller().getId();
		this.sellerName = entity.getSeller().getName();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Integer getVisited() {
		return visited;
	}

	public void setVisited(Integer visited) {
		this.visited = visited;
	}

	public Integer getDeals() {
		return deals;
	}

	public void setDeals(Integer deals) {
		this.deals = deals;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getSellerId() {
		return sellerId;
	}

	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}

	public String getSellerName() {
		return sellerName;
	}

	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}
}
