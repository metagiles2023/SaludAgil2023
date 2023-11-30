package com.metagiles.demometagiles.models.especialidad;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.metagiles.demometagiles.models.sesion.Session;
import com.metagiles.demometagiles.models.sesion.SessionCacheService;
import com.metagiles.demometagiles.utils.Utils;

@RestController
public class EspecialidadController {
    private final EspecialidadRepository repository;
    private final SessionCacheService sessionCacheService;

    public EspecialidadController(EspecialidadRepository repository, SessionCacheService sessionCacheService) {
        this.repository = repository;
        this.sessionCacheService = sessionCacheService;
    }

    @GetMapping("/medico/especialidad")
    public List<Especialidad> getAll(@RequestBody String token) {
        System.out.println("getting especialidades");
        Session session = sessionCacheService.getSession(token);
        if (session == null) { //significa que el login es invalido
            return null;
        }
        List<Especialidad> fichas = null;
        try {
            fichas = repository.findAll();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return fichas;
    }
    
    /*
     * Necesita un JSON en el body de esta manera:
     * {
        "nombre": "...", //id
        "descripcion": "...", //id
      }
     *  Y los headers deben tener Content-Type = application/json como cualquier POST.
     * 
     * Retorna un JSON con el id de la especialidad agregada, o un json { "error": "..."}
     */
    @PostMapping("/medico/especialidad")
    public ResponseEntity<?> crearEspecialidad(@RequestBody Especialidad request) {
        try {
            if (repository.existsBynombre(request.getNombre())) {
                return Utils.genResponseError("Ya existe una especialidad con este nombre.");
            }
            
            Especialidad especialidad = new Especialidad();
            especialidad.setNombre(request.getNombre());
            especialidad.setDescripcion(request.getDescripcion());

            Especialidad savedEspecialidad = repository.save(especialidad);
            return ResponseEntity.ok(Utils.jsonificar("id", savedEspecialidad.getIdEspecialidad()));
        } catch(Exception e) {
            return Utils.genResponseError("Error creating Especialidad: "  + e.getMessage());
        }
    }
}
