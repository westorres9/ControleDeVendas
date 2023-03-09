package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

}
