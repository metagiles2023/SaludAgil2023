package com.metagiles.demometagiles.models.medico;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.metagiles.demometagiles.utils.Utils;


@RestController
public class MedicoController {
    private final MedicoRepository repository;
    public MedicoController(MedicoRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/medico/getAll")
    List<Medico> getAll() {
        return repository.findAll();
    }

    /*
     * Necesita un JSON en el body de esta manera:
     * {
        "apellido": "apellX",
        "nombre": "nomX",
        "dni": "dniX",
        "especialidad": "especialidadX"
      }
     *  Y los headers deben tener Content-Type = application/json como cualquier POST.
     * 
     * Retorna un JSON con el id del usuario agregado.
     */
    @PostMapping("/medico/create")
    public ResponseEntity<?> createMedico(@RequestBody Medico request) {
        System.out.println("Creando medico");
        try {
            // Parse JSON request data into a Medico object
            Medico medico = new Medico();
            if (repository.existsBydni(request.getDni())) {
                throw new Exception("DNI ya presente en la tabla.");
            }
            // Set properties from the request
            medico.setApellido(request.getApellido());
            medico.setNombre(request.getNombre());
            if (!Utils.esDniValido(request.getDni())) throw new Exception("DNI input invalido: " + request.getDni());
            medico.setDni(request.getDni());
            medico.setRol("medico");
            medico.setEspecialidad(request.getEspecialidad());

            // Save Medico to the repository
            Medico savedMedico = repository.save(medico);
            return ResponseEntity.ok(savedMedico.getIdUsuario());
        } catch(Exception e) {
            System.out.println("Error creating Medico: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating Medico: " + e.getMessage());
        }
    }
}
//