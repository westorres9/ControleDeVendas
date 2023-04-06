package com.devsuperior.ControleDeVendas.dto;

import com.devsuperior.ControleDeVendas.services.validations.UserUpdateValid;

@UserUpdateValid
public class UserUpdateDTO extends UserDTO{
    private static final long serialVersionUID = 1L;
    
    private String password;

    UserUpdateDTO() {
        super();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
