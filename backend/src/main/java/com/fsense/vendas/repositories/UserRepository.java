package com.fsense.vendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fsense.vendas.entities.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
