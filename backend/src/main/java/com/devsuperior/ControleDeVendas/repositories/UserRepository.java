package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}