package com.metagiles.demometagiles.models.paciente;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PacienteController {
    private final PacienteService pacienteService;
    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping("/paciente")
    public List<Paciente> findAllPacientes() {
        return pacienteService.findAllPacientes();
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
     * Retorna un JSON con el id del usuario agregado. {"id": 2}
     */
    @PostMapping("/paciente")
    public ResponseEntity<?> createPaciente(@RequestBody Paciente request) {
        return pacienteService.createPaciente(request);
    }

    

    //Cosas de Turnos que quizas puedan ir en un TurnoController pero que por ahora dejamos aca

    // @PostMapping(value = "/reservar/turno")
    // public ResponseEntity<?> postReservarTurno(@RequestBody Map<String,String> request){
    //     try{
    //         Turno turno = this.tRepository.getReferenceById(Long.valueOf(request.get("id")));
    //         turno.setOcupado(true);
    //         Paciente paciente = this.repository.getReferenceById(Long.valueOf(request.get("idUsuario")));
    //         turno.setPaciente(paciente);
    //         this.tRepository.save(turno);
    //         return ResponseEntity.ok("succesful:");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("err");
    //     }

    // };

    // //devuelve un mapa donde la key es el id del turno y el value es la fecha
    // @GetMapping(value = "/turnosByMedico")
    // public List<Turno> getTurnosMedicoByDiaByMes(@RequestParam(name = "dia") String dia,@RequestParam(name = "mes") String mes ,@RequestParam(name = "id") String IdMedico){
    //     System.out.println("GET: /turnos/{dia}/{IdMedico}" + " dia: " + dia + " medico: " + IdMedico + "mes " + mes );
    //     int aux_mes;
    //     long aux_id;
    //     int aux_dia;
    //     try {
    //         aux_id = Long.parseLong(IdMedico);
    //         aux_dia = Integer.parseInt(dia);
    //         aux_mes = Integer.parseInt(mes);
    //     } catch (NumberFormatException e) {
    //         System.err.println("ID erroneo: no se pudo parsear");
    //         return null;
    //     }

    //     List<Turno> turnos = this.tRepository.getTurnosDisponiblesMedicoByDiaByMes(aux_id,aux_dia,aux_mes);
    //     System.out.println(turnos);
    //     return turnos;

    // };
    // //devuelve los turnos de un paciente en base a su id
    // //Devuelve un mapa con todos los turnos en el siguiente formato
    // // idTurno-idPaciente-idMedico-Date
    // @GetMapping(value = "/misturnos/{id}")
    // public List<String> getTurnosByIdPaciente (@PathVariable String id){
    //     List<String> output = new ArrayList<String>();
    //     long aux_id;
    //     try {
    //         aux_id = Long.parseLong(id);
    //     } catch (NumberFormatException e) {
    //         System.err.println("ID erroneo: no se pudo parsear");
    //         return output;
    //     }

    //     Optional<List<Turno>> turnos = Optional.ofNullable(tRepository.getTurnosByIdPaciente(aux_id));

    //     for (int i = 0; i < turnos.get().size(); i++) {
    //         Turno aux = turnos.get().get(i);
    //         output.add(aux.getId() + ":" + aux.getMedico().getNombre() + " " + aux.getMedico().getApellido() + ":" + aux.getMedico().getEspecialidad() + ":" + aux.getDate());
    //     }

    //     return output;


    // }

    // @PostMapping(value = "/misturnos/cancelar")
    // public ResponseEntity<?> cancelarTurnoByIdPaciente (@RequestBody Map<String,String> request){
    //     System.out.println(request.toString());


    //     try {
    //         Long aux_tid = Long.valueOf(request.get("tid"));
    //         Long aux_pid = Long.valueOf(request.get("pid"));
    //         Turno turno = this.tRepository.getTurnoByIdByIdUsuario(aux_tid,aux_pid);
    //         turno.setOcupado(false);
    //         turno.setPaciente(null);
    //         this.tRepository.save(turno);
    //         return ResponseEntity.ok(null);
    //     } catch (NumberFormatException e) {
    //         HashMap<String, String> json = new HashMap<>();
    //         json.put("error", "Error al cancelar turno");
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);

    //     }


    // }

    // @GetMapping(value = "/reservarturnos/{pid}/{mail}/{nrotelefono}")
    // public void darInfoTurno (@PathVariable String pid, @PathVariable String mail, @PathVariable String nrotelefono) throws
    //         Exception {
    //     long aux_pid;
    //     try {
    //         aux_pid = Long.parseLong(pid);
    //     } catch (NumberFormatException e) {
    //         System.err.println("ID erroneo");
    //     }
    //     long aux_long;
    //     try {
    //         aux_long = Long.valueOf(nrotelefono);
    //     } catch (NumberFormatException e) {
    //         System.err.println("Nro de telefono erroneo");
    //     }
    //     try {
    //         if (nrotelefono.length() != 10)
    //             throw new Exception("El número debe tener 10 dígitos");
    //     } catch (NumberFormatException e) {
    //         System.out.println(e.getMessage());
    //     }

    // }
}
//