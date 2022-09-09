package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;
@Repository
public interface TeamRepository extends JpaRepository<Team, Long>{
	
	Page<Team> findByManager(User manager, Pageable pageable);
}
