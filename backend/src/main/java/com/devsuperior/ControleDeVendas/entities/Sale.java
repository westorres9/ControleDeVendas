package com.devsuperior.ControleDeVendas.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
@Entity
@Table(name = "tb_sale")
public class Sale implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private LocalDate date;
	private SaleStatus status;
	private Integer calls;
	
	@OneToMany(mappedBy = "id.sale")
	private Set<SaleItem> items = new HashSet<>();
	
	@ManyToOne
    @JoinColumn(name = "seller_id")
	private User seller;
	
	@ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToOne(mappedBy = "sale", cascade = CascadeType.ALL)
    private Payment payment;

	public Sale() {
	}

	public Sale(Long id, LocalDate date, SaleStatus status,Integer calls, User seller, Client client, Payment payment) {
		this.id = id;
		this.date = date;
		this.status = status;
		this.calls = calls;
		this.seller = seller;
		this.client = client;
		this.payment = payment;
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
	
	public Integer getCalls() {
		return calls;
	}

	public void setCalls(Integer calls) {
		this.calls = calls;
	}

	public void setStatus(SaleStatus status) {
		this.status = status;
	}

	public User getSeller() {
		return seller;
	}

	public void setSeller(User seller) {
		this.seller = seller;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public Set<SaleItem> getItems() {
		return items;
	}
	
	public Double getTotal() {
        double total = 0;
        for (SaleItem item : items)  {
            total += (item.getPrice() * item.getQuantity());
        }
        return total;
    }
	
	 public List<Product> getProducts() {
	        return items.stream().map(x -> x.getProduct()).toList();
	  }

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Sale other = (Sale) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
