package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.PasswordResetToken;
@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long>{
	
	PasswordResetToken findByToken(String token);
}
