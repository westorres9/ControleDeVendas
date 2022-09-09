package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Sale;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;
@Repository
public interface SaleRepository extends JpaRepository<Sale, Long>{

Page<Sale> findBySeller (User seller, Pageable pageable);
    
    Page<Sale> findByTeam (Team team, Pageable pageable);
}
