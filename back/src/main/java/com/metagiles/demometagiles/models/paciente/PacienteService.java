package com.metagiles.demometagiles.models.paciente;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.metagiles.demometagiles.models.entity.Turno;
import com.metagiles.demometagiles.models.repository.TurnoRepository;
import com.metagiles.demometagiles.utils.Utils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Me hace evitar escribir el ctor
public class PacienteService {
    private final PacienteRepository pacienteRepository;
    private final PacienteMapper pacienteMapper;

    // Cosas de Turnos que se tienen que ir de aca
    private final TurnoRepository turnoRepository;


    public List<Paciente> findAllPacientes() {
        return pacienteRepository.findAll();
    }

    public ResponseEntity<?> createPaciente(Paciente request) {
        System.out.println("Creando paciente");
        try {
            // Parse JSON request data into a Paciente object
            Paciente paciente = new Paciente();
            System.out.println(request.getObraSocial());
            if (pacienteRepository.existsBydni(request.getDni())) 
                return Utils.genResponseError("Error creating Paciente: ya existe en la tabla.");
            
            // Set properties from the request
            paciente.setApellido(request.getApellido());
            paciente.setNombre(request.getNombre());
            if (!Utils.esDniValido(request.getDni())) 
                return Utils.genResponseError("DNI Inputted invalido: " + request.getDni());
            
            paciente.setDni(request.getDni());
            paciente.setRol("paciente");
            paciente.setObraSocial(request.getObraSocial()); //Falta que obra social sea una lista en vez de un String
            System.out.println("creando un paciente, veo que su obra social es " + request.getObraSocial());
            // Save Paciente to the repository
            Paciente savedPaciente = pacienteRepository.save(paciente);
            return ResponseEntity.ok(pacienteMapper.pacienteToPacienteCreatedResponseDTO(savedPaciente));
        } catch(Exception e) {
            return Utils.genResponseError("Error creating Paciente: " + e.getMessage());
        }
    }

    public ResponseEntity<?> getById(Long idUsuario) {
        Paciente paciente = null;
        try {
            Optional<Paciente> pacienteOpt = pacienteRepository.findById(idUsuario);
            if (pacienteOpt.isPresent()) {
                paciente = pacienteOpt.get();
                return ResponseEntity.ok(paciente);
            } else {
                return Utils.genResponseError("No se encontro dicho paciente.");
            }
        } catch (Exception e) {
            return Utils.genResponseError("Error buscando paciente: " + e.getMessage());
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //Cosas de Turnos que quizas puedan ir en un TurnoService pero que por ahora dejamos aca



    public ResponseEntity<?> postReservarTurno(Map<String,String> request){
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

    }
    
    public List<Turno> getTurnosMedicoByDiaByMes(String dia, String mes, String IdMedico){
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
}


