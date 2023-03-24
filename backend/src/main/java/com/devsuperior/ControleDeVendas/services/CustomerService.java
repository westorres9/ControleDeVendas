package com.devsuperior.ControleDeVendas.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.AverageAgeCustomerDTO;
import com.devsuperior.ControleDeVendas.dto.AverageMonthlyIncomeCustomerDTO;
import com.devsuperior.ControleDeVendas.dto.CustomerDTO;
import com.devsuperior.ControleDeVendas.dto.CustomersWithMostPurchasesDTO;
import com.devsuperior.ControleDeVendas.entities.Customer;
import com.devsuperior.ControleDeVendas.repositories.CustomerRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Transactional(readOnly = true)
	public List<CustomerDTO> findAll() {
		List<Customer> list = customerRepository.findAll();
		return list.stream().map(x -> new CustomerDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public CustomerDTO findById(Long id) {
		Optional<Customer> opt = customerRepository.findById(id);
		Customer entity = opt.orElseThrow(() -> new ResourceNotFoundException("Id not found " + id));
		return new CustomerDTO(entity);
	}
	
	@Transactional
	public CustomerDTO insert(CustomerDTO dto) {
		Customer entity = new Customer();
		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setBirthDate(dto.getBirthDate());
		entity.setMonthlyIncome(dto.getMonthlyIncome());
		entity = customerRepository.save(entity);
		return new CustomerDTO(entity);
	}
	
	@Transactional
	public CustomerDTO update(Long id, CustomerDTO dto) {
		try {
			Customer entity = customerRepository.getOne(id);
			entity.setName(dto.getName());
			entity.setEmail(dto.getEmail());
			entity.setBirthDate(dto.getBirthDate());
			entity.setMonthlyIncome(dto.getMonthlyIncome());
			entity = customerRepository.save(entity);
			return new CustomerDTO(entity);
		}
		catch(EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
	}
	
	public void delete(Long id) {
        try {
            customerRepository.deleteById(id);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }
	
	@Transactional(readOnly = true)
	public AverageAgeCustomerDTO averageAgeCustomer() {
		AverageAgeCustomerDTO averageAge = customerRepository.averageAge();
		return averageAge;	
	}
	
	@Transactional(readOnly = true)
	public AverageMonthlyIncomeCustomerDTO averageMonthlyIncome() {
		AverageMonthlyIncomeCustomerDTO averageMontlyIncome = customerRepository.averageMonthlyIncome();
		return averageMontlyIncome;
	}
	
	@Transactional(readOnly = true)
	public List<CustomersWithMostPurchasesDTO> customersMostPurchases(String minDate, String maxDate) {
		LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		LocalDate min = minDate.equals("") ? today.minusDays(365) : LocalDate.parse(minDate);
		LocalDate max = maxDate.equals("") ? today : LocalDate.parse(maxDate);
		List<CustomersWithMostPurchasesDTO> listCustomerMostPurchase = customerRepository.customerMostPurchase(min, max);
		List<CustomersWithMostPurchasesDTO> top10 = new ArrayList<>();
		try {
			top10 = listCustomerMostPurchase.subList(0, 10);
		}
		catch(IndexOutOfBoundsException e) {
			return listCustomerMostPurchase;
		}
		return top10;
	}
	
}
