package com.metagiles.demometagiles.models.fichamedica;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.metagiles.demometagiles.models.medico.MedicoRepository;
import com.metagiles.demometagiles.models.paciente.PacienteRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@DisplayName(">>> FichaMedicaController <<<")
public class FichaMedicaControllerTest {

    @InjectMocks
    private FichaMedicaController fichaMedicaController;

    @Mock
    private FichaMedicaRepository fichaMedicaRepository;

    @Mock
    private MedicoRepository medicoRepository;

    @Mock
    private PacienteRepository pacienteRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        fichaMedicaController = new FichaMedicaController(fichaMedicaRepository, medicoRepository, pacienteRepository);
    }

    @Test
    @DisplayName("Se simula el caso en el que se solicitan todas las fichas médicas")
    public void testGetAll() {
        // Simula el comportamiento de fichaMedicaRepository.findAll()
        List<FichaMedica> fichasMedicas = new ArrayList<>();
        fichasMedicas.add(new FichaMedica());
        when(fichaMedicaRepository.findAll()).thenReturn(fichasMedicas);

        // Llama al método getAll del controlador y verifica la respuesta
        List<FichaMedica> result = fichaMedicaController.getAll(null); // Supongamos que no se aplica ningún filtro
        assertEquals(fichasMedicas, result);
    }

    @Test
    @DisplayName("Verifica que se pueda crear una ficha médica con éxito")
    public void testCreateFichaMedica() {
        // Simula el comportamiento de medicoRepository.existsById() y pacienteRepository.existsById()
        when(medicoRepository.existsById(Mockito.anyLong())).thenReturn(true);
        when(pacienteRepository.existsById(Mockito.anyLong())).thenReturn(true);

        // Crea una instancia de FichaMedica para la solicitud
        FichaMedica request = new FichaMedica();
        request.setMedico(1L); // Supongamos que existe un médico con ID 1
        request.setPaciente(2L); // Supongamos que existe un paciente con ID 2

        // Simula el comportamiento de fichaMedicaRepository.save() y retorna una FichaMedica guardada
        FichaMedica savedFichaMedica = new FichaMedica();
        when(fichaMedicaRepository.save(any())).thenReturn(savedFichaMedica);

        // Llama al método crearFichaMedica del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = fichaMedicaController.crearFichaMedica(request);

        // Verifica que la respuesta no sea nula y que el estado sea HttpStatus.OK
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }


    @Test
    @DisplayName("Verifica que no se pueda crear una ficha médica si el médico no existe")
    public void testCreateFichaMedicaWithNonExistentMedico() {
        // Simula el comportamiento de medicoRepository.existsById() que indica que el médico no existe
        when(medicoRepository.existsById(Mockito.anyLong())).thenReturn(false);

        // Crea una instancia de FichaMedica para la solicitud
        FichaMedica request = new FichaMedica();
        request.setMedico(1L); // Supongamos que no existe un médico con ID 1

        // Llama al método crearFichaMedica del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = fichaMedicaController.crearFichaMedica(request);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    @DisplayName("Verifica que no se pueda crear una ficha médica si el paciente no existe")
    public void testCreateFichaMedicaWithNonExistentPaciente() {
        // Simula el comportamiento de medicoRepository.existsById() que indica que el paciente no existe
        when(medicoRepository.existsById(Mockito.anyLong())).thenReturn(true);
        when(pacienteRepository.existsById(Mockito.anyLong())).thenReturn(false);

        // Crea una instancia de FichaMedica para la solicitud
        FichaMedica request = new FichaMedica();
        request.setMedico(1L); // Supongamos que existe un médico con ID 1
        request.setPaciente(2L); // Supongamos que no existe un paciente con ID 2

        // Llama al método crearFichaMedica del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = fichaMedicaController.crearFichaMedica(request);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }
}
