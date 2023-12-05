package com.metagiles.demometagiles.models.sesion;

import java.util.Date;

import com.metagiles.demometagiles.models.usuario.Usuario;

public class Session {
    private String token;
    private Usuario usuario;
    private Date lastActivity;
    
    public Session(String token, Usuario usuario) {
        this.token = token;
        this.usuario = usuario;
        this.lastActivity = new Date();
    }

    public String getToken() {
        return token;
    }
    public Usuario getUsuario() {
        return usuario;
    }

    public Date getLastActivity() {
        return lastActivity;
    }

    public void setLastActivity(Date lastActivity) {
        this.lastActivity = lastActivity;
    }

    
}
