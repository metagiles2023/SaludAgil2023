package com.metagiles.demometagiles.models.filtro;

import com.metagiles.demometagiles.models.Filtro.FiltroPaciente;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName(">>> FiltroPaciente <<<")
public class FiltroPacienteTest {

    @Test
    @DisplayName("Verifica si el filtro cumple con el mismo paciente")
    public void testCumpleWithSamePaciente() {
        // Crea una instancia de FichaMedica con un paciente específico
        FichaMedica fichaMedica = new FichaMedica();
        Long pacienteFicha = 1L; // Supongamos que el paciente tiene ID 1
        fichaMedica.setPaciente(pacienteFicha);

        // Crea una instancia de FiltroPaciente con el mismo paciente
        FiltroPaciente filtro = new FiltroPaciente(pacienteFicha);

        // Verifica que el filtro cumple con la ficha médica
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(true, resultado);
    }

    @Test
    @DisplayName("Verifica si el filtro no cumple con un paciente diferente")
    public void testCumpleWithDifferentPaciente() {
        // Crea una instancia de FichaMedica con un paciente diferente
        FichaMedica fichaMedica = new FichaMedica();
        Long pacienteFicha = 1L; // Supongamos que el paciente tiene ID 1
        Long otroPaciente = 2L; // ID de otro paciente

        // Asigna el ID del otro paciente a la ficha médica
        fichaMedica.setPaciente(otroPaciente);

        // Crea una instancia de FiltroPaciente con el ID del paciente original
        FiltroPaciente filtro = new FiltroPaciente(pacienteFicha);

        // Verifica que el filtro no cumple con la ficha médica
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(false, resultado);
    }
}






