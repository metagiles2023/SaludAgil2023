package com.metagiles.demometagiles.models.turno;

import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.metagiles.demometagiles.models.medico.Medico;
import com.metagiles.demometagiles.models.medico.MedicoRepository;
import com.metagiles.demometagiles.models.paciente.Paciente;
import com.metagiles.demometagiles.models.paciente.PacienteRepository;
import com.metagiles.demometagiles.models.usuario.UsuarioController;
import com.metagiles.demometagiles.utils.SendEmail;
import com.metagiles.demometagiles.utils.Utils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Me hace evitar escribir el ctor
public class TurnoService {
    private final PacienteRepository pacienteRepository;
    private final TurnoRepository turnoRepository;
    private final MedicoRepository medicoRepository;

    public ResponseEntity<?> postReservarTurno(Map<String,String> request){
        try{
            Turno turno = this.turnoRepository.getReferenceById(Long.valueOf(request.get("id")));
            turno.setOcupado(true);
            Paciente paciente = this.pacienteRepository.getReferenceById(Long.valueOf(request.get("idUsuario")));
            turno.setPaciente(paciente);
            this.turnoRepository.save(turno);
            String emailReceiver = request.get("email");
            String body = "Se ha confirmado el turno para la siguiente fecha: " + turno.getDate().toString() + " con el medico: " + turno.getMedico().getApellido() + " " + turno.getMedico().getNombre();
            SendEmail email = new SendEmail(emailReceiver,"Confirmacion de turno",body);
            return ResponseEntity.ok(Utils.jsonificar("successful", "no message"));
        } catch (Exception e) {
            e.printStackTrace();
            return Utils.genResponseError("Error al reservar turno: " + e.getMessage());
        }

    }
    
    public List<Turno> getTurnosMedicoDisponiblesByDiaByMes(String dia, String mes, String IdMedico){
        int aux_mes;
        long aux_id;
        int aux_dia;
        try {
            aux_id = Long.parseLong(IdMedico);
            aux_dia = Integer.parseInt(dia);
            aux_mes = Integer.parseInt(mes);
        } catch (NumberFormatException e) {
            return null;
        }

        List<Turno> turnos = this.turnoRepository.getTurnosDisponiblesMedicoByDiaByMes(aux_id,aux_dia,aux_mes);
        return turnos;
    }

    public List<Turno> getTurnosMedicoByDiaByMes(String dia, String mes, String IdMedico){
        int aux_mes;
        long aux_id;
        int aux_dia;
        try {
            aux_id = Long.parseLong(IdMedico);
            aux_dia = Integer.parseInt(dia);
            aux_mes = Integer.parseInt(mes);
        } catch (NumberFormatException e) {
            return null;
        }
        List<Turno> turnos = this.turnoRepository.getTurnosMedicoByDiaByMes(aux_id,aux_dia,aux_mes);
        return turnos;
    }

    public List<String> getTurnosByIdPaciente (String id){
        List<String> output = new ArrayList<String>();
        long aux_id;
        try {
            aux_id = Long.parseLong(id);
        } catch (NumberFormatException e) {
            return output;
        }

        Optional<List<Turno>> turnos = Optional.ofNullable(turnoRepository.getTurnosByIdPaciente(aux_id));

        for (int i = 0; i < turnos.get().size(); i++) {
            Turno aux = turnos.get().get(i);
            output.add(aux.getId() + ":" + aux.getMedico().getNombre() + " " + aux.getMedico().getApellido() + ":" + aux.getMedico().getEspecialidad() + ":" + aux.getDate());
        }

        return output;
    }

