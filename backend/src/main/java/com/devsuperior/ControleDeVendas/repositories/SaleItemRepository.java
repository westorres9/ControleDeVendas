package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.SaleItem;
import com.devsuperior.ControleDeVendas.entities.SaleItemPK;
@Repository
public interface SaleItemRepository extends JpaRepository<SaleItem, SaleItemPK>{
}
