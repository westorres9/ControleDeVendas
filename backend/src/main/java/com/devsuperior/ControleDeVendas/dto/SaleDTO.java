package com.devsuperior.ControleDeVendas.dto;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotEmpty;

import com.devsuperior.ControleDeVendas.entities.Sale;
import com.devsuperior.ControleDeVendas.entities.SaleItem;
import com.devsuperior.ControleDeVendas.entities.SaleStatus;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;
import com.opencsv.bean.CsvIgnore;

public class SaleDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@CsvBindByName(column = "Id", required = true)
	private Long id;
	
	@CsvBindByName(column = "Data", required = true)
	@CsvDate("yyyy-MM-dd")
	private LocalDate date;
	
	@CsvBindByName(column = "Status", required = true)
	private SaleStatus status;
	
	@CsvBindByName(column = "Chamadas", required = true)
	private Integer calls;
	
	@CsvBindByName(column = "Cliente", required = true)
	private CustomerDTO customer;
	
	@CsvBindByName(column = "Vendedor", required = true)
	private SellerDTO seller;
	
	@CsvBindByName(column = "Total", required = true)
	private Double total;
	
	@CsvIgnore
	private PaymentDTO payment;
	
	@CsvIgnore
	@NotEmpty(message = "Deve conter pelo menos um item de pedido na venda")
	private List<SaleItemDTO> items = new ArrayList<>();
	
	public SaleDTO() {
	}

	public SaleDTO(Long id, LocalDate date, SaleStatus status,Integer calls, CustomerDTO customer,SellerDTO seller, PaymentDTO payment ,Double total) {
		this.id = id;
		this.date = date;
		this.status = status;
		this.calls = calls;
		this.customer = customer;
		this.seller = seller;
		this.payment = payment;
		this.total = total;
	}

	public SaleDTO(Sale entity) {
		this.id = entity.getId();
		this.date = entity.getDate();
		this.status = entity.getStatus();
		this.calls = entity.getCalls();
		this.customer = new CustomerDTO(entity.getCustomer());
		this.seller = (entity.getSeller() == null) ? null : new SellerDTO(entity.getSeller());
		this.payment = (entity.getPayment() == null) ? null : new PaymentDTO(entity.getPayment());
		this.total = entity.getTotal();
	}
	
	public SaleDTO(Sale entity, Set<SaleItem> items) {
		this(entity);
		items.forEach(item -> this.items.add(new SaleItemDTO(item)));
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

	public SaleStatus getStatus() {
		return status;
	}

	public void setStatus(SaleStatus status) {
		this.status = status;
	}
	
	public Integer getCalls() {
		return calls;
	}

	public void setCalls(Integer calls) {
		this.calls = calls;
	}

	public CustomerDTO getCustomer() {
		return customer;
	}

	public void setCustomer(CustomerDTO customer) {
		this.customer = customer;
	}

	public SellerDTO getSeller() {
		return seller;
	}

	public void setSeller(SellerDTO seller) {
		this.seller = seller;
	}

	public PaymentDTO getPayment() {
		return payment;
	}

	public void setPayment(PaymentDTO payment) {
		this.payment = payment;
	}

	public List<SaleItemDTO> getItems() {
		return items;
	}
	
	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	@Override
	public String toString() {
		return "id=" + id + ", date=" + date + ", status=" + status + ", calls=" + calls + ", client=" + customer
				+ ", payment=" + payment + ", items=" + items;
	}
	
	

}
