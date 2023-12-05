package com.metagiles.demometagiles.models.administrador;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class AdministradorController {
    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    
    @GetMapping("/administrador")
    public List<Administrador> getAll(@RequestHeader("Authorization") String token) {
        System.out.println("im getting token " + token);
        return administradorService.findAllAdministradores(token);
    }

    // Solo para dev
    @GetMapping("/administradorNoToken")
    public List<Administrador> getAll() {
        return administradorService.findAllAdministradores("noToken");
    }
    
    /*
     * Necesita un JSON en el body de esta manera:
     * {
        administrador
      }
     *  Y los headers deben tener Content-Type = application/json como cualquier POST.
     * 
     * Retorna un JSON con el id del usuario agregado.
     */
    @PostMapping("/administrador")
    public ResponseEntity<?> crearAdministrador(@RequestBody Administrador request) {
        return administradorService.crearAdministrador(request);
    }
}
