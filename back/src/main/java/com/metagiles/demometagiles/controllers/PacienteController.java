package com.metagiles.demometagiles.controllers;

import com.metagiles.demometagiles.models.entity.Turno;
import com.metagiles.demometagiles.models.repository.PacienteRepository;
import com.metagiles.demometagiles.models.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class PacienteController {

    private  TurnoRepository turnoRepository;
    private PacienteRepository pacienteRepository;

    @Autowired
    public PacienteController(TurnoRepository turnoRepository, PacienteRepository pacienteRepository){
        this.turnoRepository = turnoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    @GetMapping(value = "/")
    public Map<String,String> test(){
        return new HashMap<String,String>(){{put("key","value");}};

    }
    //devuelve los turnos de un paciente en base a su id
    //Devuelve un mapa con todos los turnos en el siguiente formato
    // idTurno-idPaciente-idMedico-Date
    @GetMapping(value = "/misturnos/{id}")
    public Map<String,String> getTurnosByIdPaciente(@PathVariable String id){
        Map<String,String> output =new HashMap<String,String>();
        long aux_id;
        try {
            aux_id = Long.parseLong(id);
        } catch (NumberFormatException e) {
            System.err.println("ID erroneo");
        }
        Optional<List<Turno>> turnos = Optional.ofNullable(turnoRepository.getTurnosById(Long.valueOf(id)));
        for(int i = 0; i < turnos.get().size(); i++){
            output.put(String.valueOf(i),turnos.get().get(i).toString());
        };



        return output;

    }

    @GetMapping(value = "/misturnos/{pid}/{tid}/delete")
    public Map<String,String> deleteTurnoByIdPaciente(@PathVariable String pid,@PathVariable String tid){
        Map<String,String> output =new HashMap<String,String>();
        long aux_pid,aux_tid;
        try {
            aux_pid = Long.parseLong(pid);
            aux_tid = Long.parseLong(tid);
        } catch (NumberFormatException e) {
            System.err.println("ID erroneo");
        }

        turnoRepository.deleteTurnosById(Long.valueOf(pid),Long.valueOf(tid));
        Optional<List<Turno>> turnos = Optional.ofNullable(turnoRepository.getTurnosById(Long.valueOf(pid)));

        for(int i = 0; i < turnos.get().size(); i++){
            output.put(String.valueOf(i),turnos.get().get(i).toString());
        };

        return output;
    }

    @GetMapping(value = "/reservarturnos/{pid}/{especialidad}/{mid}/{tid}/{mail}/{nrotelefono}")
    public Map<String,String> darInfoTurno(@PathVariable String pid,@PathVariable String especialidad,@PathVariable String mid,
                                        @PathVariable String tid,@PathVariable String email,@PathVariable String nrotelefono){
        return null;
    }

}
