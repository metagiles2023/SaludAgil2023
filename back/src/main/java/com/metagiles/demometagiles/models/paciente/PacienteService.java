package com.metagiles.demometagiles.models.paciente;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.metagiles.demometagiles.models.turno.TurnoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.metagiles.demometagiles.models.turno.Turno;

import com.metagiles.demometagiles.models.sesion.Session;
import com.metagiles.demometagiles.models.sesion.SessionCacheService;
import com.metagiles.demometagiles.utils.SendEmail;
import com.metagiles.demometagiles.utils.Utils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Me hace evitar escribir el ctor
public class PacienteService {
    private final PacienteRepository pacienteRepository;
    private final PacienteMapper pacienteMapper;
    private final SessionCacheService sessionCacheService;
    private final TurnoRepository turnoRepository;

    public List<Paciente> findAllPacientes(String token) {
        Session session = sessionCacheService.getSession(token);
        if (session == null) { //significa que el login es invalido
            System.out.println("findAllPacientes: token invalido");
            return null;
        }
        if(session.getUsuario().getRol().equals("administrador") || session.getUsuario().getRol().equals("medico")){
            System.out.println("Retorno pacientes findAll");
            return pacienteRepository.findAll();
        }
        System.out.println("Retorno pacientes vacio");
        return new ArrayList<>();
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
            paciente.setEmail(request.getEmail());
            System.out.println(paciente.getEmail());
            System.out.println("creando un paciente, veo que su obra social es " + request.getObraSocial());
            // Save Paciente to the repository
            Paciente savedPaciente = pacienteRepository.save(paciente);
            return ResponseEntity.ok(pacienteMapper.pacienteToPacienteCreatedResponseDTO(savedPaciente));
        } catch(Exception e) {
            return Utils.genResponseError("Error creating Paciente: " + e.getMessage());
        }
    }

    public ResponseEntity<?> getById(Long idUsuario, String token) {
        Session session = sessionCacheService.getSession(token);
        if (session == null) { //significa que el login es invalido
            return Utils.genResponseError("Tu login es inválido.");
        }
        if(session.getUsuario().getRol().equals("paciente")){
            return Utils.genResponseError("No tienes permiso para hacer eso.");
        }
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

    // Método para simular el chequeo con la API de la facultad
    public boolean estaInscriptoEnFacultad(String dni) {
        System.out.println("me llego dni " + dni);
        List<String> listaInscritos = obtenerListaInscritosFacultad(); //Acá va el pedido a la API de la facultad

        // Verifica si el DNI está en la lista de inscritos
        return listaInscritos.contains(dni);
    }

    //Este método simula el pedido a la API de la facultad
    private List<String> obtenerListaInscritosFacultad() {
        // Aquí simulamos que la API devuelve una lista de DNIs inscritos en la facultad
        List<String> listaInscritos = new ArrayList<>();
        listaInscritos.add("41684254");
        listaInscritos.add("41666998");
        listaInscritos.add("41698231");
        listaInscritos.add("35447213");
        listaInscritos.add("20529666");
        listaInscritos.add("17018019");
        listaInscritos.add("12036630");
        listaInscritos.add("29112154");
        listaInscritos.add("31123456");
        listaInscritos.add("41666777");
        listaInscritos.add("47333222");
        listaInscritos.add("42492025");
        System.out.println("Permitimos de 35M a 45M");
        for (long i = 35000000; i < 46000000; i++) {
            listaInscritos.add(String.valueOf(i));
        }
        return listaInscritos;
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //Cosas de Turnos que quizas puedan ir en un TurnoService pero que por ahora dejamos aca



    public ResponseEntity<?> postReservarTurno(Map<String,String> request, String token){
        Session session = sessionCacheService.getSession(token);
        if (session == null) { //significa que el login es invalido
            return Utils.genResponseError("Tu login es inválido.");
        }
        try{
            Turno turno = this.turnoRepository.getReferenceById(Long.valueOf(request.get("id")));
            turno.setOcupado(true);
            Paciente paciente = this.pacienteRepository.getReferenceById(Long.valueOf(request.get("idUsuario")));
            turno.setPaciente(paciente);
            this.turnoRepository.save(turno);
            System.out.println("EXITO al crear turno");
            String emailReceiver = request.get("email");
            String body = "Se ha confirmado el turno para la siguiente fecha: " + turno.getDate().toString() + " con el medico: " + turno.getMedico().getApellido() + " " + turno.getMedico().getNombre();
            new SendEmail(emailReceiver,"Confirmacion de turno",body);
            return ResponseEntity.ok(Utils.jsonificar("successful", "no message"));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error al reservar turno: " + e.getMessage());
            return Utils.genResponseError("Error al reservar turno: " + e.getMessage());
        }

    }

    public List<Turno> getTurnosMedicoByDiaByMes(String dia, String mes, String IdMedico, String token){
        Session session = sessionCacheService.getSession(token);
        if (session == null) { //significa que el login es invalido
            return null;
        }
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
            new SendEmail(emailPaciente,"Recordatorio de turno",body);

        }
    }
}


