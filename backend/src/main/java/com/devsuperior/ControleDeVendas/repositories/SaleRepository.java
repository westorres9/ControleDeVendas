package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Sale;
import com.devsuperior.ControleDeVendas.entities.User;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long>{
	
	Page<Sale> findBySeller(User seller, Pageable pageable);
	
	@Query(nativeQuery = true,value = "SELECT * FROM tb_sale " +
			"INNER JOIN  tb_user " +
			"ON tb_user.id = tb_sale.seller_id " +
			"INNER JOIN tb_team_manager " +
			"ON tb_team_manager.team_id = tb_user.team_id " +
			"WHERE tb_team_manager.manager_id = :id")
	Page<Sale> findByManage(Long id, Pageable pageable);
	
	
	@Query(nativeQuery = true,value = "SELECT * FROM tb_sale " +
			"INNER JOIN tb_user " + 
			"ON tb_user.id = tb_sale.seller_id " +
			"WHERE LOWER(tb_user.name) LIKE LOWER(CONCAT('%',:name ,'%')) ")
	Page<Sale> findBySellerName(String name, Pageable pageable);
}
