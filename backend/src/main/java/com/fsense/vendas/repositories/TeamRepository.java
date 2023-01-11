package com.fsense.vendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fsense.vendas.entities.Team;
@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

}
