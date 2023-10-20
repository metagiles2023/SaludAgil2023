package com.metagiles.demometagiles.models.paciente;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PacienteController {
    private final PacienteRepository repository;
    public PacienteController(PacienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/pacientes/getAll")
    List<Paciente> getAll() {
        System.out.println("hi!");
        return repository.findAll();
    }
}
