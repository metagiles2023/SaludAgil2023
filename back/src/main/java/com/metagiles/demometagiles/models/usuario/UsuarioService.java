package com.metagiles.demometagiles.models.usuario;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Me hace evitar escribir el ctor
public class UsuarioService{
    private final UsuarioRepository usuarioRepository;

    public Usuario getUsuario(String dni) {
        return usuarioRepository.getBydni(dni);
    }    
}
