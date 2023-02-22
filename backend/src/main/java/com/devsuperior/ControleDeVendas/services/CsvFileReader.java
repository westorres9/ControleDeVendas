package com.devsuperior.ControleDeVendas.services;

import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

@Service
public class CsvFileReader {
	
	public void FileCSVReader() throws IOException, CsvValidationException {
		var fileName = "src/main/resources/sales.csv";

	     try (var fr = new FileReader(fileName, StandardCharsets.UTF_8);
	          var reader = new CSVReader(fr)) {
	         String[] nextLine;
	         while ((nextLine = reader.readNext()) != null) {
	             for (var e : nextLine) {
	                 System.out.format("%s ", e);
	             }
	         }
	     }
	}
}
