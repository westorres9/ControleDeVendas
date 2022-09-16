package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;
import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Positive;

import com.devsuperior.ControleDeVendas.entities.Sale;

public class SaleDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	@NotBlank(message = "campo requerido")
	@PastOrPresent(message = "data nao pode ser futura")
	private LocalDate date;
	@NotBlank(message = "campo requerido")
	private Integer deals;
	@NotBlank(message = "campo requerido")
	private Integer visited;
	@NotBlank(message = "campo requerido")
	@Positive(message = "Preço deve ser positivo")
	private Double amount;
	private Long sellerId;
	private String sellerName;
	private Long teamId;
	private Long managerId;
	
	public SaleDTO() {
	}
	
	public SaleDTO(Long id, LocalDate date, Integer deals, Integer visited, Double amount, Long sellerId, String sellerName, Long teamId, Long managerId) {
		this.id = id;
		this.date = date;
		this.deals = deals;
		this.visited = visited;
		this.amount = amount;
		this.sellerId = sellerId;
		this.sellerName = sellerName;
		this.teamId = teamId;
		this.managerId = managerId;
	}
	
	public SaleDTO(Sale entity) {
		this.id = entity.getId();
		this.date = entity.getDate();
		this.deals = entity.getDeals();
		this.visited = entity.getVisited();
		this.amount = entity.getAmount();
		this.sellerId = entity.getSeller().getId();
		this.sellerName = entity.getSeller().getName();
		this.teamId = entity.getTeam().getId();
		this.managerId = entity.getManager().getId();
		
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

	public Integer getDeals() {
		return deals;
	}

	public void setDeals(Integer deals) {
		this.deals = deals;
	}

	public Integer getVisited() {
		return visited;
	}

	public void setVisited(Integer visited) {
		this.visited = visited;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
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

	public Long getTeamId() {
		return teamId;
	}

	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}

	public Long getManagerId() {
		return managerId;
	}

	public void setManagerId(Long managerId) {
		this.managerId = managerId;
	}
	
	
	
	
	
	

}
