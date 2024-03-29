package com.devsuperior.ControleDeVendas.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
@Entity
@Table(name = "tb_user")
public class User implements Serializable, UserDetails {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	
	@Column(unique = true)
	private String email;
	private String password;
	private String imgUrl;
	
	@OneToMany(mappedBy = "seller")
	private List<Sale> saleSeller = new ArrayList<>();
	
	@OneToMany(mappedBy = "customer")
	private List<Sale> saleCustomer = new ArrayList<>();
	
	@ManyToMany(mappedBy = "managers")
	private List<Team> teams = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "team_id")
	private Team team;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "tb_user_role",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	public Set<Role> roles = new HashSet<>();

	public User() {
	}

	public User(Long id, String name, String email, String password,String imgUrl) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.imgUrl = imgUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public Set<Role> getRoles() {
		return roles;
	}
	
	public List<Sale> getSaleSeller() {
		return saleSeller;
	}

	public List<Sale> getSaleCustomer() {
		return saleCustomer;
	}

	public List<Team> getTeams() {
		return teams;
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
		User other = (User) obj;
		return Objects.equals(id, other.id);
	}
	
	 @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }

	    @Override
	    public String getUsername() {
	        return email;
	    }

	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities() {
	        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getAuthority()))
	                .collect(Collectors.toList());
	    }

	    public boolean hasRole(String roleName) {
	        for(Role role : roles) {
	            if(role.getAuthority().equals(roleName)) {
	                return true;
	            }
	        }
	        return false;
	    }
	
	
	

}
