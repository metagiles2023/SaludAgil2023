package com.metagiles.demometagiles.models.fichamedica;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.metagiles.demometagiles.models.Filtro.Filtro;
import com.metagiles.demometagiles.models.Filtro.FiltroAND;
import com.metagiles.demometagiles.models.Filtro.FiltroEmergencia;
import com.metagiles.demometagiles.models.Filtro.FiltroFechaDesde;
import com.metagiles.demometagiles.models.Filtro.FiltroFechaHasta;
import com.metagiles.demometagiles.models.Filtro.FiltroRequest;
import com.metagiles.demometagiles.models.Filtro.FiltroGrave;
import com.metagiles.demometagiles.models.Filtro.FiltroMedico;
import com.metagiles.demometagiles.models.Filtro.FiltroPaciente;
import com.metagiles.demometagiles.models.medico.MedicoRepository;
import com.metagiles.demometagiles.models.paciente.PacienteRepository;

@RestController
public class FichaMedicaController {
    private final FichaMedicaRepository repository;
    private final MedicoRepository mRepository;
    private final PacienteRepository pRepository;

    public FichaMedicaController(FichaMedicaRepository repository, MedicoRepository mRepository, PacienteRepository pRepository) {
        this.repository = repository;
        this.mRepository = mRepository;
        this.pRepository = pRepository;
    }

    @PostMapping("/ficha-medica/getAll")
    public List<FichaMedica> getAll(@RequestBody FiltroRequest fRequest) {
        System.out.println("getting fichas medicas");
        List<FichaMedica> fichas = null;
        try {
            fichas = repository.findAll();
            fichas = filtrarFichas(fichas, fRequest);
            System.out.println("fichas length " + fichas.size());
            return fichas;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return fichas;
        }
    }

    // @GetMapping("/ficha-medica/get")
    // public List<FichaMedica> getOne(@RequestParam String pacienteId) {
    //     System.out.println("getting ficha medica");
    //     return repository.findAll();
    // }
    
    /*
     * Necesita un JSON en el body de esta manera:
     * {
        "medico": "...", //id
        "paciente": "...", //id
        "date": "...", //ISO 8601 -> Ejemplo: "date": "2023-10-26T10:00:00"
        "diagnostico": "dniX",
        "esGrave": bool.
        "usoEmergencia": bool
      }
     *  Y los headers deben tener Content-Type = application/json como cualquier POST.
     * 
     * Retorna un JSON con el id del usuario agregado.
     */
    @PostMapping("/ficha-medica/create")
    public ResponseEntity<?> crearFichaMedica(@RequestBody FichaMedica request) {
        try {
            if (!mRepository.existsById(request.getMedico())) {
                throw new Exception("Medico no existe.");
            }
            if (!pRepository.existsById(request.getPaciente())) {
                throw new Exception("Paciente no existe.");
            }
            
            // Parse JSON request data into a FichaMedica object
            FichaMedica fichaMedica = new FichaMedica();
            
            // Set properties from the request
            fichaMedica.setMedico(request.getMedico());
            fichaMedica.setPaciente(request.getPaciente());
            fichaMedica.setDate(request.getDate());
            fichaMedica.setDiagnostico(request.getDiagnostico());
            fichaMedica.setEsGrave(request.isEsGrave());
            fichaMedica.setUsoEmergencia(request.isUsoEmergencia());
            
            // Save the FichaMedica to the repository
            FichaMedica savedFicha = repository.save(fichaMedica);
            return ResponseEntity.ok(savedFicha.getIdFichaMedica());
        } catch(Exception e) {
            System.out.println("Error creating FichaMedica: "  + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating FichaMedica: "  + e.getMessage());
        }
    }

    public List<FichaMedica> filtrarFichas(List<FichaMedica> fichas, FiltroRequest fRequest){
        Filtro filtroGeneral = null;
        List<FichaMedica> filteredFichas = new ArrayList<>();

        //Preparacion del filtroGeneral
        if (fRequest.getFechaDesde() != null && fRequest.getFechaHasta() != null){
            //devolver entre ambos
            FiltroFechaDesde fDesde = new FiltroFechaDesde(fRequest.getFechaDesde());
            FiltroFechaHasta fHasta = new FiltroFechaHasta(fRequest.getFechaHasta());
            filtroGeneral = new FiltroAND(fDesde, fHasta); //Sin ternaria porque es el primero
        }
        if (fRequest.getFechaDesde() == null && fRequest.getFechaHasta() != null) {
            FiltroFechaHasta fHasta = new FiltroFechaHasta(fRequest.getFechaHasta());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fHasta) : fHasta;
        }
        if (fRequest.getFechaDesde() != null && fRequest.getFechaHasta() == null) {
            FiltroFechaDesde fDesde = new FiltroFechaDesde(fRequest.getFechaDesde());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fDesde) : fDesde;
        }
        if (fRequest.getFiltraEmergencia()!= null) {
            FiltroEmergencia fEmergencia = new FiltroEmergencia(fRequest.getFiltraEmergencia());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fEmergencia) : fEmergencia;
        }
        if (fRequest.getFiltraGrave()!= null) {
            FiltroGrave fGrave = new FiltroGrave(fRequest.getFiltraGrave());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fGrave) : fGrave;
        }
        if (fRequest.getMedico() != null) {
            FiltroMedico fMedico = new FiltroMedico(fRequest.getMedico());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fMedico) : fMedico;
        }
        if (fRequest.getPaciente() != null) {
            FiltroPaciente fPaciente = new FiltroPaciente(fRequest.getPaciente());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fPaciente) : fPaciente;
        }
        //Filtrado
        if (filtroGeneral != null) {
            for (FichaMedica ficha : fichas) {
                if (filtroGeneral.cumple(ficha)) {
                    filteredFichas.add(ficha); 
                }
            }
        } else return fichas;
        return filteredFichas;
    }
}
