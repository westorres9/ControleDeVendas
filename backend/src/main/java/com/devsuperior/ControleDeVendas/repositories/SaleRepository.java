package com.devsuperior.ControleDeVendas.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.dto.SaleSumTotalDTO;
import com.devsuperior.ControleDeVendas.dto.SaleTaxSuccessDTO;
import com.devsuperior.ControleDeVendas.dto.SumBySellerDTO;
import com.devsuperior.ControleDeVendas.dto.SumByTeamDTO;
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
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleTaxSuccessDTO(obj.seller, COUNT(obj), SUM(obj.calls)) "
			+ "FROM Sale as obj GROUP BY obj.seller")
	List<SaleTaxSuccessDTO> taxSuccessBySeller();
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SumBySellerDTO( "
			+ "obj.seller, SUM(saleItems.price * saleItems.quantity)) "
			+ "FROM Sale as obj "
			+ "JOIN obj.items as saleItems "
			+ "WHERE saleItems.id.sale.id = obj.id "
			+ "GROUP BY obj.seller")
	List<SumBySellerDTO> sumBySeller();
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SumByTeamDTO( "
			+ "team.id, user.team, SUM(saleItems.price * saleItems.quantity)) "
			+ "FROM Sale as obj "
			+ "JOIN obj.items as saleItems "
			+ "ON saleItems.id.sale.id = obj.id "
			+ "JOIN User as user "
			+ "ON user.id = obj.seller.id "
			+ "JOIN Team as team "
			+ "ON user.team.id = team.id "
			+ "GROUP BY team.id, user.team.id ")
	List<SumByTeamDTO> sumByTeam();
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumTotalDTO(SUM(obj.calls), "
			+ "COUNT(obj), "
			+ "SUM(saleItems.price * saleItems.quantity)) "
			+ "FROM Sale as obj "
			+ "JOIN obj.items as saleItems "
			+ "ON saleItems.id.sale.id = obj.id "
			+ "WHERE obj.date BETWEEN :minDate AND :maxDate")
	SaleSumTotalDTO saleSumTotalForAdmin(LocalDate minDate, LocalDate maxDate);
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumTotalDTO(SUM(obj.calls), "
			+ "COUNT(obj), "
			+ "SUM(saleItems.price * saleItems.quantity)) "
			+ "FROM Sale as obj "
			+ "JOIN obj.items as saleItems "
			+ "ON saleItems.id.sale.id = obj.id "
			+ "WHERE obj.seller.id = :id "
			+ "AND obj.date BETWEEN :minDate AND :maxDate")
	SaleSumTotalDTO saleSumTotalForSeller(Long id, LocalDate minDate, LocalDate maxDate);
	
	@Query("SELECT new com.devsuperior.ControleDeVendas.dto.SaleSumTotalDTO(SUM(obj.calls), "
			+ "COUNT(obj), "
			+ "SUM(saleItems.price * saleItems.quantity)) "
			+ "FROM Sale as obj "
			+ "JOIN obj.items as saleItems "
			+ "ON saleItems.id.sale.id = obj.id "
			+ "JOIN obj.seller as seller "
			+ "JOIN seller.team as sellerTeam "
			+ "JOIN sellerTeam.managers as sellerManagers "
			+ "WHERE sellerManagers.id = :id "
			+ "AND obj.date BETWEEN :minDate AND :maxDate")
	SaleSumTotalDTO saleSumTotalForManager(Long id, LocalDate minDate, LocalDate maxDate);
	
}
