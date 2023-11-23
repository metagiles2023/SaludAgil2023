package com.metagiles.demometagiles.models.turno;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.metagiles.demometagiles.models.medico.Medico;
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

    public ResponseEntity<?> postReservarTurno(Map<String,String> request){
        try{
            Turno turno = this.turnoRepository.getReferenceById(Long.valueOf(request.get("id")));
            turno.setOcupado(true);
            Paciente paciente = this.pacienteRepository.getReferenceById(Long.valueOf(request.get("idUsuario")));
            turno.setPaciente(paciente);
            this.turnoRepository.save(turno);
            System.out.println("EXITO al crear turno");
            String emailReceiver = request.get("email");
            String body = "Se ha confirmado el turno para la siguiente fecha: " + turno.getDate().toString() + " con el medico: " + turno.getMedico().getApellido() + " " + turno.getMedico().getNombre();
            SendEmail email = new SendEmail(emailReceiver,"Confirmacion de turno",body);
            return ResponseEntity.ok(Utils.jsonificar("successful", "no message"));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error al reservar turno: " + e.getMessage());
            return Utils.genResponseError("Error al reservar turno: " + e.getMessage());
        }

    }
    
    public List<Turno> getTurnosMedicoDisponiblesByDiaByMes(String dia, String mes, String IdMedico){
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
    }

    public List<Turno> getTurnosMedicoByDiaByMes(String dia, String mes, String IdMedico){
        System.out.println("b");
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
        System.out.println("a");
        List<Turno> turnos = this.turnoRepository.getTurnosMedicoByDiaByMes(aux_id,aux_dia,aux_mes);
        System.out.println(turnos);
        return turnos;
    }

    public List<String> getTurnosByIdPaciente (String id){
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

    public ResponseEntity<?> cancelarTurnoByIdPaciente (Map<String,String> request){
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

    public void darInfoTurno (String pid, String mail, String nrotelefono) throws Exception {
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

    @PostMapping("/agregarTurno")
    public ResponseEntity<?> agregarTurno(@RequestBody Turno request) {
        System.out.println("Creando turno");
        try {
            Turno turno = new Turno();
            if (turnoRepository.existsById(request.getId()))
                return Utils.genResponseError("Error al crear el turno: ya existe en la tabla.");
            
            List<Turno> turnos = turnoRepository.getTurnosDisponiblesMedicoByDiaByMes(request.getMedico().getIdUsuario(), request.getDate().getDate(), request.getDate().getMonth());

            for(Turno t: turnos){
                if(t.getDate().getHours() == request.getDate().getHours() && t.getDate().getMinutes() == request.getDate().getMinutes())
                    return Utils.genResponseError("Error al crear el turno: ya existe un turno de ese medico en esa fecha");
            }

            // Setea las propiedades de la request
            turno.setDate(request.getDate());
            turno.setMedico(request.getMedico());
            turno.setOcupado(false);
            turno.setPaciente(null);
            
            // Agregar Turno al repositorio
            Turno savedTurno = turnoRepository.save(turno);
            return ResponseEntity.ok(Utils.jsonificar("id", savedTurno.getId()));
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
