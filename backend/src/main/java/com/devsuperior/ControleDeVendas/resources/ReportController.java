package com.devsuperior.ControleDeVendas.resources;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.devsuperior.ControleDeVendas.dto.ManagerToCsv;
import com.devsuperior.ControleDeVendas.dto.PathDTO;
import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.dto.SellerToCsv;
import com.devsuperior.ControleDeVendas.services.CloudinaryUploadImageService;
import com.devsuperior.ControleDeVendas.services.ManagerService;
import com.devsuperior.ControleDeVendas.services.SaleService;
import com.devsuperior.ControleDeVendas.services.SellerService;
import com.devsuperior.ControleDeVendas.services.UploadService;
import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvException;

@RestController
@RequestMapping(value = "/report")
public class ReportController {
	
	@Autowired
	private SaleService saleService;
	
	@Autowired
	private SellerService sellerService;
	
	@Autowired
	private ManagerService managerService;
	
	@Autowired
	private UploadService uploadService;
	
	@Autowired
	private CloudinaryUploadImageService uploadImageService;

	@GetMapping("/download/sales")
	public void exportSalesCSV(HttpServletResponse response) throws Exception {
		String filename = "sales.csv";
		response.setContentType("text/csv");
		response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
		StatefulBeanToCsv<SaleDTO> writer = new StatefulBeanToCsvBuilder<SaleDTO>(response.getWriter())
				.withQuotechar(CSVWriter.NO_QUOTE_CHARACTER).withSeparator(CSVWriter.DEFAULT_SEPARATOR)
				.withOrderedResults(false).build();
		writer.write(saleService.findAllToExport());
	}
	
	@GetMapping("/download/sellers")
	public void exportSellerCSV(HttpServletResponse response) throws Exception {
		String filename = "sellers.csv";
		response.setContentType("text/csv");
		response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
		StatefulBeanToCsv<SellerToCsv> writer = new StatefulBeanToCsvBuilder<SellerToCsv>(response.getWriter())
				.withQuotechar(CSVWriter.NO_QUOTE_CHARACTER).withSeparator(CSVWriter.DEFAULT_SEPARATOR)
				.withOrderedResults(false).build();
		writer.write(sellerService.findAllSellers());
	}
	
	@GetMapping("/download/managers")
	public void exportManagerCSV(HttpServletResponse response) throws Exception {
		String filename = "managers.csv";
		response.setContentType("text/csv");
		response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
		StatefulBeanToCsv<ManagerToCsv> writer = new StatefulBeanToCsvBuilder<ManagerToCsv>(response.getWriter())
				.withQuotechar(CSVWriter.NO_QUOTE_CHARACTER).withSeparator(CSVWriter.DEFAULT_SEPARATOR)
				.withOrderedResults(false).build();
		writer.write(managerService.findManagers());
	}
	
	@PostMapping(value = "/upload/sales")
	public List<SaleDTO> importSalesData(@RequestParam MultipartFile file) throws IOException, CsvException {
		List<SaleDTO> sales = uploadService.uploadSales(file);
		return sales;
	}
	
	@PostMapping(value = "/upload/sellers")
	public List<SellerToCsv> importSellerData(@RequestParam MultipartFile file) throws IOException, CsvException {
		List<SellerToCsv> sellers = uploadService.uploadSellers(file);
		return sellers;
	}
	
	@PostMapping(value = "/upload/managers")
	public List<ManagerToCsv> importManagerDate(@RequestParam MultipartFile file) throws IOException, CsvException {
		List<ManagerToCsv> managers = uploadService.uploadManagers(file);
		return managers;
	}
	
	@PostMapping(value = "/upload/images")
	public ResponseEntity<PathDTO> uploadImage(@RequestParam MultipartFile file)throws IOException {
		String path = uploadService.uploadImage(file);
			if(path!= null) {
				PathDTO pathDTO = new PathDTO();
				pathDTO.setPathFile(path);
				return ResponseEntity.status(201).body(pathDTO);
				
			}
			
			return ResponseEntity.badRequest().build();
		}
}
