package com.devsuperior.ControleDeVendas.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.dto.ProductMostSoldDTO;
import com.devsuperior.ControleDeVendas.entities.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product,Long>{
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.ProductMostSoldDTO(product.name, COUNT(obj.quantity)as quantity) "
			+ "FROM SaleItem obj "
			+ "JOIN Sale sale "
			+ "ON sale.id = obj.id.sale.id "
			+ "JOIN Product product "
			+ "ON product.id =	obj.id.product.id "
			+ "WHERE sale.date BETWEEN :minDate AND :maxDate "
			+ "GROUP BY product.name "
			+ "ORDER BY quantity DESC")
	List<ProductMostSoldDTO> productsMostSold(LocalDate minDate,LocalDate maxDate);
}
