package com.metagiles.demometagiles.models.sesion;

import com.metagiles.demometagiles.models.usuario.Usuario;

public class SessionResponse {
    private String token;
    private Usuario usuario;
    
    public SessionResponse(String token, Usuario usuario) {
        this.token = token;
        this.usuario = usuario;
    }

    public String getToken() {
        return token;
    }
    public Usuario getUsuario() {
        return usuario;
    }
}
