package com.metagiles.demometagiles.controllers;

import com.metagiles.demometagiles.models.entity.Medico;
import com.metagiles.demometagiles.models.entity.Turno;
import com.metagiles.demometagiles.models.repository.MedicoRepository;
import com.metagiles.demometagiles.models.repository.PacienteRepository;
import com.metagiles.demometagiles.models.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class PacienteController {

    private TurnoRepository turnoRepository;
    private PacienteRepository pacienteRepository;

    private MedicoRepository medicoRepository;

    @Autowired
    public PacienteController(TurnoRepository turnoRepository, PacienteRepository pacienteRepository, MedicoRepository medicoRepository) {
        this.turnoRepository = turnoRepository;
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
    }

    //devuelve un mapa donde la key es el id del turno y el value es la fecha

    //devuelve un mapa donde la key es el id del turno y el value es la fecha
    @GetMapping(value = "/turnosByMedico")
    public Map<String,String> getTurnosMedicoByDia(@RequestParam(name = "dia") String dia, @RequestParam(name = "id") String IdMedico){
        System.out.println("GET: /turnos/{dia}/{IdMedico}" + " " + dia +" " + IdMedico);
        Map<String,String> output =new HashMap<String,String>();
        long aux_id;
        int aux_dia;
        try {
            aux_id = Long.parseLong(IdMedico);
            aux_dia = Integer.parseInt(dia);
        } catch (NumberFormatException e) {
            System.err.println("ID erroneo: no se pudo parsear");
            return output;
        }

        List<Turno> turnos = this.turnoRepository.getTurnosDisponiblesMedicoByDia(aux_id,aux_dia);

        for(Turno t: turnos){
            output.put(t.getId().toString(),t.getDate().toString());
        };
        System.out.println(output);
        return output;

    };
        //devuelve los turnos de un paciente en base a su id
        //Devuelve un mapa con todos los turnos en el siguiente formato
        // idTurno-idPaciente-idMedico-Date
        @GetMapping(value = "/misturnos/{id}")
        public Map<String, String> getTurnosByIdPaciente (@PathVariable String id){
            Map<String, String> output = new HashMap<String, String>();
            long aux_id;
            try {
                aux_id = Long.parseLong(id);
            } catch (NumberFormatException e) {
                System.err.println("ID erroneo: no se pudo parsear");
                return output;
            }
            Optional<List<Turno>> turnos = Optional.ofNullable(turnoRepository.getTurnosById(Long.valueOf(id)));
            for (int i = 0; i < turnos.get().size(); i++) {
                output.put(String.valueOf(i), turnos.get().get(i).toString());
            }



            return output;

        }

        @GetMapping(value = "/misturnos/{pid}/{tid}/delete")
        public Map<String, String> deleteTurnoByIdPaciente (@PathVariable String pid, @PathVariable String tid){
            Map<String, String> output = new HashMap<String, String>();
            long aux_pid, aux_tid;
            try {
                aux_pid = Long.parseLong(pid);
                aux_tid = Long.parseLong(tid);
            } catch (NumberFormatException e) {
                System.err.println("ID erroneo");
            }

            turnoRepository.deleteTurnosById(Long.valueOf(pid), Long.valueOf(tid));
            Optional<List<Turno>> turnos = Optional.ofNullable(turnoRepository.getTurnosById(Long.valueOf(pid)));

            for (int i = 0; i < turnos.get().size(); i++) {
                output.put(String.valueOf(i), turnos.get().get(i).toString());
            }
            ;

            return output;
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
