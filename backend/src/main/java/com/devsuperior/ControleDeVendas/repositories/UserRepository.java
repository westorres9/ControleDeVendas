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
	List<User> findSellersByName(String name);
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_user "
			+ "INNER JOIN tb_user_role "
			+ "ON tb_user_role.user_id = tb_user.id "
			+ "WHERE tb_user_role.role_id = 1 ")
	List<User> findSellers();
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_user "
			+ "INNER JOIN tb_user_role "
			+ "ON tb_user_role.user_id = tb_user.id "
			+ "WHERE tb_user_role.role_id = 2 ")
	List<User> findManagers();
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_user "
			+ "INNER JOIN tb_user_role "
			+ "ON tb_user_role.user_id = tb_user.id "
			+ "WHERE tb_user_role.role_id = 2 "
			+ "AND LOWER(tb_user.name) LIKE LOWER(CONCAT('%',:name ,'%'))")
	List<User> findManagersByName(String name);
	
	@Query(nativeQuery = true, value = "SELECT * FROM tb_user "
			+ "INNER JOIN tb_team "
			+ "ON tb_team.id = tb_user.team_id "
			+ "INNER JOIN tb_team_manager "
			+ "ON tb_team_manager.team_id = tb_team.id "
			+ "WHERE tb_team_manager.manager_id = :id ")
	List<User> findSellersByTeam(Long id);
}
