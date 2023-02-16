package com.devsuperior.ControleDeVendas.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSuccessDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumBySellerDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumByTeamDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumTotalByMonthDTO;
import com.devsuperior.ControleDeVendas.dto.SaleSumTotalDTO;
import com.devsuperior.ControleDeVendas.dto.SellersByTeamDTO;
import com.devsuperior.ControleDeVendas.services.SaleService;

@RestController
@RequestMapping(value = "/sales")
public class SaleResource {
	
	@Autowired
	private SaleService service;

	@GetMapping
	public ResponseEntity<Page<SaleDTO>> findAllSales(
			@RequestParam(value = "minDate", defaultValue = "")String minDate,
			@RequestParam(value = "maxDate", defaultValue = "")String maxDate,
			@RequestParam(value = "name", defaultValue = "")String name,
			Pageable pageable) {
		Page<SaleDTO> page = service.findAllSales(name, minDate, maxDate, pageable);
		return ResponseEntity.ok().body(page);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<SaleDTO> findById(@PathVariable Long id) {
		SaleDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}

	@PostMapping
	public ResponseEntity<SaleDTO> insert(@RequestBody SaleDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}

	@PutMapping("/{id}")
	public ResponseEntity<SaleDTO> update(@PathVariable Long id, @RequestBody SaleDTO dto) {
		SaleDTO newDto = service.update(id, dto);
		return ResponseEntity.ok().body(newDto);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
	@GetMapping(value = "/sum-by-seller")
	public ResponseEntity<List<SaleSumBySellerDTO>> amountGroupedBySeller() {
		List<SaleSumBySellerDTO> page = service.amountGroupedBySeller();
		return ResponseEntity.ok().body(page);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
	@GetMapping(value = "/success-by-seller")
	public ResponseEntity<List<SaleSuccessDTO>> successGroupedBySeller() {
		List<SaleSuccessDTO> page = service.successGroupedBySeller();
		return ResponseEntity.ok().body(page);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
	@GetMapping(value = "/sum-by-month")
	public ResponseEntity<List<SaleSumTotalByMonthDTO>> saleSumTotalByMonth(
			@RequestParam(value = "minDate", defaultValue = "")String minDate,
			@RequestParam(value = "maxDate", defaultValue = "")String maxDate) {
		List<SaleSumTotalByMonthDTO> list = service.saleSumTotalByMonth(minDate, maxDate);
		return ResponseEntity.ok().body(list);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
	@GetMapping(value = "/sum-by-team")
	public ResponseEntity<List<SaleSumByTeamDTO>> amountGroupedByTeam() {
		List<SaleSumByTeamDTO> page = service.amountGroupedByTeam();
		return ResponseEntity.ok().body(page);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
	@GetMapping(value = "/sum-by-team/{id}")
	public ResponseEntity<List<SellersByTeamDTO>> salesBySeller(@PathVariable Long id) {
		List<SellersByTeamDTO> list = service.salesBySeller(id);
		return ResponseEntity.ok().body(list);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
	@GetMapping(value = "/sale-sum-total")
	public ResponseEntity<SaleSumTotalDTO> saleSumTotalOfDeals(
			@RequestParam(value = "minDate", defaultValue = "")String minDate,
			@RequestParam(value = "maxDate", defaultValue = "")String maxDate
			) {
		SaleSumTotalDTO total = service.saleSumTotalOfDeals(minDate, maxDate);
		return ResponseEntity.ok().body(total);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
	@GetMapping(value = "/by-seller/{id}")
	public ResponseEntity<List<SaleDTO>> saleBySeller(@PathVariable Long id) {
		List<SaleDTO> list = service.findSalesBySeller(id);
		return ResponseEntity.ok().body(list);
	}

}
