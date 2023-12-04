package com.metagiles.demometagiles.models.usuario;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.metagiles.demometagiles.models.sesion.Session;
import com.metagiles.demometagiles.models.sesion.SessionCacheService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Me hace evitar escribir el ctor
public class UsuarioService{
    private final UsuarioRepository usuarioRepository;
    private final SessionCacheService sessionCacheService;
    
    public ArrayList<Usuario> getUsuarios(String dni) {
        return usuarioRepository.getBydni(dni);
    }

    public ArrayList<Usuario> getAllUsuarios(String token) {
        Session session = sessionCacheService.getSession(token);
        if (session == null) { //significa que el login es invalido
            System.out.println("getUsuarios: token invalido");
            return null;
        }
        System.out.println("getUsuarios: retorno usuarios");
        List<Usuario> usuarios = usuarioRepository.findAll();
        ArrayList<Usuario> retUsuarios = new ArrayList<>();
        for (Usuario usuario : usuarios) {
            retUsuarios.add(usuario);
        }
        return retUsuarios;
    }

    public ArrayList<Usuario> getAllUsuariosNoToken() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        ArrayList<Usuario> retUsuarios = new ArrayList<>();
        for (Usuario usuario : usuarios) {
            retUsuarios.add(usuario);
        }
        return retUsuarios;
    }
}

