package com.metagiles.demometagiles.models.fichamedica;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/ficha-medica/getAll")
    public List<FichaMedica> getAll() {
        System.out.println("getting las fichas medicas");
        return repository.findAll();
    }

    @PostMapping("/ficha-medica/create")
    public ResponseEntity<?> crearFichaMedica(@RequestBody FichaMedica request) {
        try {
            if (!mRepository.existsById(request.getMedico().getIdUsuario())) {
                throw new Exception("Medico no existe.");
            }
            if (!pRepository.existsById(request.getPaciente().getIdUsuario())) {
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
            return ResponseEntity.ok(savedFicha);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating FichaMedica");
        }
    }
}
