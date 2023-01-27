package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long>{

}
