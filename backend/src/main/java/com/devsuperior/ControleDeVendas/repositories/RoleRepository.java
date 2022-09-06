package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{

}
