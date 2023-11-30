package com.metagiles.demometagiles.models.fichamedica;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.metagiles.demometagiles.models.Filtro.FiltroRequest;

@RestController
public class FichaMedicaController {
    private final FichaMedicaService fichaMedicaService;

    public FichaMedicaController(FichaMedicaService fichaMedicaService) {
        this.fichaMedicaService = fichaMedicaService;
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
    @PostMapping("/ficha-medica")
    public List<FichaMedica> getAll(@RequestBody FiltroRequest fRequest, @RequestBody String token) {
        return fichaMedicaService.findAllFichaMedicas(fRequest, token);
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
    @PostMapping("/ficha-medica/create")
    public ResponseEntity<?> crearFichaMedica(@RequestBody FichaMedica request, @RequestBody String token) {
        return fichaMedicaService.crearFichaMedica(request, token);
    }
}
