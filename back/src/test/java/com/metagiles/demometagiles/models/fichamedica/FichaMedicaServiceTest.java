package com.metagiles.demometagiles.models.fichamedica;

import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;

@DisplayName(">>> FichaMedicaService <<<")
public class FichaMedicaServiceTest {

    // @Mock
    // private FichaMedicaRepository fichaMedicaRepository;

    // @Mock
    // private MedicoRepository medicoRepository;

    // @Mock
    // private PacienteRepository pacienteRepository;

    // @Mock
    // private FichaMedicaService fichaMedicaService;

    // @BeforeEach
    // public void setUp() {
    //     MockitoAnnotations.initMocks(this);
    //     fichaMedicaService = new FichaMedicaService(fichaMedicaRepository,medicoRepository,pacienteRepository);
    // }

    // @Test
    // @DisplayName("Se simula el caso en el que se solicitan todas las fichas médicas")
    // public void testFindAllFichaMedicas() {
    //     // Simula el comportamiento de fichaMedicaRepository.findAll()
    //     List<FichaMedica> fichasMedicas = new ArrayList<>();
    //     fichasMedicas.add(new FichaMedica());
    //     when(fichaMedicaRepository.findAll()).thenReturn(fichasMedicas);

    //     // Llama al método getAll del controlador y verifica la respuesta
    //     List<FichaMedica> result = fichaMedicaRepository.findAll(); // Supongamos que no se aplica ningún filtro
    //     assertEquals(fichasMedicas, result);
    // }

    // @Test
    // @DisplayName("Verifica que se pueda crear una ficha médica con éxito")
    // public void testCreateFichaMedica() {
    //     // Simula el comportamiento de medicoRepository.existsById() y pacienteRepository.existsById()
    //     when(medicoRepository.existsById(Mockito.anyLong())).thenReturn(true);
    //     when(pacienteRepository.existsById(Mockito.anyLong())).thenReturn(true);

    //     // Crea una instancia de FichaMedica para la solicitud
    //     FichaMedica request = new FichaMedica();
    //     request.setMedico(1L); // Supongamos que existe un médico con ID 1
    //     request.setPaciente(2L); // Supongamos que existe un paciente con ID 2

    //     // Simula el comportamiento de fichaMedicaRepository.save() y retorna una FichaMedica guardada
    //     FichaMedica savedFichaMedica = new FichaMedica();
    //     when(fichaMedicaRepository.save(any())).thenReturn(savedFichaMedica);

    //     // Llama al método crearFichaMedica del controlador y verifica la respuesta
    //     ResponseEntity<?> responseEntity = fichaMedicaService.crearFichaMedica(request);

    //     // Verifica que la respuesta no sea nula y que el estado sea HttpStatus.OK
    //     assertNotNull(responseEntity);
    //     assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    // }


    // @Test
    // @DisplayName("Verifica que no se pueda crear una ficha médica si el médico no existe")
    // public void testCreateFichaMedicaWithNonExistentMedico() {
    //     // Simula el comportamiento de medicoRepository.existsById() que indica que el médico no existe
    //     when(medicoRepository.existsById(Mockito.anyLong())).thenReturn(false);

    //     // Crea una instancia de FichaMedica para la solicitud
    //     FichaMedica request = new FichaMedica();
    //     request.setMedico(1L); // Supongamos que no existe un médico con ID 1

    //     // Llama al método crearFichaMedica del controlador y verifica la respuesta
    //     ResponseEntity<?> responseEntity = fichaMedicaService.crearFichaMedica(request);
    //     assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    // }

    // @Test
    // @DisplayName("Verifica que no se pueda crear una ficha médica si el paciente no existe")
    // public void testCreateFichaMedicaWithNonExistentPaciente() {
    //     // Simula el comportamiento de medicoRepository.existsById() que indica que el paciente no existe
    //     when(medicoRepository.existsById(Mockito.anyLong())).thenReturn(true);
    //     when(pacienteRepository.existsById(Mockito.anyLong())).thenReturn(false);

    //     // Crea una instancia de FichaMedica para la solicitud
    //     FichaMedica request = new FichaMedica();
    //     request.setMedico(1L); // Supongamos que existe un médico con ID 1
    //     request.setPaciente(2L); // Supongamos que no existe un paciente con ID 2

    //     // Llama al método crearFichaMedica del controlador y verifica la respuesta
    //     ResponseEntity<?> responseEntity = fichaMedicaService.crearFichaMedica(request);
    //     assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    // }
}
