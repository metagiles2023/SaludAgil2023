package com.metagiles.demometagiles.models.usuario;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
    private final UsuarioRepository repository;
    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/usuario")
    List<Usuario> getAll() {
        return repository.findAll();
    }

    // @PostMapping("/users/create")
    // List<Usuario> createUser() {
    //     System.out.println("hi!");
    //     return repository.;
    // }

}
