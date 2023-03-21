package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.dto.AverageAgeCustomerDTO;
import com.devsuperior.ControleDeVendas.entities.Customer;
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
	
	Customer findByEmail(String email);
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.AverageAgeCustomerDTO( "
			+ "AVG(YEAR(obj.birthDate))) "
			+ "FROM Customer obj")
	AverageAgeCustomerDTO averageAge();
}
