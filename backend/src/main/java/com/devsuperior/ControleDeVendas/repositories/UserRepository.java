package com.devsuperior.ControleDeVendas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devsuperior.ControleDeVendas.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	User findByEmail(String email);
	
	@Query("SELECT obj FROM User as obj "
			+ "LEFT JOIN FETCH obj.roles " 
			+ "WHERE obj.email = :email")
	User findByEmailWithRoles(@Param("email") String email);
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_user "
			+ "INNER JOIN tb_user_role "
			+ "ON tb_user_role.user_id = tb_user.id "
			+ "WHERE tb_user_role.role_id = 1 "
			+ "AND LOWER(tb_user.name) LIKE LOWER(CONCAT('%',:name ,'%'))")
	List<User> findSellers(String name);
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_user "
			+ "INNER JOIN tb_user_role "
			+ "ON tb_user_role.user_id = tb_user.id "
			+ "WHERE tb_user_role.role_id = 2 "
			+ "AND LOWER(tb_user.name) LIKE LOWER(CONCAT('%',:name ,'%'))")
	List<User> findManagers(String name);
}
