package com.metagiles.demometagiles.models.paciente;

import java.util.ArrayList;
import java.util.List;

import com.metagiles.demometagiles.models.turno.TurnoRepository;
import com.metagiles.demometagiles.utils.Utils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@DisplayName(">>> PacienteService <<<")
public class PacienteServiceTest {

    @InjectMocks
    private PacienteService pacienteService;

    @Mock
    private PacienteRepository pacienteRepository;

    @Mock
    private PacienteMapper pacienteMapper;

    @Mock //esto hay que sacarlo despues
    private TurnoRepository turnoRepository; //Agregado sin saber lo que estoy haciendo: chequear. @Mauro.

    @Mock
    private Utils utils;

    private Paciente pacientePrueba;

    private List<Paciente> listaPacientes;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        //aca habria que sacar despues el de turnoRepository
        pacienteService = new PacienteService(pacienteRepository,pacienteMapper); 
        pacientePrueba = new Paciente("nombre","apellido","1234567","paciente");
        pacientePrueba.setObraSocial("ObraSocial1");
        listaPacientes =  new ArrayList<>();
        listaPacientes.add(pacientePrueba);
                System.out.println(pacientePrueba == null);

    }

    @Test
    @DisplayName("Se simula el caso en el que se solicitan todos los pacientes")
    public void testFindAllPacientes() {
        // Simula el comportamiento de pacienteRepository.findAll()    
        when(pacienteRepository.findAll()).thenReturn(listaPacientes);

        // Llama al método findAll del controlador y verifica la respuesta
        List<Paciente> result = pacienteService.findAllPacientes();
        assertEquals(listaPacientes, result);
    }

    @Test
    @DisplayName("Verifica que se pueda crear un paciente con éxito")
    public void testCreatePacienteSuccess() 
    {
        // Simula el comportamiento de pacienteRepository.existsBydni()
        when(pacienteRepository.existsBydni(pacientePrueba.getDni())).thenReturn(false);

        // Llama al método createPaciente del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = pacienteService.createPaciente(pacientePrueba);

        // Verifica que la respuesta no sea nula y que el estado sea HttpStatus.OK
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    @DisplayName("Verifica que no se pueda crear un paciente si su dni ya existe")
    public void testCreatePacienteWhenDniExists() {
        // Simula el comportamiento de pacienteRepository.existsBydni() cuando el DNI ya existe
        when(pacienteRepository.existsBydni(Mockito.anyString())).thenReturn(true);

        // Llama al método createPaciente del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = pacienteService.createPaciente(pacientePrueba);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    @DisplayName("Verifica que no se pueda crear un paciente si el dni no es correcto")
    public void testCreatePacienteWithInvalidDni() {
        // Simula el comportamiento de pacienteRepository.existsBydni()
        pacientePrueba.setDni("12345");
        when(pacienteRepository.existsBydni(Mockito.anyString())).thenReturn(false);

        // Llama al método createPaciente del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = pacienteService.createPaciente(pacientePrueba);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    @DisplayName("Verifica que no se pueda crear un paciente si se produce una excepcion")
    public void testCreatePacienteWithException() {
        // Simula una excepción en el repositorio
        when(pacienteRepository.save(any())).thenThrow(new RuntimeException("Simulated error"));

        // Llama al método createPaciente del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = pacienteService.createPaciente(pacientePrueba);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }
}
