package com.devsuperior.ControleDeVendas.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.devsuperior.ControleDeVendas.dto.ManagerToCsv;
import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.dto.SellerToCsv;
import com.devsuperior.ControleDeVendas.entities.RoleType;
import com.devsuperior.ControleDeVendas.entities.Team;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.RoleRepository;
import com.devsuperior.ControleDeVendas.repositories.TeamRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.enums.CSVReaderNullFieldIndicator;

@Service
public class UploadService {

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	private static String standardPassword = "123456";

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private RoleRepository roleRepository;

	public List<SaleDTO> uploadSales(MultipartFile file) throws IOException {
		InputStream archive = file.getInputStream();
		try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(archive))) {
			CsvToBean<SaleDTO> csvToBean = new CsvToBeanBuilder<SaleDTO>(fileReader).withType(SaleDTO.class)
					.withIgnoreLeadingWhiteSpace(true).withFieldAsNull(CSVReaderNullFieldIndicator.BOTH).build();
			List<SaleDTO> sales = csvToBean.parse();
			return sales;
		} catch (Exception e) {
			throw new IOException("error " + e.getMessage());
		}
	}
	
	public List<SellerToCsv> uploadSellers(MultipartFile file) throws IOException {
		InputStream archive = file.getInputStream();
		try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(archive))) {
			CsvToBean<SellerToCsv> csvToBean = new CsvToBeanBuilder<SellerToCsv>(fileReader)
					.withType(SellerToCsv.class).withIgnoreLeadingWhiteSpace(true)
					.withFieldAsNull(CSVReaderNullFieldIndicator.BOTH).build();
			List<SellerToCsv> sellers = csvToBean.parse();
			for (SellerToCsv dto : sellers) {
				if (userRepository.findByEmail(dto.getEmail()) == null) {
					User entity = new User();
					entity.setName(dto.getName());
					entity.setEmail(dto.getEmail());
					entity.setPassword(passwordEncoder.encode(standardPassword));
					entity.setImgUrl("https://user-images.githubusercontent.com/91570669/227945652-111c999f-a07c-4b1e-9eb8-24c83e90d2a4.png");
					entity.getRoles().clear();
					entity.getRoles().add(roleRepository.findByAuthority(RoleType.SELLER));
					Team team = teamRepository.findByName(dto.getTeamName());
					if(team == null) {
						
						team = new Team();
						team.setName(dto.getTeamName());
						team.setImgUrl("https://user-images.githubusercontent.com/91570669/227974974-0aa117cf-b9d2-4787-a5dc-36b539d538c0.png");
						team = teamRepository.save(team);
						entity.setTeam(team);
						entity = userRepository.save(entity);
					}
					else {
						entity.setTeam(team);
						entity = userRepository.save(entity);
					}
					
				} else {
					User entity = userRepository.findByEmail(dto.getEmail());
					entity.setName(dto.getName());
					entity.setImgUrl("https://user-images.githubusercontent.com/91570669/227945652-111c999f-a07c-4b1e-9eb8-24c83e90d2a4.png");
					Team team = teamRepository.findByName(dto.getTeamName());
					if(team == null) {
						
						team = new Team();
						team.setName(dto.getTeamName());
						team.setImgUrl("https://user-images.githubusercontent.com/91570669/227974974-0aa117cf-b9d2-4787-a5dc-36b539d538c0.png");
						team = teamRepository.save(team);
						entity.setTeam(team);
						entity = userRepository.save(entity);
					}
					else {
						entity.setTeam(team);
						entity = userRepository.save(entity);
					}
				}
			}
			return sellers;
		} catch (Exception e) {
			throw new IOException("error " + e.getMessage());
		}
	}
	
	public List<ManagerToCsv> uploadManagers(MultipartFile file) throws IOException {
		InputStream archive = file.getInputStream();
		try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(archive))) {
			CsvToBean<ManagerToCsv> csvToBean = new CsvToBeanBuilder<ManagerToCsv>(fileReader)
					.withType(ManagerToCsv.class).withIgnoreLeadingWhiteSpace(true)
					.withFieldAsNull(CSVReaderNullFieldIndicator.BOTH).build();
			List<ManagerToCsv> managers = csvToBean.parse();
			for (ManagerToCsv dto : managers) {
				if (userRepository.findByEmail(dto.getEmail()) == null) {
					User entity = new User();
					entity.setName(dto.getName());
					entity.setEmail(dto.getEmail());
					entity.setPassword(passwordEncoder.encode(standardPassword));
					entity.setImgUrl("https://user-images.githubusercontent.com/91570669/227945652-111c999f-a07c-4b1e-9eb8-24c83e90d2a4.png");
					entity.getRoles().clear();
					entity.getRoles().add(roleRepository.findByAuthority(RoleType.MANAGER));
					entity = userRepository.save(entity);
				} else {
					User entity = userRepository.findByEmail(dto.getEmail());
					entity.setName(dto.getName());
					entity.setEmail(dto.getEmail());
					entity.setImgUrl("https://user-images.githubusercontent.com/91570669/227945652-111c999f-a07c-4b1e-9eb8-24c83e90d2a4.png");
					entity = userRepository.save(entity);
					}
			}
			return managers;
		} catch (Exception e) {
			throw new IOException("error " + e.getMessage());
		}
	}
}
