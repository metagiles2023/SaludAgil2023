package com.metagiles.demometagiles.models.sesion;

public class LoginRequest {
    private String dni;
    //private String password; //Ignorada

    public LoginRequest() {

    }

    // public LoginRequest(String dni, String password) { // Por ignorar password
    //     this.dni = dni;
    //     this.password = password;
    // }

    public LoginRequest(String dni) { // Por ignorar password
        this.dni = dni;
    }

    public String getDni() {
        return this.dni;
    }
}
