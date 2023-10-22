package com.metagiles.demometagiles.models.medico;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MedicoController {
    private final MedicoRepository repository;
    public MedicoController(MedicoRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/medicos/getAll")
    List<Medico> getAll() {
        System.out.println("hi!");
        return repository.findAll();
    }
}
//