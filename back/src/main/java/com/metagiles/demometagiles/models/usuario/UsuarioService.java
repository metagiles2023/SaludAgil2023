package com.metagiles.demometagiles.models.usuario;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.metagiles.demometagiles.models.sesion.Session;
import com.metagiles.demometagiles.models.sesion.SessionCacheService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Me hace evitar escribir el ctor
public class UsuarioService{
    private final UsuarioRepository usuarioRepository;
    private final SessionCacheService sessionCacheService;

    public ArrayList<Usuario> getUsuarios(String dni, String token) {
        Session session = sessionCacheService.getSession(token);
        if (session == null) { //significa que el login es invalido
            return null;
        }
        return usuarioRepository.getBydni(dni);
    }    
    
    public ArrayList<Usuario> getUsuarios(String dni) {
        return usuarioRepository.getBydni(dni);
    }
}

