package com.metagiles.demometagiles.models.fichamedica;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

public class FichaMedicaController {
    private final FichaMedicaRepository repository;
    public FichaMedicaController(FichaMedicaRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/ficha-medica/getAll")
    List<FichaMedica> getAll() {
        System.out.println("hi!");
        return repository.findAll();
    }
}
