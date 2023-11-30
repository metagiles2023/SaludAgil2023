package com.metagiles.demometagiles.models.medico;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.metagiles.demometagiles.models.sesion.Session;
import com.metagiles.demometagiles.models.sesion.SessionCacheService;
import com.metagiles.demometagiles.utils.Utils;


@RestController
public class MedicoController {
    private final MedicoRepository medicoRepository;
    private final SessionCacheService sessionCacheService;
    public MedicoController(MedicoRepository medicoRepository, SessionCacheService sessionCacheService) {
        this.medicoRepository = medicoRepository;
        this.sessionCacheService = sessionCacheService;
    }

    @GetMapping("/medico")
    List<Medico> getAll(@RequestBody String token) {
        if(sessionCacheService.getSession(token) == null) {
            return null;
        }
        System.out.println("Recuperando medicos");
        List<Medico> medicos = medicoRepository.findAll();
        System.out.println("Recupero " + medicos.size() + " medicos");
        return medicos;
    }

    @GetMapping("/medico/getById")
    public ResponseEntity<?> getById(@RequestParam("id") Long idUsuario, @RequestBody String token) {
        Medico medico = null;
        Session session = sessionCacheService.getSession(token);
        if(session == null) {
            return Utils.genResponseError("Tu login es inválido.");
        }
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
    public ResponseEntity<?> createMedico(@RequestBody Medico request, @RequestBody String token) {
        Session session = sessionCacheService.getSession(token);
        if(session == null) {
            return Utils.genResponseError("Tu login es inválido.");
        }
        if(!session.getUsuario().getRol().equals("admin")){
            return Utils.genResponseError("No tienes permiso para hacer eso.");
        }
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
            medico.setEspecialidad(request.getEspecialidad().toLowerCase());
            medico.setEmail(request.getEmail());
            // Save Medico to the repository
            Medico savedMedico = medicoRepository.save(medico);
            return ResponseEntity.ok(Utils.jsonificar("id", savedMedico.getIdUsuario()));
        } catch(Exception e) {
            return Utils.genResponseError("Error creating Medico: " + e.getMessage());
        }
    }

    @GetMapping("/medico/getByEspecialidad")
    public List<Medico> getMedicosByEspecialidad(@RequestParam(name = "especialidad") String especialidad, @RequestBody String token){
        Session session = sessionCacheService.getSession(token);
        if(session == null) {
            return null;
        }
        System.out.println("Especialidad: " + especialidad);
        List<Medico> medicos = medicoRepository.getByEspecialidad(especialidad);
        System.out.println("medicos: " + medicos.toString());
        return medicos;
    };
}
//