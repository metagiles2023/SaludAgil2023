package com.metagiles.demometagiles.models.turno;

import java.util.List;
import java.util.Map;

import com.metagiles.demometagiles.models.sesion.Session;
import com.metagiles.demometagiles.models.sesion.SessionCacheService;
import com.metagiles.demometagiles.models.usuario.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.Id;

@Component
@EnableScheduling
@RestController
public class TurnoController {

    private final TurnoService turnoService;
    private final SessionCacheService sessionCacheService;
    public TurnoController(TurnoService turnoService, SessionCacheService sessionCacheService) {
        this.turnoService = turnoService;
        this.sessionCacheService = sessionCacheService;
    }

    @PostMapping(value = "/reservar/turno")
    public ResponseEntity<?> postReservarTurno(@RequestBody Map<String,String> request, @RequestHeader("Authorization") String token){
        Session session = sessionCacheService.getSession(token);
        if (session == null) { //significa que el login es invalido
            return null;
        }

        Usuario usuarioPaciente = session.getUsuario();
        System.out.println( "ID del paciente: " + usuarioPaciente.getIdUsuario());
        return turnoService.postReservarTurno(request);
    };

    //devuelve un mapa donde la key es el id del turno y el value es la fecha
    @GetMapping(value = "/turnosByMedicoDisponibles")
    public List<Turno> getTurnosMedicoDisponiblesByDiaByMes(@RequestParam(name = "dia") String dia,@RequestParam(name = "mes") String mes ,@RequestParam(name = "id") String IdMedico){
        return turnoService.getTurnosMedicoDisponiblesByDiaByMes(dia, mes, IdMedico);
    };

    @GetMapping(value = "/misturnosmedico")
    public List<Turno> getTurnosMedicoByDiaByMes(@RequestParam(name = "dia") String dia,@RequestParam(name = "mes") String mes ,@RequestParam(name = "id") String IdMedico){
        return turnoService.getTurnosMedicoByDiaByMes(dia, mes, IdMedico);
    }

    //devuelve los turnos de un paciente en base a su id
    //Devuelve un mapa con todos los turnos en el siguiente formato
    // idTurno-idPaciente-idMedico-Date
    @GetMapping(value = "/misturnos/{id}")
    public List<String> getTurnosByIdPaciente (@PathVariable String id){
        return turnoService.getTurnosByIdPaciente(id);
    }

    @PostMapping(value = "/misturnos/cancelar")
    public ResponseEntity<?> cancelarTurnoByIdPaciente (@RequestBody Map<String,String> request){
        return turnoService.cancelarTurnoByIdPaciente(request);
    }

    @GetMapping(value = "/reservarturnos/{pid}/{mail}/{nrotelefono}")
    public void darInfoTurno (@PathVariable String pid, @PathVariable String mail, @PathVariable String nrotelefono) throws Exception {
        turnoService.darInfoTurno(pid, mail, nrotelefono);
    }

    @PostMapping(value ="/agregarturnos")
    public ResponseEntity<?> agregarTurnos(@RequestBody Map<String,String> request){
        return turnoService.agregarTurnos(request);
    }


}
