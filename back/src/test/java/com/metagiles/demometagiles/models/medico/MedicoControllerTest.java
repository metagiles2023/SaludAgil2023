package com.metagiles.demometagiles.models.medico;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.metagiles.demometagiles.models.sesion.SessionCacheService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@DisplayName(">>> MedicoController <<<")
public class MedicoControllerTest {

    @InjectMocks
    private MedicoController medicoController;

    @Mock
    private MedicoRepository medicoRepository;

    @Mock
    private SessionCacheService sessionCacheService;
    /*
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        medicoController = new MedicoController(medicoRepository, sessionCacheService);
    }
    */
    // @Test
    // @DisplayName("Se simula el caso en el que se solicitan todos los médicos")
    // public void testGetAll() {
    //     // Simula el comportamiento de medicoRepository.findAll()
    //     List<Medico> medicos = new ArrayList<>();
    //     medicos.add(new Medico());
    //     when(medicoRepository.findAll()).thenReturn(medicos);

    //     // Llama al método getAll del controlador y verifica la respuesta
    //     List<Medico> result = medicoController.getAll();
    //     assertEquals(medicos, result);
    // }

    // @Test
    // @DisplayName("Verifica que no se pueda crear un médico si su dni ya existe")
    // public void testCreateMedicoWhenDniExists() {
    //     // Simula el comportamiento de medicoRepository.existsBydni() cuando el DNI ya existe
    //     when(medicoRepository.existsBydni(Mockito.anyString())).thenReturn(true);

    //     // Crea una instancia de Medico para la solicitud
    //     Medico request = new Medico("nomX", "apellX", "dniX", "medico", "especialidadX");

    //     // Llama al método createMedico del controlador y verifica la respuesta
    //     ResponseEntity<?> responseEntity = medicoController.createMedico(request);
    //     assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    // }

    // @Test
    // @DisplayName("Verifica que no se pueda crear un médico si el dni no es correcto")
    // public void testCreateMedicoWithInvalidDni() {
    //     // Simula el comportamiento de medicoRepository.existsBydni()
    //     when(medicoRepository.existsBydni(Mockito.anyString())).thenReturn(false);

    //     // Crea una instancia de Medico para la solicitud con un DNI inválido
    //     Medico request = new Medico("nomX", "apellX", "dniX", "medico", "especialidadX");
    //     // Supongamos que este DNI es inválido según tu lógica de validación

    //     // Llama al método createMedico del controlador y verifica la respuesta
    //     ResponseEntity<?> responseEntity = medicoController.createMedico(request);
    //     assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    // }

    // @Test
    // @DisplayName("Verifica que no se pueda crear un médico si se produce una excepción")
    // public void testCreateMedicoWithException() {
    //     // Simula una excepción en el repositorio
    //     when(medicoRepository.save(any())).thenThrow(new RuntimeException("Simulated error"));

    //     // Crea una instancia de Medico para la solicitud
    //     Medico request = new Medico("nomX", "apellX", "dniX", "medico", "especialidadX");

    //     // Llama al método createMedico del controlador y verifica la respuesta
    //     ResponseEntity<?> responseEntity = medicoController.createMedico(request);
    //     assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    // }
}
