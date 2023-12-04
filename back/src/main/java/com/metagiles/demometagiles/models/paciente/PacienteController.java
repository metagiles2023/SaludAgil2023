package com.metagiles.demometagiles.models.paciente;

import java.util.*;

import com.metagiles.demometagiles.utils.SendEmail;
import com.metagiles.demometagiles.utils.Utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.metagiles.demometagiles.models.entity.Turno;

@Component
@EnableScheduling
@RestController
public class PacienteController {
    private final PacienteService pacienteService;
    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping("/paciente")
    public List<Paciente> findAllPacientes(@RequestHeader("Authorization") String token) {
        return pacienteService.findAllPacientes(token);
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
        if (pacienteService.estaInscriptoEnFacultad(request.getDni())){
            return pacienteService.createPaciente(request);
        }
        else{
            return Utils.genResponseError("El DNI no está inscripto en la facultad");
        }
    }

    @GetMapping("/paciente/getById")
    public ResponseEntity<?> getById(@RequestParam("id") Long idUsuario, @RequestHeader("Authorization") String token) {
        return pacienteService.getById(idUsuario,token);
    }
    
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //Cosas de Turnos que quizas puedan ir en un TurnoController pero que por ahora dejamos aca

    @PostMapping(value = "/reservar/turno")
    public ResponseEntity<?> postReservarTurno(@RequestBody Map<String,String> request, @RequestHeader("Authorization") String token){
        return pacienteService.postReservarTurno(request,token);
    };

    //devuelve un mapa donde la key es el id del turno y el value es la fecha
    @GetMapping(value = "/turnosByMedico")
    public List<Turno> getTurnosMedicoByDiaByMes(@RequestParam(name = "dia") String dia,@RequestParam(name = "mes") String mes ,@RequestParam(name = "id") String IdMedico, @RequestHeader("Authorization") String token){
        return pacienteService.getTurnosMedicoByDiaByMes(dia, mes, IdMedico, token);
    };

    //devuelve los turnos de un paciente en base a su id
    //Devuelve un mapa con todos los turnos en el siguiente formato
    // idTurno-idPaciente-idMedico-Date
    @GetMapping(value = "/misturnos/{id}")
    public List<String> getTurnosByIdPaciente (@PathVariable String id){
        return pacienteService.getTurnosByIdPaciente(id);
    }

    @PostMapping(value = "/misturnos/cancelar")
    public ResponseEntity<?> cancelarTurnoByIdPaciente(@RequestBody Map<String,String> request, @RequestHeader("Authorization") String token){
        return pacienteService.cancelarTurnoByIdPaciente(request);
    }

    @GetMapping(value = "/reservarturnos/{pid}/{mail}/{nrotelefono}")
    public void darInfoTurno (@PathVariable String pid, @PathVariable String mail, @PathVariable String nrotelefono) throws Exception {
        pacienteService.darInfoTurno(pid, mail, nrotelefono);
    }

    // Método para simular el chequeo con la API de la facultad
    @GetMapping(value = "/paciente/isInscripto")
    public boolean estaInscriptoEnFacultad(@RequestBody Map<String, String> dniRequest) {
        String dni = dniRequest.get("dni");
        return pacienteService.estaInscriptoEnFacultad(dni);
    }
}
//