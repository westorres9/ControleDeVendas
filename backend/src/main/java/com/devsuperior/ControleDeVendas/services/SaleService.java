package com.devsuperior.ControleDeVendas.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.dto.SaleItemDTO;
import com.devsuperior.ControleDeVendas.dto.SaleTaxSuccessDTO;
import com.devsuperior.ControleDeVendas.dto.SumBySellerDTO;
import com.devsuperior.ControleDeVendas.dto.SumByTeamDTO;
import com.devsuperior.ControleDeVendas.entities.Payment;
import com.devsuperior.ControleDeVendas.entities.Sale;
import com.devsuperior.ControleDeVendas.entities.SaleItem;
import com.devsuperior.ControleDeVendas.entities.SaleStatus;
import com.devsuperior.ControleDeVendas.entities.User;
import com.devsuperior.ControleDeVendas.repositories.PaymentRepository;
import com.devsuperior.ControleDeVendas.repositories.ProductRepository;
import com.devsuperior.ControleDeVendas.repositories.SaleRepository;
import com.devsuperior.ControleDeVendas.repositories.TeamRepository;
import com.devsuperior.ControleDeVendas.repositories.UserRepository;
import com.devsuperior.ControleDeVendas.services.exceptions.DatabaseException;
import com.devsuperior.ControleDeVendas.services.exceptions.ResourceNotFoundException;
import com.devsuperior.ControleDeVendas.services.exceptions.UnauthorizedException;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository saleRepository;
	
	@Autowired
	private PaymentRepository paymentRepository;
    
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private TeamRepository teamRepository;
	
	@Autowired
	private AuthService authService;
	
	@Transactional(readOnly = true)
    public Page<SaleDTO> findAllSales(String name,String minDate, String  maxDate, Pageable pageable) {
    	User user = authService.authenticated();
    	LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		LocalDate min = minDate.equals("") ? today.minusDays(365) : LocalDate.parse(minDate);
		LocalDate max = maxDate.equals("") ? today : LocalDate.parse(maxDate);
    	if(user.hasRole("ROLE_SELLER")) {
    		Page<Sale> page = saleRepository.findBySeller(user.getId(),min, max,pageable);
    		return page.map(x -> new SaleDTO(x));
    	}
    	else if(user.hasRole("ROLE_MANAGER")) {
    		Page<Sale> page = saleRepository.findByManager(user.getId(),name, min, max,pageable);
    		return page.map(x -> new SaleDTO(x));
    	}
    	else if(user.hasRole("ROLE_ADMIN")) {
    		Page<Sale> page = saleRepository.findAll(name, min, max,pageable);
            return page.map(x -> new SaleDTO(x));
    	}
    	else {
    		throw new UnauthorizedException("access denied");
    	}
        
    }

    @Transactional(readOnly = true)
    public SaleDTO findById(Long id) {
        Optional<Sale> obj = saleRepository.findById(id);
        Sale entity = obj.orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        return new SaleDTO(entity, entity.getItems());
    }

    @Transactional
    public SaleDTO insert(SaleDTO dto) {
    	User user = authService.authenticated();
    	if(user.hasRole("ROLE_CLIENT")) {
    		Sale entity = new Sale();
            entity.setDate(LocalDate.now());
            entity.getItems().clear();
            for(SaleItemDTO saleItemDto : dto.getItems()) {
            	SaleItem saleItem  = new SaleItem();
            	saleItem.setProduct(productRepository.getOne(saleItemDto.getProductId()));
            	saleItem.setQuantity(saleItemDto.getQuantity());
            	saleItem.setPrice(saleItemDto.getPrice());
            	saleItemDto.getSubTotal();
            	entity.getItems().add(saleItem);
            }
            entity.setStatus(SaleStatus.PENDING);
            entity.setClient(userRepository.getOne(user.getId()));
            entity = saleRepository.save(entity);
            return new SaleDTO(entity);
    	}
    	else {
    		throw new UnauthorizedException("Only client insert a new sale");
     	}
        
    }

    @Transactional
    public SaleDTO setFinishSale(Long id, SaleDTO dto) {
    	User user = authService.authenticated();
    	if(user.hasRole("ROLE_SELLER")) {
    		try {
    			Sale entity = saleRepository.getOne(id);
                Payment payment = new Payment();
                payment.setMoment(LocalDate.now());
                payment.setSale(entity);
                if(paymentRepository.existsById(id) && entity.getStatus() != SaleStatus.CANCELED) {
                	throw new DatabaseException("Payment already exists associated with this sale");
                }
                else {
                	payment = paymentRepository.save(payment);
                    entity.setStatus(SaleStatus.FINISH);
                    entity.setSeller(user);
                    entity.setPayment(payment);
                    saleRepository.save(entity);
                    return new SaleDTO(entity);
                }
                
            }
            catch (EntityNotFoundException e) {
                throw new ResourceNotFoundException("Id not found " + id);
            }
    		catch (EntityExistsException e) {
                throw new DatabaseException("A different object with the same identifier value was already associed whit sale");
            }
    		catch (DataIntegrityViolationException e) {
                throw new DatabaseException("A different object with the same identifier value was already associed whit sale");
            }
    	}
    	else {
    		throw new UnauthorizedException("Only a seller set Finish a sale");
    	}
    }
    
    @Transactional
    public SaleDTO setCanceledSale(Long id, SaleDTO dto) {
    	User user = authService.authenticated();
    	if(user.hasRole("ROLE_SELLER")) {
    		try {
                Sale entity = saleRepository.getOne(id);
                entity.setStatus(SaleStatus.CANCELED);
                Payment payment = paymentRepository.findBySale(entity);
                if(payment  == null) {
                	throw new DatabaseException("Sale already is deleted");
                }
                else {
                	paymentRepository.delete(payment);
                    entity.setPayment(null);
                    entity = saleRepository.save(entity);
                    return new SaleDTO(entity);
                } 
            }
            catch (EntityNotFoundException e) {
                throw new ResourceNotFoundException("Id not found " + id);
            }
    	}
    	else {
    		throw new UnauthorizedException("Only a seller set Canceled a sale");
    	}
    }

    public void delete(Long id) {
        try {
        	saleRepository.deleteById(id);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }
    
    @Transactional(readOnly = true)
    public List<SaleTaxSuccessDTO> taxSuccessGroupedBySeller() {
    	User user = authService.authenticated();
    	return saleRepository.taxSuccessBySeller();
    }
    
    @Transactional(readOnly = true)
    public List<SumBySellerDTO> sumBySeller() {
    	User user = authService.authenticated();
    	return saleRepository.sumBySeller();
    }
    
    @Transactional(readOnly = true)
    public List<SumByTeamDTO> sumByTeam() {
    	User user = authService.authenticated();
    	return saleRepository.sumByTeam();
    }
}
