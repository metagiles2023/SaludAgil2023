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
    //devuelve los turnos de acuerdo al id del paciente
    @GetMapping(value = "/turnos/{id}")
    public Map<String,String> test2(@PathVariable String id){

        long aux_id = 1;
        try {
            aux_id = Long.parseLong(id);
            System.out.println("ID: " + aux_id);
        } catch (NumberFormatException e) {
            System.err.println("ID erroneo");
        }
        Optional<List<Turno>> turnos = Optional.ofNullable(turnoRepository.getTurnosById(Long.valueOf(id)));
        //System.out.println(turnos);


        return new HashMap<String,String>(){{put("key",id);}};

    }

}
