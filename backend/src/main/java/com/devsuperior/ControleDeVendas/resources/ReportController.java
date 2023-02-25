package com.devsuperior.ControleDeVendas.resources;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.devsuperior.ControleDeVendas.dto.SaleDTO;
import com.devsuperior.ControleDeVendas.dto.UserDtoToDownload;
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
	private SaleService service;
	
	@Autowired
	private SellerService sellerService;
	
	@Autowired
	private UploadService uploadService;

	@GetMapping("/download/sales")
	public void exportSalesCSV(HttpServletResponse response) throws Exception {
		String filename = "sales.csv";
		response.setContentType("text/csv");
		response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
		StatefulBeanToCsv<SaleDTO> writer = new StatefulBeanToCsvBuilder<SaleDTO>(response.getWriter())
				.withQuotechar(CSVWriter.NO_QUOTE_CHARACTER).withSeparator(CSVWriter.DEFAULT_SEPARATOR)
				.withOrderedResults(false).build();
		writer.write(service.findAll());
	}
	
	@GetMapping("/download/sellers")
	public void exportSellerCSV(HttpServletResponse response) throws Exception {
		String filename = "sellers.csv";
		response.setContentType("text/csv");
		response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
		StatefulBeanToCsv<UserDtoToDownload> writer = new StatefulBeanToCsvBuilder<UserDtoToDownload>(response.getWriter())
				.withQuotechar(CSVWriter.NO_QUOTE_CHARACTER).withSeparator(CSVWriter.DEFAULT_SEPARATOR)
				.withOrderedResults(false).build();
		writer.write(sellerService.findAllSellers());
	}
	
	@PostMapping(value = "/upload/sales")
	public List<SaleDTO> importSalesData(@RequestParam MultipartFile file) throws IOException, CsvException {
		List<SaleDTO> sales = uploadService.uploadSales(file);
		return sales;
	}
	
	@PostMapping(value = "/upload/sellers")
	public List<UserDtoToDownload> importSellerData(@RequestParam MultipartFile file) throws IOException, CsvException {
		List<UserDtoToDownload> sellers = uploadService.uploadSellers(file);
		return sellers;
	}
}
