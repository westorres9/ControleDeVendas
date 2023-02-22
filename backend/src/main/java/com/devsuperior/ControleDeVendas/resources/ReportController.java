package com.devsuperior.ControleDeVendas.resources;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Iterator;
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
import com.devsuperior.ControleDeVendas.services.SaleService;
import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvException;

@RestController
@RequestMapping(value = "/report")
public class ReportController {
	
	@Autowired
	private SaleService service;
	

	@GetMapping("/download")
	public void exportCSV(HttpServletResponse response) throws Exception {
		String filename = "sales.csv";
		response.setContentType("text/csv");
		response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
		StatefulBeanToCsv<SaleDTO> writer = new StatefulBeanToCsvBuilder<SaleDTO>(response.getWriter())
				.withQuotechar(CSVWriter.NO_QUOTE_CHARACTER).withSeparator(CSVWriter.DEFAULT_SEPARATOR)
				.withOrderedResults(false).build();
		writer.write(service.findAll());
	}
	
	@PostMapping(value = "/upload")
	public List<String[]> importData(@RequestParam MultipartFile file) throws IOException, CsvException {
		InputStream archive = file.getInputStream();
		BufferedReader fileReader = new BufferedReader(new InputStreamReader(archive));
		try (CSVReader reader = new CSVReader(fileReader)) {
			List<String[]> records = reader.readAll();
			return  records;
		}
	}
}
