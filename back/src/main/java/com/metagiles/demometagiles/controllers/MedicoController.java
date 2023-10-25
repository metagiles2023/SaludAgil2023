package com.metagiles.demometagiles.controllers;

import com.metagiles.demometagiles.models.entity.Turno;
import com.metagiles.demometagiles.models.repository.MedicoRepository;
import com.metagiles.demometagiles.models.repository.PacienteRepository;
import com.metagiles.demometagiles.models.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class MedicoController {

    private  TurnoRepository turnoRepository;
    private  MedicoRepository medicoRepository;

    @Autowired
    public MedicoController(TurnoRepository turnoRepository, MedicoRepository medicoRepository){
        this.turnoRepository = turnoRepository;
        this.medicoRepository = medicoRepository;
    }

    @GetMapping(value = "/reservarturnos/{especialidad}")
    public Map<String,String> getMedicoByEspecialidad(@PathVariable String especialidad){
        return null;
    }

}
