package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

public class SaleSumTotalByMonthDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String month;
	private Integer year;
	public Long visited;
	public Long deals;
	public Double amount;
	
	
	public SaleSumTotalByMonthDTO() {
	}
	
	public SaleSumTotalByMonthDTO(String month, Integer year, Long visited, Long deals, Double amount) {
		this.month = month;
		this.year = year;
		this.visited = visited;
		this.deals = deals;
		this.amount = amount;
	}

	public String getMonth() {
		return month;
	}


	public void setMonth(String month) {
		this.month = month;
	}


	public Integer getYear() {
		return year;
	}


	public void setYear(Integer year) {
		this.year = year;
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
