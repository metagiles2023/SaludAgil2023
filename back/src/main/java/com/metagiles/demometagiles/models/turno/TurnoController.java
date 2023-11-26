package com.metagiles.demometagiles.models.turno;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.Id;

@Component
@EnableScheduling
@RestController
public class TurnoController {

    private final TurnoService turnoService;
    public TurnoController(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    @PostMapping(value = "/reservar/turno")
    public ResponseEntity<?> postReservarTurno(@RequestBody Map<String,String> request){
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

    @PostMapping(value ="/agregarturno")
    public ResponseEntity<?> agregarTurno(@RequestBody Map<String,String> request){
        return turnoService.agregarTurno(request);
    }

    @PostMapping(value ="/agregarturnos")
    public ResponseEntity<?> agregarTurnos(@RequestBody Map<String,String> request){
        return turnoService.agregarTurnos(request);
    }
}
