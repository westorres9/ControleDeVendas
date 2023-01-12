package com.devsuperior.ControleDeVendas.repositories;

import java.time.LocalDate;
import java.util.List;

import com.devsuperior.ControleDeVendas.dto.SaleSuccessDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumBySellerDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumByTeamDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Sale;
import com.devsuperior.ControleDeVendas.entities.User;


@Repository
public interface SaleRepository extends JpaRepository<Sale, Long>{
	
	Page<Sale> findBySellerAndDateBetween(Pageable pageable, User seller, LocalDate minDate, LocalDate maxDate);
	
	
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
	
	@Query(nativeQuery = true,  value= "SELECT * FROM tb_sale " +
			"WHERE tb-sale.date BETWEEN :min AND :max ORDER BY tb_sale.amount DESC" )
	Page<Sale> findSales(LocalDate min, LocalDate max, Pageable pageable);

	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumBySellerDTO(obj.seller, SUM(obj.amount)) "
			+ "FROM Sale as obj GROUP BY obj.seller")
	List<SaleSumBySellerDTO> amountGroupedBySeller();

	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSuccessDTO(obj.seller, SUM(obj.visited), SUM(obj.deals)) "
			+ "FROM Sale as obj GROUP BY obj.seller")
	List<SaleSuccessDTO> successGroupedBySeller();

	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumByTeamDTO(u.team, SUM(obj.amount)) "
			+ "FROM Sale as obj "
			+ "INNER JOIN User as u "
			+ "ON obj.seller.id = u.id "
			+ "INNER JOIN Team as t "
			+ "ON u.team.id = t.id "
			+ "GROUP BY u.team")
	List<SaleSumByTeamDTO> amountGroupedByTeam();
	
	
	
}
