package com.devsuperior.ControleDeVendas.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.dto.UserDTO;
import com.devsuperior.ControleDeVendas.dto.UserDtoToDownload;
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
	private SellerService sellerService;

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

	public List<UserDtoToDownload> uploadSellers(MultipartFile file) throws IOException {
		InputStream archive = file.getInputStream();
		try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(archive))) {
			CsvToBean<UserDtoToDownload> csvToBean = new CsvToBeanBuilder<UserDtoToDownload>(fileReader)
					.withType(UserDtoToDownload.class).withIgnoreLeadingWhiteSpace(true)
					.withFieldAsNull(CSVReaderNullFieldIndicator.BOTH).build();
			List<UserDtoToDownload> sellers = csvToBean.parse();
			for (UserDtoToDownload dto : sellers) {
				if (userRepository.findByEmail(dto.getEmail()) == null) {
					User entity = new User();
					entity.setName(dto.getName());
					entity.setEmail(dto.getEmail());
					entity.setPassword(passwordEncoder.encode(standardPassword));
					entity.setImgUrl(dto.getImgUrl());
					entity.getRoles().clear();
					entity.getRoles().add(roleRepository.findByAuthority(RoleType.SELLER));
					Team team = teamRepository.getOne(dto.getTeamId());
					entity.setTeam(team);
					entity = userRepository.save(entity);
				} else {
					User entity = userRepository.findByEmail(dto.getEmail());
					entity.setName(dto.getName());
					entity.setImgUrl(dto.getImgUrl());
					Team team = teamRepository.getOne(dto.getTeamId());
					entity.setTeam(team);
					entity = userRepository.save(entity);
				}
			}
			return sellers;
		} catch (Exception e) {
			throw new IOException("error " + e.getMessage());
		}
	}
}
