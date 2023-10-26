package com.metagiles.demometagiles.models.paciente;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
//import static org.mockito.junit.MockitoJUnitRunner.*;

import java.util.ArrayList;
import java.util.List;

public class PacienteControllerTest {

    @InjectMocks
    private PacienteController pacienteController;

    @Mock
    private PacienteRepository pacienteRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        pacienteController = new PacienteController(pacienteRepository);
    }

    @Test
    public void testGetAll() {
        // Simula el comportamiento de pacienteRepository.findAll()
        List<Paciente> pacientes = new ArrayList<>();
        pacientes.add(new Paciente());
        when(pacienteRepository.findAll()).thenReturn(pacientes);

        // Llama al método getAll del controlador y verifica la respuesta
        List<Paciente> result = pacienteController.getAll();
        assertEquals(pacientes, result);
    }

    @Test
    public void testCreatePaciente() {
        // Simula el comportamiento de pacienteRepository.existsBydni()
        when(pacienteRepository.existsBydni(Mockito.anyString())).thenReturn(false);

        // Crea una instancia de Paciente para la solicitud
        Paciente request = new Paciente("John", "Doe", "12345678", "paciente");
        request.setObraSocial("ObraSocial123");

        // Llama al método createPaciente del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = pacienteController.createPaciente(request);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testCreatePacienteWhenDniExists() {
        // Simula el comportamiento de pacienteRepository.existsBydni() cuando el DNI ya existe
        when(pacienteRepository.existsBydni(Mockito.anyString())).thenReturn(true);

        // Crea una instancia de Paciente para la solicitud
        Paciente request = new Paciente("John", "Doe", "12345678", "paciente");
        request.setObraSocial("ObraSocial123");

        // Llama al método createPaciente del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = pacienteController.createPaciente(request);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    public void testCreatePacienteWithInvalidDni() {
        // Simula el comportamiento de pacienteRepository.existsBydni()
        when(pacienteRepository.existsBydni(Mockito.anyString())).thenReturn(false);

        // Crea una instancia de Paciente para la solicitud con un DNI inválido
        Paciente request = new Paciente("John", "Doe", "12345", "paciente");
        request.setObraSocial("ObraSocial123");

        // Llama al método createPaciente del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = pacienteController.createPaciente(request);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    public void testCreatePacienteWithException() {
        // Simula una excepción en el repositorio
        when(pacienteRepository.save(Mockito.any())).thenThrow(new RuntimeException("Simulated error"));

        // Crea una instancia de Paciente para la solicitud
        Paciente request = new Paciente("John", "Doe", "12345678", "paciente");
        request.setObraSocial("ObraSocial123");

        // Llama al método createPaciente del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = pacienteController.createPaciente(request);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }
}