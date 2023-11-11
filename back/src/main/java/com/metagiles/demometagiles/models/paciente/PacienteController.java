package com.metagiles.demometagiles.models.paciente;

import java.util.*;

import com.metagiles.demometagiles.models.turno.Turno;
import com.metagiles.demometagiles.utils.SendEmail;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Component
@EnableScheduling
@RestController
public class PacienteController {
    private final PacienteService pacienteService;
    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping("/paciente")
    public List<Paciente> findAllPacientes() {
        return pacienteService.findAllPacientes();
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
     * Retorna un JSON con el id del usuario agregado. {"id": 2}
     */
    @PostMapping("/paciente")
    public ResponseEntity<?> createPaciente(@RequestBody Paciente request) {
        return pacienteService.createPaciente(request);
    }

    @GetMapping("/paciente/getById")
    public ResponseEntity<?> getById(@RequestParam("id") Long idUsuario) {
        return pacienteService.getById(idUsuario);
    }

    
}
//