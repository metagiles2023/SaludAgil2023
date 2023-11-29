package com.metagiles.demometagiles.models.usuario;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Me hace evitar escribir el ctor
public class UsuarioService{
    private final UsuarioRepository usuarioRepository;

    public ArrayList<Usuario> getUsuarios(String dni) {
        return usuarioRepository.getBydni(dni);
    }    
}
