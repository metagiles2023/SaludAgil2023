package com.metagiles.demometagiles.controllers;

import com.metagiles.demometagiles.models.entity.Medico;
import com.metagiles.demometagiles.models.entity.Paciente;
import com.metagiles.demometagiles.models.entity.Turno;
import com.metagiles.demometagiles.models.repository.MedicoRepository;
import com.metagiles.demometagiles.models.repository.PacienteRepository;
import com.metagiles.demometagiles.models.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
public class PacienteController {

    private TurnoRepository turnoRepository;
    private PacienteRepository pacienteRepository;


    @Autowired
    public PacienteController(TurnoRepository turnoRepository, PacienteRepository pacienteRepository) {
        this.turnoRepository = turnoRepository;
        this.pacienteRepository = pacienteRepository;

    }


    @PostMapping(value = "/reservar/turno")
    public ResponseEntity<?> postReservarTurno(@RequestBody Map<String,String> request){
        try{
            Turno turno = this.turnoRepository.getReferenceById(Long.valueOf(request.get("id")));
            turno.setOcupado(true);
            Paciente paciente = this.pacienteRepository.getReferenceById(Long.valueOf(request.get("idUsuario")));
            turno.setPaciente(paciente);
            this.turnoRepository.save(turno);
            return ResponseEntity.ok("succesful:");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("err");
        }

    };

    //devuelve un mapa donde la key es el id del turno y el value es la fecha
    @GetMapping(value = "/turnosByMedico")
    public List<Turno> getTurnosMedicoByDiaByMes(@RequestParam(name = "dia") String dia,@RequestParam(name = "mes") String mes ,@RequestParam(name = "id") String IdMedico){
        System.out.println("GET: /turnos/{dia}/{IdMedico}" + " dia: " + dia + " medico: " + IdMedico + "mes " + mes );
        int aux_mes;
        long aux_id;
        int aux_dia;
        try {
            aux_id = Long.parseLong(IdMedico);
            aux_dia = Integer.parseInt(dia);
            aux_mes = Integer.parseInt(mes);
        } catch (NumberFormatException e) {
            System.err.println("ID erroneo: no se pudo parsear");
            return null;
        }

        List<Turno> turnos = this.turnoRepository.getTurnosDisponiblesMedicoByDiaByMes(aux_id,aux_dia,aux_mes);
        System.out.println(turnos);
        return turnos;

    };
    //devuelve los turnos de un paciente en base a su id
    //Devuelve un mapa con todos los turnos en el siguiente formato
    // idTurno-idPaciente-idMedico-Date
    @GetMapping(value = "/misturnos/{id}")
    public List<String> getTurnosByIdPaciente (@PathVariable String id){
        List<String> output = new ArrayList<String>();
        long aux_id;
        try {
            aux_id = Long.parseLong(id);
        } catch (NumberFormatException e) {
            System.err.println("ID erroneo: no se pudo parsear");
            return output;
        }

        Optional<List<Turno>> turnos = Optional.ofNullable(turnoRepository.getTurnosByIdPaciente(aux_id));

        for (int i = 0; i < turnos.get().size(); i++) {
            Turno aux = turnos.get().get(i);
            output.add(aux.getId() + ":" + aux.getMedico().getNombre() + " " + aux.getMedico().getApellido() + ":" + aux.getMedico().getEspecialidad() + ":" + aux.getDate());
        }

        return output;


    }

    @PostMapping(value = "/misturnos/cancelar")
    public ResponseEntity<?> cancelarTurnoByIdPaciente (@RequestBody Map<String,String> request){
        System.out.println(request.toString());


        try {
            Long aux_tid = Long.valueOf(request.get("tid"));
            Long aux_pid = Long.valueOf(request.get("pid"));
            Turno turno = this.turnoRepository.getTurnoByIdByIdUsuario(aux_tid,aux_pid);
            turno.setOcupado(false);
            turno.setPaciente(null);
            this.turnoRepository.save(turno);
            return ResponseEntity.ok(null);
        } catch (NumberFormatException e) {
            HashMap<String, String> json = new HashMap<>();
            json.put("error", "Error al cancelar turno");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);

        }


    }

    @GetMapping(value = "/reservarturnos/{pid}/{mail}/{nrotelefono}")
    public void darInfoTurno (@PathVariable String pid, @PathVariable String mail, @PathVariable String nrotelefono) throws
            Exception {
        long aux_pid;
        try {
            aux_pid = Long.parseLong(pid);
        } catch (NumberFormatException e) {
            System.err.println("ID erroneo");
        }
        long aux_long;
        try {
            aux_long = Long.valueOf(nrotelefono);
        } catch (NumberFormatException e) {
            System.err.println("Nro de telefono erroneo");
        }
        try {
            if (nrotelefono.length() != 10)
                throw new Exception("El número debe tener 10 dígitos");
        } catch (NumberFormatException e) {
            System.out.println(e.getMessage());
        }

    }
}
