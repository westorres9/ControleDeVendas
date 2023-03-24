package com.devsuperior.ControleDeVendas.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.dto.AverageAgeCustomerDTO;
import com.devsuperior.ControleDeVendas.dto.AverageMonthlyIncomeCustomerDTO;
import com.devsuperior.ControleDeVendas.dto.CustomersWithMostPurchasesDTO;
import com.devsuperior.ControleDeVendas.entities.Customer;
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
	
	Customer findByEmail(String email);
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.AverageAgeCustomerDTO( "
			+ "AVG(YEAR(obj.birthDate))) "
			+ "FROM Customer obj")
	AverageAgeCustomerDTO averageAge();
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.AverageMonthlyIncomeCustomerDTO( "
			+ "AVG(obj.monthlyIncome)) "
			+ "FROM Customer obj")
	AverageMonthlyIncomeCustomerDTO averageMonthlyIncome();
	
	@Query("SELECT DISTINCT new com.devsuperior.ControleDeVendas.dto.CustomersWithMostPurchasesDTO(customer.name, SUM(saleItem.quantity * saleItem.price) as purchases) "
			+ "FROM Customer customer "
			+ "JOIN Sale sale "
			+ "ON sale.customer.id = customer.id "
			+ "JOIN SaleItem as saleItem "
			+ "ON saleItem.id.sale.id = sale.id "
			+ "WHERE sale.date BETWEEN :minDate AND :maxDate "
			+ "GROUP BY customer.name "
			+ "ORDER BY purchases DESC")
	List<CustomersWithMostPurchasesDTO> customerMostPurchase(LocalDate minDate,LocalDate maxDate);
}
