package com.metagiles.demometagiles.models.paciente;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.metagiles.demometagiles.utils.Utils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Me hace evitar escribir el ctor
public class PacienteService {
    private final PacienteRepository pacienteRepository;
    private final PacienteMapper pacienteMapper;


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

    
}
