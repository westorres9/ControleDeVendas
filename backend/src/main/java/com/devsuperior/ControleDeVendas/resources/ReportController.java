package com.devsuperior.ControleDeVendas.resources;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.ControleDeVendas.services.CsvFileGenerator;
import com.devsuperior.ControleDeVendas.services.SaleService;

@RestController
@RequestMapping(value = "/report")
public class ReportController {

	@Autowired
	private SaleService service;

	@Autowired
	private CsvFileGenerator csvGenerator;

	  @GetMapping("/download")
	  public void exportIntoCSV(HttpServletResponse response) throws IOException {
	    response.setContentType("text/csv");
	    response.addHeader("Content-Disposition", "attachment; filename=\"sales.csv\"");
	    csvGenerator.writeSalesToCsv(service.findAll(), response.getWriter());
	  }
}
