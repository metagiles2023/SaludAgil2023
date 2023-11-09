package com.metagiles.demometagiles.models.medico;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.metagiles.demometagiles.models.paciente.Paciente;
import com.metagiles.demometagiles.utils.Utils;


@RestController
public class MedicoController {
    private final MedicoRepository medicoRepository;
    public MedicoController(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    @GetMapping("/medico")
    List<Medico> getAll() {
        System.out.println("Recuperando medicos");
        List<Medico> medicos = medicoRepository.findAll();
        System.out.println("Recupero " + medicos.size() + " medicos");
        return medicos;
    }

    @GetMapping("/medico/getById")
    public ResponseEntity<?> getById(@RequestParam("id") Long idUsuario) {
        Medico medico = null;
        try {
            Optional<Medico> medicoOpt = medicoRepository.findById(idUsuario);
            if (medicoOpt.isPresent()) {
                medico = medicoOpt.get();
                return ResponseEntity.ok(medico);
            } else {
                System.out.println("NO SE ENCONTRO DICHO MEDICO");
                return Utils.genResponseError("No se encontro dicho medico.");
            }
        } catch (Exception e) {
            return Utils.genResponseError("Error buscando paciente: " + e.getMessage());
        }
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
    @PostMapping("/medico")
    public ResponseEntity<?> createMedico(@RequestBody Medico request) {
        System.out.println("Creando medico");
        try {
            // Parse JSON request data into a Medico object
            Medico medico = new Medico();
            if (medicoRepository.existsBydni(request.getDni()))
                return Utils.genResponseError("Error creating Medico: ya existe en la tabla.");
        
            // Set properties from the request
            medico.setApellido(request.getApellido());
            medico.setNombre(request.getNombre());
            if (!Utils.esDniValido(request.getDni()))
                return Utils.genResponseError("DNI input invalido: " + request.getDni());

            medico.setDni(request.getDni());
            medico.setRol("medico");
            medico.setEspecialidad(request.getEspecialidad());

            // Save Medico to the repository
            Medico savedMedico = medicoRepository.save(medico);
            return ResponseEntity.ok(Utils.jsonificar("id", savedMedico.getIdUsuario()));
        } catch(Exception e) {
            return Utils.genResponseError("Error creating Medico: " + e.getMessage());
        }
    }
}
//