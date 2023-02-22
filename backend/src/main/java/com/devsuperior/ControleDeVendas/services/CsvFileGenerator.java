package com.devsuperior.ControleDeVendas.services;

import java.io.IOException;
import java.io.Writer;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Component;

import com.devsuperior.ControleDeVendas.dto.SaleDTO;

@Component
public class CsvFileGenerator {
	
	public void writeSalesToCsv(List<SaleDTO> sales, Writer writer) {
		try (CSVPrinter printer = new CSVPrinter(writer, CSVFormat.DEFAULT)) {

			printer.printRecord("Id", "Date", "Visited", "Deals", "Amount", "Status", "SellerName");
			for (SaleDTO item : sales) {

				printer.printRecord(item.getId().toString(), item.getDate().toString(), item.getVisited().toString(), item.getDeals().toString(), item.getAmount().toString(), item.getStatus(), item.getSellerName());
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
