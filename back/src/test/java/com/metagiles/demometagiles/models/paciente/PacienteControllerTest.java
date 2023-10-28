package com.metagiles.demometagiles.models.paciente;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.metagiles.demometagiles.models.repository.TurnoRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@DisplayName(">>> PacienteController <<<")
public class PacienteControllerTest {

    @InjectMocks
    private PacienteController pacienteController;

    @Mock
    private PacienteRepository pacienteRepository;

    @Mock
    private TurnoRepository turnoRepository; //Agregado sin saber lo que estoy haciendo: chequear. @Mauro.

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        //modificado para que se vaya el error del ctor de Paciente que tuvimos que modificar en la integracion con Turnos: chequear. @Mauro
        pacienteController = new PacienteController(turnoRepository, pacienteRepository); 
    }

    @Test
    @DisplayName("Se simula el caso en el que se solicitan todos los pacientes")
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
    @DisplayName("Verifica que se pueda crear un paciente con éxito")
    public void testCreatePacienteSuccess() {
        // Simula el comportamiento de pacienteRepository.existsBydni()
        when(pacienteRepository.existsBydni(Mockito.anyString())).thenReturn(false);

        // Crea una instancia de Paciente para la solicitud
        Paciente request = new Paciente();
        request.setNombre("John");
        request.setApellido("Doe");
        request.setDni("12345678");
        request.setObraSocial("ObraSocial1");

        // Simula el comportamiento de pacienteRepository.save() y retorna un Paciente guardado
        Paciente savedPaciente = new Paciente();
        when(pacienteRepository.save(any())).thenReturn(savedPaciente);

        // Llama al método createPaciente del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = pacienteController.createPaciente(request);

        // Verifica que la respuesta no sea nula y que el estado sea HttpStatus.OK
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    @DisplayName("Verifica que no se pueda crear un paciente si su dni ya existe")
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
    @DisplayName("Verifica que no se pueda crear un paciente si el dni no es correcto")
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
    @DisplayName("Verifica que no se pueda crear un paciente si se produce una excepcion")
    public void testCreatePacienteWithException() {
        // Simula una excepción en el repositorio
        when(pacienteRepository.save(any())).thenThrow(new RuntimeException("Simulated error"));

        // Crea una instancia de Paciente para la solicitud
        Paciente request = new Paciente("John", "Doe", "12345678", "paciente");
        request.setObraSocial("ObraSocial123");

        // Llama al método createPaciente del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = pacienteController.createPaciente(request);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }
}