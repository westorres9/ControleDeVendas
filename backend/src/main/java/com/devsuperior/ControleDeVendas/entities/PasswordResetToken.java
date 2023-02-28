package com.devsuperior.ControleDeVendas.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_password_reset_token")
public class PasswordResetToken implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private static final int EXPIRATION = 60 * 15;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true)
	private String token;
	private Long userId;
	private Date expiryDate;
	
	public PasswordResetToken() {
	}

	public PasswordResetToken(String token, Long userId) {
		this.token = token;
		this.userId = userId;
		this.expiryDate = Date.from(Instant.now().plusSeconds(EXPIRATION));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = Date.from(Instant.now().plusSeconds(EXPIRATION));
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
		PasswordResetToken other = (PasswordResetToken) obj;
		return Objects.equals(id, other.id);
	}	
}
