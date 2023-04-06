package com.devsuperior.ControleDeVendas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long>{
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_team "
			+ "INNER JOIN tb_team_manager "
			+ "ON tb_team_manager.team_id = tb_team.id "
			+ "WHERE tb_team_manager.manager_id = :id")
	List<Team> findByManagerId(Long id);
	
	Team findByName(String name);
	
	
	
}
