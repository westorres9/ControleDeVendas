package com.fsense.vendas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fsense.vendas.dto.SaleSuccessDTO;
import com.fsense.vendas.dto.SaleSumBySellerDTO;
import com.fsense.vendas.dto.SaleSumByTeamDTO;
import com.fsense.vendas.entities.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
	
	@Query("SELECT new com.fsense.vendas.dto.SaleSumBySellerDTO(obj.seller, SUM(obj.amount)) "
			+ "FROM Sale as obj GROUP BY obj.seller")
	List<SaleSumBySellerDTO> amountGroupedBySeller();
	
	@Query("SELECT new com.fsense.vendas.dto.SaleSuccessDTO(obj.seller, SUM(obj.visited), SUM(obj.deals)) "
			+ "FROM Sale as obj GROUP BY obj.seller")
	List<SaleSuccessDTO> successGroupedBySeller();
	
	@Query("SELECT new com.fsense.vendas.dto.SaleSumByTeamDTO(u.team, SUM(obj.amount)) "
			+ "FROM Sale as obj "
			+ "INNER JOIN User as u "
			+ "ON obj.seller.id = u.id "
			+ "INNER JOIN Team as t "
			+ "ON u.team.id = t.id "
			+ "GROUP BY u.team")
	List<SaleSumByTeamDTO> amountGroupedByTeam();
}
