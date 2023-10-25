package com.metagiles.demometagiles.models.especialidad;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.metagiles.demometagiles.utils.Utils;

@RestController
public class EspecialidadController {
    private final EspecialidadRepository repository;

    public EspecialidadController(EspecialidadRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/medico/especialidad")
    public List<Especialidad> getAll() {
        System.out.println("getting especialidades");
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
    @PostMapping("/medico/especialidad/create")
    public ResponseEntity<?> crearEspecialidad(@RequestBody Especialidad request) {
        try {
            if (repository.existsBynombre(request.getNombre())) {
                return genResponseError("Ya existe una especialidad con este nombre.");
            }
            
            Especialidad especialidad = new Especialidad();
            especialidad.setNombre(request.getNombre());
            especialidad.setDescripcion(request.getDescripcion());

            Especialidad savedEspecialidad = repository.save(especialidad);
            return ResponseEntity.ok(Utils.jsonificar("id", savedEspecialidad.getIdEspecialidad()));
        } catch(Exception e) {
            return genResponseError("Error creating Especialidad: "  + e.getMessage());
        }
    }

    private ResponseEntity<HashMap<String, String>> genResponseError(String texto) {
        System.out.println(HttpStatus.BAD_REQUEST + texto);
        HashMap<String, String> json = Utils.jsonificar("error", texto);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
    }
}
