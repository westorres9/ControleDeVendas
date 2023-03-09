package com.devsuperior.ControleDeVendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.Payment;
import com.devsuperior.ControleDeVendas.entities.Sale;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{
	
	Payment findBySale(Sale sale);
}