    public ResponseEntity<?> cancelarTurnoByIdPaciente (Map<String,String> request){
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

    public void darInfoTurno (String pid, String mail, String nrotelefono) throws Exception {
        long aux_pid;
        try {
            aux_pid = Long.parseLong(pid);
        } catch (NumberFormatException e) {
        }
        long aux_long;
        try {
            aux_long = Long.valueOf(nrotelefono);
        } catch (NumberFormatException e) {
        }
        try {
            if (nrotelefono.length() != 10)
                throw new Exception("El número debe tener 10 dígitos");
        } catch (NumberFormatException e) {
        }
    }


    public ResponseEntity<?> agregarTurno(Map<String,String> request) {
        try {
            String anio = request.get("anio");
            String mes = request.get("mes");
            String dia = request.get("dia");
            String hora = request.get("hora"); //18:30
            String idMedico = request.get("idMedico");

            if (!medicoRepository.existsById(Long.parseLong(idMedico))) {
                return Utils.genResponseError("No se encontró el médico con ID: " + idMedico);
            }

            Medico medico = medicoRepository.findById(Long.parseLong(idMedico)).orElse(null);
            if (medico == null) {
                return Utils.genResponseError("No se encontró el médico con ID: " + idMedico);
            }

            String[] hora1 = hora.split(":");
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, Integer.parseInt(anio));
            calendar.set(Calendar.MONTH, Integer.parseInt(mes)-1);
            calendar.set(Calendar.DAY_OF_MONTH, Integer.parseInt(dia));
            calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hora1[0]));
            calendar.set(Calendar.MINUTE, Integer.parseInt(hora1[1]));
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND,0);

            Turno turno = new Turno();
            turno.setMedico(medico);
            turno.setDate(calendar.getTime());

            List<Turno> turnos = turnoRepository.getTurnosEnElHorario(Long.parseLong(idMedico), turno.getDate());
            if(turnos != null && turnos.size() == 0){
                this.turnoRepository.save(turno);
            }

            return ResponseEntity.ok("Turno creado correctamente");
        } catch(Exception e) {
            return Utils.genResponseError("Error al crear turno: " + e.getMessage());
        }
    }

    public ResponseEntity<?> agregarTurnos(Map<String,String> request) {
        try { 
            String horaini = request.get("horaini");
            String horafin = request.get("horafin");
            String dia = request.get("dia");
            String idMedico = request.get("idMedico");
            String tiempoturno = request.get("tiempoturno");

            String[] hora1 = horaini.split(":");
            String[] hora2 = horafin.split(":");
            if(Integer.parseInt(hora1[0]) > Integer.parseInt(hora2[0]) || (Integer.parseInt(hora1[0]) == Integer.parseInt(hora2[0]) && Integer.parseInt(hora1[1]) >= Integer.parseInt(hora2[1]))){
                return Utils.genResponseError("El inicio de la jornada no puede ser despues del fin de la jornada");
            }
            if (!medicoRepository.existsById(Long.parseLong(idMedico))) {
                return Utils.genResponseError("No se encontró el médico con ID: " + idMedico);
            }

            Medico medico = medicoRepository.findById(Long.parseLong(idMedico)).orElse(null);
            if (medico == null) {
                return Utils.genResponseError("No se encontró el médico con ID: " + idMedico);
            }

            int tiempoTurno = Integer.parseInt(tiempoturno);
          
            
            Calendar horaFin= Calendar.getInstance();
            horaFin.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hora2[0]));
            horaFin.set(Calendar.MINUTE, Integer.parseInt(hora2[1]));
            horaFin.set(Calendar.SECOND, 0);
            horaFin.set(Calendar.MILLISECOND,0);

            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hora1[0]));
            calendar.set(Calendar.MINUTE, Integer.parseInt(hora1[1]));
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND,0);

            Calendar calendarfin = Calendar.getInstance();
            calendarfin.add(Calendar.DATE, 21); //genera a 2 semanas desde el dia que se pide generar
            
            while(calendar.getTime().getDay() != Integer.parseInt(dia)){//me paro en el siguiente dia que quiero generar
                calendar.add(Calendar.DATE, 1);
                horaFin.add(Calendar.DATE, 1);
            }
            
            while (calendar.getTime().compareTo(calendarfin.getTime()) < 0) {
                Calendar aux = (Calendar) calendar.clone();
                aux.add(Calendar.MINUTE, tiempoTurno); //si el turno que quiero generar esta dentro del rango horario lo genero, ej //son las 13:00 el turno dura 45 y la jornada termina 13:30, no tendria que generarlo
                if (aux.before(horaFin) || aux.equals(horaFin)) {
                    Turno turno = new Turno();
                    turno.setMedico(medico);
                    turno.setDate(calendar.getTime());

                    List<Turno> turnos = turnoRepository.getTurnosEnElHorario(Long.parseLong(idMedico), turno.getDate());
                    if(turnos != null && turnos.size() == 0){
                        this.turnoRepository.save(turno);
                    }

                    calendar.add(Calendar.MINUTE, tiempoTurno);
                } else {
                    calendar.add(Calendar.DATE, 7);
                    horaFin.add(Calendar.DATE, 7);
                    calendar.set(Calendar.HOUR_OF_DAY, Integer.parseInt(hora1[0]));
                    calendar.set(Calendar.MINUTE, Integer.parseInt(hora1[1]));
                    calendar.set(Calendar.SECOND, 0);
                    calendar.set(Calendar.MILLISECOND,0);

                }
            }
            
            return ResponseEntity.ok("Turnos creados correctamente");
        } catch(Exception e) {
            return Utils.genResponseError("Error al crear turno: " + e.getMessage());
        }
    }

    @Scheduled(cron = "0 0 7 * * ?") //Chequea una vez al dia a las 7 horas y manda todos los recordatorios de los turnos ocupados de ese dia
    public void recordatorioDiario(){

        List<Turno> turnos = this.turnoRepository.getTurnosOcupadosHoy();
        for(Turno t : turnos)
        {
            String emailPaciente = t.getPaciente().getEmail();
            String nombreMedico = t.getMedico().getNombre();
            String apellidoMedico = t.getMedico().getApellido();
            String horaTurno = t.getDate().toString();
            String body = "Buenos dias! \n \n Te recordamos que hoy tenes el siguiente turno: "+horaTurno+" con el medico: "+apellidoMedico+", "+nombreMedico;
            SendEmail email = new SendEmail(emailPaciente,"Recordatorio de turno",body);

        }
    }

    
}
