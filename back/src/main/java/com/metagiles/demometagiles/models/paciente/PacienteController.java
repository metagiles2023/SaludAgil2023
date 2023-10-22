package com.metagiles.demometagiles.models.paciente;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PacienteController {
    private final PacienteRepository repository;
    public PacienteController(PacienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/paciente/getAll")
    public List<Paciente> getAll() {
        System.out.println("hi!");
        return repository.findAll();
    }

    @PostMapping("/paciente/create")
    public ResponseEntity<?> createPaciente(@RequestBody Paciente request) {
        try {
            // Parse JSON request data into a FichaMedica object
            Paciente paciente = new Paciente();
            
            // Set properties from the request
            paciente.setApellido(request.getApellido());
            paciente.setNombre(request.getNombre());
            paciente.setDni(request.getDni());
            paciente.setRol("paciente");
            paciente.setObraSocial("obraDefault");
            //Falta obra social
            
            // Save the FichaMedica to the repository
            Paciente savedPaciente = repository.save(paciente);
            return ResponseEntity.ok(savedPaciente);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating Paciente");
        }
    }
}
