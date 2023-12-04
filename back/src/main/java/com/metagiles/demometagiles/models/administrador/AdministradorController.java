package com.metagiles.demometagiles.models.administrador;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class AdministradorController {
    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    /* Necesita un JSON en el body (por eso es POST) de la siguiente manera
    *   
    *   {
            fechaDesde: "", // ISO 8601
            fechaHasta: "", // ISO 8601
            filtraGrave: bool,
            filtraEmergencia: bool,
            medico: 3,
            paciente: 2
        }
    */
    @PostMapping("/administrador")
    public List<Administrador> getAll(@RequestHeader("Authorization") String token) {
        System.out.println("im getting token " + token);
        return administradorService.findAllAdministradores(token);
    }
    
    /*
     * Necesita un JSON en el body de esta manera:
     * {
        "medico": 2 //id
        "paciente": 3 //id
        "date": "", //ISO 8601 -> Ejemplo: "date": "2023-10-26T10:00:00"
        "diagnostico": "un diagnostico X",
        "esGrave": bool.
        "usoEmergencia": bool
      }
     *  Y los headers deben tener Content-Type = application/json como cualquier POST.
     * 
     * Retorna un JSON con el id del usuario agregado.
     */
    @PostMapping("/administrador/create")
    public ResponseEntity<?> crearAdministrador(@RequestBody Administrador request, @RequestHeader HttpHeaders headers) {
        return administradorService.crearAdministrador(request, "xxx");
    }
}
