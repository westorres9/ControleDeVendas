package com.devsuperior.ControleDeVendas.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Sale;


@Repository
public interface SaleRepository extends JpaRepository<Sale, Long>{
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_sale "
			+ "INNER JOIN tb_user "
			+ "ON tb_user.id = tb_sale.seller_id "
			+ "WHERE tb_sale.seller_id = :id "
			+ "AND tb_sale.date BETWEEN :minDate AND :maxDate order by tb_sale.date ASC")
	Page<Sale> findBySeller(Long id, LocalDate minDate,LocalDate maxDate,Pageable pageable);
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_sale "
			+ "INNER JOIN tb_user "
			+ "ON tb_user.id = tb_sale.seller_id "
			+ "WHERE tb_sale.seller_id = :id ")
	List<Sale> findSalesBySeller(Long id);
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_sale "
			+ "INNER JOIN tb_user "
			+ "ON tb_user.id = tb_sale.seller_id "
			+ "INNER JOIN tb_team_manager "
			+ "ON tb_team_manager.team_id = tb_user.team_id "
			+ "WHERE tb_team_manager.manager_id = :id "
			+ "AND LOWER(tb_user.name) LIKE LOWER(CONCAT('%',:name ,'%')) "
			+ "AND tb_sale.date BETWEEN :minDate AND :maxDate order by tb_sale.date ASC")
	Page<Sale> findByManager(Long id,String name, LocalDate minDate,LocalDate maxDate,Pageable pageable);
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_sale "
			+ "INNER JOIN tb_user "
			+ "ON tb_user.id = tb_sale.seller_id "
			+ "WHERE LOWER(tb_user.name) LIKE LOWER(CONCAT('%',:name ,'%')) "
			+ "AND tb_sale.date BETWEEN :minDate AND :maxDate order by tb_sale.date ASC")
	Page<Sale> findAll(String name, LocalDate minDate,LocalDate maxDate,Pageable pageable);
	
}
