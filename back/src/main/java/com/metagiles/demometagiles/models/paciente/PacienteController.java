package com.metagiles.demometagiles.models.paciente;

import java.util.HashMap;
import java.util.List;

import org.hibernate.mapping.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.metagiles.demometagiles.utils.Utils;

@RestController
public class PacienteController {
    private final PacienteRepository repository;
    public PacienteController(PacienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/paciente/getAll")
    public List<Paciente> getAll() {
        return repository.findAll();
    }
    
    /*
     * Necesita un JSON en el body de esta manera:
     * {
        "apellido": "apellX",
        "nombre": "nomX",
        "dni": "dniX",
        "obraSocial": "obraX"
      }
     *  Y los headers deben tener Content-Type = application/json como cualquier POST.
     * 
     * Retorna un JSON con el id del usuario agregado.
     */
    @PostMapping("/paciente/create")
    public ResponseEntity<?> createPaciente(@RequestBody Paciente request) {
        System.out.println("Creando paciente");
        try {
            // Parse JSON request data into a Paciente object
            Paciente paciente = new Paciente();
            System.out.println(request.getObraSocial());
            if (repository.existsBydni(request.getDni())) {
                System.out.println(HttpStatus.BAD_REQUEST + "Error creating Paciente: ya existe en la tabla.");
                HashMap<String, String> json = Utils.jsonificar("error", "Error creating Paciente: ya existe en la tabla.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
            }

            // Set properties from the request
            paciente.setApellido(request.getApellido());
            paciente.setNombre(request.getNombre());
            if (!Utils.esDniValido(request.getDni())) {
                System.out.println(HttpStatus.BAD_REQUEST + "DNI Inputted invalido: " + request.getDni());
                HashMap<String, String> json = Utils.jsonificar("error", "DNI Inputted invalido: " + request.getDni());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
            }
            paciente.setDni(request.getDni());
            paciente.setRol("paciente");
            paciente.setObraSocial(request.getObraSocial()); //Falta que obra social sea una lista en vez de un String

            // Save Paciente to the repository
            Paciente savedPaciente = repository.save(paciente);
            return ResponseEntity.ok(savedPaciente.getIdUsuario());
        } catch(Exception e) {
            System.out.println("Error creating Paciente: " + e.getMessage());
            HashMap<String, String> json = Utils.jsonificar("error", "Error creating Paciente: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
        }
    }
}
//