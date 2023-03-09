package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Client;
@Repository
public interface ClientRepository extends JpaRepository<Client, Long>{
	
	Client findByEmail(String email);
}
