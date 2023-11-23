package com.metagiles.demometagiles.models.medico;

import com.metagiles.demometagiles.models.turno.Turno;
import com.metagiles.demometagiles.models.turno.TurnoRepository;
import com.metagiles.demometagiles.utils.SendEmail;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor // Me hace evitar escribir el ctor
@EnableScheduling
public class MedicoService {
    private final MedicoRepository medicoRepository;
    private final TurnoRepository turnoRepository;

    @Scheduled(cron = "0 0 7 * * ?")
    public void avisoDiario(){
        StringBuilder bodyTurnos = new StringBuilder();
        List<Medico> medicos = medicoRepository.findAll();
        System.out.println("medicos: " + medicos.toString());
        for(Medico m: medicos){
            List<Turno> turnosPorMedico = this.turnoRepository.getTurnosOcupadosHoyDadoMedico(m.getIdUsuario());
            System.out.println("turnos de" + m.getIdUsuario() + " : " + turnosPorMedico.toString());
            Collections.sort(turnosPorMedico);
            for(Turno t: turnosPorMedico){
                String apellido = t.getPaciente().getApellido();
                String nombre = t.getPaciente().getNombre();
                bodyTurnos.append("Turno de ");
                bodyTurnos.append(apellido);
                bodyTurnos.append(" ");
                bodyTurnos.append(nombre);
                bodyTurnos.append(" a las ");
                bodyTurnos.append(t.getDate().getHours());
                bodyTurnos.append("hs");
                bodyTurnos.append("\n");
            }
            if(bodyTurnos.isEmpty()){
                bodyTurnos.append("No tienes turnos para hoy");
            }
            SendEmail email = new SendEmail(m.getEmail(), "Recordatorio de tus turnos",bodyTurnos.toString());
            bodyTurnos.setLength(0);
        }

    }

    /*
        ESTE METODO LO HICE PARA MOSTRARLO EN LA PRESENTACION, PARA QUE SE EJECUTE CUANDO HAGO UN GET
     */
    public void avisoDiarioPrueba(){
        StringBuilder bodyTurnos = new StringBuilder();
        List<Medico> medicos = medicoRepository.findAll();
        System.out.println("medicos: " + medicos.toString());
        for(Medico m: medicos){
            List<Turno> turnosPorMedico = this.turnoRepository.getTurnosOcupadosHoyDadoMedico(m.getIdUsuario());
            System.out.println("turnos de" + m.getIdUsuario() + " : " + turnosPorMedico.toString());
            Collections.sort(turnosPorMedico);
            for(Turno t: turnosPorMedico){
                String apellido = t.getPaciente().getApellido();
                String nombre = t.getPaciente().getNombre();
                bodyTurnos.append("Turno de ");
                bodyTurnos.append(apellido);
                bodyTurnos.append(" ");
                bodyTurnos.append(nombre);
                bodyTurnos.append(" a las ");
                bodyTurnos.append(t.getDate().getHours());
                bodyTurnos.append("hs");
                bodyTurnos.append("\n");
            }
            if(bodyTurnos.isEmpty()){
                bodyTurnos.append("No tienes turnos para hoy");
            }
            SendEmail email = new SendEmail(m.getEmail(), "Recordatorio de tus turnos",bodyTurnos.toString());
            bodyTurnos.setLength(0);
        }

    }


}
