package com.metagiles.demometagiles.models.turno;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.metagiles.demometagiles.models.medico.Medico;
import com.metagiles.demometagiles.models.medico.MedicoRepository;
import com.metagiles.demometagiles.models.paciente.Paciente;
import com.metagiles.demometagiles.models.paciente.PacienteMapper;
import com.metagiles.demometagiles.models.paciente.PacienteRepository;
import com.metagiles.demometagiles.models.paciente.PacienteService;
import com.metagiles.demometagiles.models.turno.TurnoRepository;
import com.metagiles.demometagiles.utils.Utils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.util.*;

@DisplayName(">>> TurnoService <<<")
public class TurnoServiceTest {

    @InjectMocks
    private PacienteService pacienteService;
    
    @Mock
    private PacienteRepository pacienteRepository;

    @Mock
    private PacienteMapper pacienteMapper;

    @Mock
    private TurnoRepository turnoRepository;

    @Mock
    private TurnoService turnoService;

    @Mock
    private MedicoRepository medicoRepository;

    @Mock
    private Utils utils;

    private Turno turno;
    private Paciente paciente;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        this.pacienteService = new PacienteService(pacienteRepository,pacienteMapper); 
        this.turnoService = new TurnoService(pacienteRepository,turnoRepository,medicoRepository); 
        this.paciente = new Paciente("nombre", "apellido", "40668809", "paciente");
        Medico medico = new Medico("nombre", "apellido", "12345678", "medico", "doctor");
        Date horaTurno = new Date();
        this.turno = new Turno(1l, paciente, medico, horaTurno);
    }

    @Test
    @DisplayName("Prueba para postReservarTurno con error al reservar")
    public void testPostReservarTurnoError() {
        Map<String, String> request = new HashMap<>();
        request.put("id", "1");
        request.put("idUsuario", "2");
        request.put("email", "correo@example.com");

        when(turnoRepository.getReferenceById(any(Long.class))).thenThrow(new RuntimeException("Simulated error"));

        ResponseEntity<?> response = turnoService.postReservarTurno(request);

        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

    }

    @Test
    @DisplayName("Prueba para getTurnosMedicoByDiaByMes")
    public void testGetTurnosMedicoByDiaByMes() {
        // Simula el comportamiento del repositorio y prueba la lógica de getTurnosMedicoByDiaByMes
        // Ajusta esto según la estructura real de tu clase Turno

        List<Turno> turnos = new ArrayList<>(); // Ajusta esto según la estructura real de tu clase Turno
        when(turnoRepository.getTurnosDisponiblesMedicoByDiaByMes(any(Long.class), anyInt(), anyInt())).thenReturn(turnos);

        List<Turno> result = turnoService.getTurnosMedicoDisponiblesByDiaByMes("1", "10", "2");

        assertNotNull(result);

    }

    @Test
    @DisplayName("Prueba para cancelarTurnoByIdPaciente con éxito")
    public void testCancelarTurnoByIdPacienteSuccess() {
        Map<String, String> request = new HashMap<>();
        request.put("tid", "1");
        request.put("pid", "2");

        when(turnoRepository.getTurnoByIdByIdUsuario(any(Long.class), any(Long.class))).thenReturn(this.turno);
        when(turnoRepository.save(any(Turno.class))).thenReturn(this.turno);

        ResponseEntity<?> response = turnoService.cancelarTurnoByIdPaciente(request);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());

    }

}