package com.metagiles.demometagiles.models.usuario;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.metagiles.demometagiles.models.sesion.Session;
import com.metagiles.demometagiles.models.sesion.SessionCacheService;

@RestController
public class UsuarioController {
    private final UsuarioService usuarioService;
    public UsuarioController(UsuarioService usuarioService, SessionCacheService sessionCacheService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/usuario")
    List<Usuario> getAll(@RequestBody String dni, @RequestHeader("Authorization") String token) {
        return usuarioService.getUsuarios(dni, token);
    }

    // @PostMapping("/users/create")
    // List<Usuario> createUser() {
    //     System.out.println("hi!");
    //     return repository.;
    // }

}
