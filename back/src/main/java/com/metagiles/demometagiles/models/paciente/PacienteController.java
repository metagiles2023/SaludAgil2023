package com.metagiles.demometagiles.models.paciente;

import java.util.*;

import com.metagiles.demometagiles.utils.SendEmail;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.metagiles.demometagiles.models.entity.Turno;
import com.metagiles.demometagiles.models.repository.TurnoRepository;
import com.metagiles.demometagiles.utils.Utils;

@Component
@EnableScheduling
@RestController
public class PacienteController {
    private final PacienteRepository repository;
    private final TurnoRepository tRepository;
    public PacienteController(TurnoRepository turnoRepository, PacienteRepository repository) {
        this.repository = repository;
        this.tRepository = turnoRepository;
    }

    @GetMapping("/paciente/getAll")
    public List<Paciente> getAll() {
        return repository.findAll();
    }
    
    /*
     * Necesita un JSON en el body de esta manera:
     * {
        "apellido": "apellX",
        "nombre": "nomX",
        "dni": "dniX",
        "obraSocial": "obraX"
      }
     *  Y los headers deben tener Content-Type = application/json como cualquier POST.
     * 
     * Retorna un JSON con el id del usuario agregado.
     */
    @PostMapping("/paciente/create")
    public ResponseEntity<?> createPaciente(@RequestBody Paciente request) {
        System.out.println("Creando paciente");
        try {
            // Parse JSON request data into a Paciente object
            Paciente paciente = new Paciente();
            System.out.println(request.getObraSocial());
            if (repository.existsBydni(request.getDni())) 
                return genResponseError("Error creating Paciente: ya existe en la tabla.");
            
            // Set properties from the request
            paciente.setApellido(request.getApellido());
            paciente.setNombre(request.getNombre());
            if (!Utils.esDniValido(request.getDni())) 
                return genResponseError("DNI Inputted invalido: " + request.getDni());
            
            paciente.setDni(request.getDni());
            paciente.setRol("paciente");
            paciente.setObraSocial(request.getObraSocial()); //Falta que obra social sea una lista en vez de un String
            System.out.println("creando un paciente, veo que su obra social es " + request.getObraSocial());
            // Save Paciente to the repository
            Paciente savedPaciente = repository.save(paciente);
            return ResponseEntity.ok(Utils.jsonificar("id", savedPaciente.getIdUsuario()));
        } catch(Exception e) {
            return genResponseError("Error creating Paciente: " + e.getMessage());
        }
    }

    private ResponseEntity<HashMap<String, String>> genResponseError(String texto) {
        System.out.println(HttpStatus.BAD_REQUEST + texto);
        HashMap<String, String> json = Utils.jsonificar("error", texto);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
    }


    //Cosas de Turnos que quizas puedan ir en un TurnoController pero que por ahora dejamos aca

    @PostMapping(value = "/reservar/turno")
    public ResponseEntity<?> postReservarTurno(@RequestBody Map<String,String> request){
        try{
            System.out.println(request.toString());
            Turno turno = this.tRepository.getReferenceById(Long.valueOf(request.get("id")));
            turno.setOcupado(true);
            Paciente paciente = this.repository.getReferenceById(Long.valueOf(request.get("idUsuario")));
            turno.setPaciente(paciente);
            Turno turnoReservado = this.tRepository.save(turno);
            String emailReceiver = request.get("email");
            String body = "Se ha confirmado el turno para la siguiente fecha: " + turno.getDate().toString() + " con el medico: " + turno.getMedico().getApellido() + " " + turno.getMedico().getNombre();
            SendEmail email = new SendEmail(emailReceiver,"Confirmacion de turno",body);
            return ResponseEntity.ok(Utils.jsonificar("id", turnoReservado.getId()));
        } catch (Exception e) {
            return genResponseError("Error al reservar turno: " + e.getMessage());
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
        List<Turno> turnos = this.tRepository.getTurnosDisponiblesMedicoByDiaByMes(aux_id,aux_dia,aux_mes);

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

        Optional<List<Turno>> turnos = Optional.ofNullable(tRepository.getTurnosByIdPaciente(aux_id));

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
            Turno turno = this.tRepository.getTurnoByIdByIdUsuario(aux_tid,aux_pid);
            turno.setOcupado(false);
            turno.setPaciente(null);
            this.tRepository.save(turno);
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

    @Scheduled(cron = "0 0 7 * * ?") //Chequea una vez al dia a las 7 horas y manda todos los recordatorios de los turnos ocupados de ese dia
    public void recordatorioDiario(){

        List<Turno> turnos = this.tRepository.getTurnosOcupadosHoy();
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
//