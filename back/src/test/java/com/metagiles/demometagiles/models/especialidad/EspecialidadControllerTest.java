package com.metagiles.demometagiles.models.especialidad;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class EspecialidadControllerTest {

    @InjectMocks
    private EspecialidadController especialidadController;

    @Mock
    private EspecialidadRepository especialidadRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        //especialidadController = new EspecialidadController(especialidadRepository);
    }

    @Test
    @DisplayName("Se simula el caso en el que se solicitan todas las especialidades")
    public void testGetAll() {
        // Simula el comportamiento de especialidadRepository.findAll()
        List<Especialidad> especialidades = new ArrayList<>();
        especialidades.add(new Especialidad());
        when(especialidadRepository.findAll()).thenReturn(especialidades);

        // Llama al método getAll del controlador y verifica la respuesta
        //List<Especialidad> result = especialidadController.getAll();
        //assertEquals(especialidades, result);
    }

    @Test
@DisplayName("Verifica que se pueda crear una especialidad con éxito")
public void testCreateEspecialidadSuccess() {
    // Simula el comportamiento de especialidadRepository.existsBynombre()
    when(especialidadRepository.existsBynombre(Mockito.anyString())).thenReturn(false);

    // Crea una instancia de Especialidad para la solicitud
    Especialidad request = new Especialidad();
    request.setNombre("EspecialidadNueva");
    request.setDescripcion("Descripción de la especialidad");

    // Simula el comportamiento de especialidadRepository.save() y retorna una Especialidad guardada
    Especialidad savedEspecialidad = new Especialidad();
    when(especialidadRepository.save(any())).thenReturn(savedEspecialidad);

    // Llama al método crearEspecialidad del controlador y verifica la respuesta
    ResponseEntity<?> responseEntity = especialidadController.crearEspecialidad(request);

    // Verifica que la respuesta no sea nula y que el estado sea HttpStatus.OK
    assertNotNull(responseEntity);
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
}

    @Test
    @DisplayName("Verifica que no se pueda crear una especialidad si su nombre ya existe")
    public void testCreateEspecialidadWhenNombreExists() {
        // Simula el comportamiento de especialidadRepository.existsBynombre() cuando el nombre ya existe
        when(especialidadRepository.existsBynombre(Mockito.anyString())).thenReturn(true);

        // Crea una instancia de Especialidad para la solicitud
        Especialidad request = new Especialidad();
        request.setNombre("Especialidad1");
        request.setDescripcion("Descripción de la especialidad");

        // Llama al método crearEspecialidad del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = especialidadController.crearEspecialidad(request);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    @DisplayName("Verifica que no se pueda crear una especialidad si se produce una excepcion")
    public void testCreateEspecialidadWithException() {
        // Simula una excepción en el repositorio
        when(especialidadRepository.save(any())).thenThrow(new RuntimeException("Simulated error"));

        // Crea una instancia de Especialidad para la solicitud
        Especialidad request = new Especialidad();
        request.setNombre("Especialidad1");
        request.setDescripcion("Descripción de la especialidad");

        // Llama al método crearEspecialidad del controlador y verifica la respuesta
        ResponseEntity<?> responseEntity = especialidadController.crearEspecialidad(request);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }
}