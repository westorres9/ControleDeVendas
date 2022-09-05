package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.ControleDeVendas.entities.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>{

	
}
