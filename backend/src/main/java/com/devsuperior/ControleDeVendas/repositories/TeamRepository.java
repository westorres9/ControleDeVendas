package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long>{
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_team "
			+ "INNER JOIN tb_team_manager "
			+ "ON tb_team_manager.team_id = tb_team.id "
			+ "WHERE tb_team_manager.manager_id = :id")
	Page<Team> findByManage(Long id, Pageable pageable);
}
