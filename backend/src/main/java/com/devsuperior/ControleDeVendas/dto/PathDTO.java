package com.devsuperior.ControleDeVendas.dto;

import java.io.Serializable;

public class PathDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String pathFile;

	public String getPathFile() {
		return pathFile;
	}

	public void setPathFile(String pathFile) {
		this.pathFile = pathFile;
	}
}
