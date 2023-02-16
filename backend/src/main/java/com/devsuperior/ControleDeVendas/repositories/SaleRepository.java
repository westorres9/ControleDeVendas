package com.devsuperior.ControleDeVendas.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.dto.SaleSuccessDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumBySellerDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumByTeamDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumTotalByMonthDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumTotalDTO;
import com.devsuperior.ControleDeVendas.dto.SellersByTeamDTO;
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
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumBySellerDTO(obj.seller, SUM(obj.amount)) "
			+ "FROM Sale as obj GROUP BY obj.seller")
	List<SaleSumBySellerDTO> amountGroupedBySeller();

	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSuccessDTO(obj.seller, SUM(obj.visited), SUM(obj.deals)) "
			+ "FROM Sale as obj GROUP BY obj.seller")
	List<SaleSuccessDTO> successGroupedBySeller();

	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumByTeamDTO( u.team.id, u.team, SUM(obj.amount)) "
			+ "FROM Sale as obj "
			+ "INNER JOIN User as u "
			+ "ON obj.seller.id = u.id "
			+ "INNER JOIN Team as t "
			+ "ON u.team.id = t.id "
			+ "GROUP BY u.team")
	List<SaleSumByTeamDTO> amountGroupedByTeam();
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SellersByTeamDTO(user.name, SUM(obj.visited),SUM(obj.deals),SUM(obj.amount)) "
			+ "FROM Sale as obj "
			+ "INNER JOIN User as user "
			+ "ON obj.seller.id = user.id "
			+ "INNER JOIN Team as team "
			+ "ON user.team.id = team.id "
			+ "WHERE team.id = :teamId "
			+ "GROUP BY user.name")
	List<SellersByTeamDTO> sellersByTeam(Long teamId);
	
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumTotalDTO(SUM(obj.visited), "
			+ "SUM(obj.deals), "
			+ "SUM(obj.amount)) "
			+ "FROM Sale as obj "
			+ "WHERE obj.date BETWEEN :minDate AND :maxDate")
	SaleSumTotalDTO saleSumTotalOfDeals(LocalDate minDate ,LocalDate maxDate);
	
	 @Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumTotalDTO(SUM(obj.visited), "
	            + "SUM(obj.deals), "
	            + "SUM(obj.amount)) "
	            + "FROM Sale as obj " +
	            " JOIN obj.seller as seller " +
	            " JOIN seller.team as sellerTeam " +
	            " JOIN sellerTeam.managers as sellerManagers "
	            + "WHERE sellerManagers.id = :id "
				+ "AND obj.date BETWEEN :minDate AND :maxDate")
	 SaleSumTotalDTO saleSumTotalByManager(Long id, LocalDate minDate ,LocalDate maxDate);
	 
	 
	 @Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumTotalDTO(SUM(obj.visited), "
				+ "SUM(obj.deals), "
				+ "SUM(obj.amount)) "
				+ "FROM Sale as obj "
				+ "WHERE obj.seller.id = :id "
				+ "AND obj.date BETWEEN :minDate AND :maxDate")
	 SaleSumTotalDTO saleSumTotalBySeller(Long id, LocalDate minDate ,LocalDate maxDate);
	 
	 @Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumTotalByMonthDTO("
				+ "TO_CHAR(obj.date, 'Month') as month, "
				+ "EXTRACT(YEAR FROM obj.date) AS year, "
	 			+ "SUM(obj.visited), "
				+ "SUM(obj.deals), "
				+ "SUM(obj.amount)) "
				+ "FROM Sale as obj "
				+ "WHERE obj.date BETWEEN :minDate AND :maxDate "
				+ "GROUP BY month, year "
				+ "ORDER BY month, year ")
	 List<SaleSumTotalByMonthDTO> saleSumTotalByMonth(LocalDate minDate ,LocalDate maxDate);
}
