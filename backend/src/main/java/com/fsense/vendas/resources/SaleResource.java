package com.fsense.vendas.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fsense.vendas.dto.SaleDTO;
import com.fsense.vendas.dto.SaleSuccessDTO;
import com.fsense.vendas.dto.SaleSumBySellerDTO;
import com.fsense.vendas.dto.SaleSumByTeamDTO;
import com.fsense.vendas.services.SaleService;

@RestController
@RequestMapping("/sales")
public class SaleResource {
	
	@Autowired
	private SaleService service;
	
	@GetMapping
	public ResponseEntity<Page<SaleDTO>> findAll(Pageable pageable) {
		Page<SaleDTO> page = service.findAllPaged(pageable);
		return ResponseEntity.ok().body(page);
	}
	
	@GetMapping(value = "/sum-by-seller")
	public ResponseEntity<List<SaleSumBySellerDTO>> amountGroupedBySeller() {
		List<SaleSumBySellerDTO> list = service.amountGroupedBySeller();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/sum-by-team")
	public ResponseEntity<List<SaleSumByTeamDTO>> amountGroupedByTeam() {
		List<SaleSumByTeamDTO> list = service.amountGroupedByTeam();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/success-by-seller")
	public ResponseEntity<List<SaleSuccessDTO>> successGroupedBySeller() {
		List<SaleSuccessDTO> list = service.successGroupedBySeller();
		return ResponseEntity.ok().body(list);
	}
}
