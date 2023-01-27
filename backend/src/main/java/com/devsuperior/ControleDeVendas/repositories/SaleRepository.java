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
	

	
	
	
}
