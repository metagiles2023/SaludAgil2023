package com.metagiles.demometagiles.models.filtro;
import com.metagiles.demometagiles.models.Filtro.FiltroMedico;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName(">>> FiltroMedico <<<")
public class FiltroMedicoTest {

    @Test
    @DisplayName("Verifica si el filtro cumple con el mismo médico")
    public void testCumpleWithSameMedico() {
        // Crea una instancia de FichaMedica con un médico específico
        FichaMedica fichaMedica = new FichaMedica();
        Long medicoFicha = 1L; // Supongamos que el médico tiene ID 1
        fichaMedica.setMedico(medicoFicha);

        // Crea una instancia de FiltroMedico con el mismo médico
        FiltroMedico filtro = new FiltroMedico(medicoFicha);

        // Verifica que el filtro cumple con la ficha médica
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(true, resultado);
    }

    @Test
    @DisplayName("Verifica si el filtro no cumple con un médico diferente")
    public void testCumpleWithDifferentMedico() {
        // Crea una instancia de FichaMedica con un médico diferente
        FichaMedica fichaMedica = new FichaMedica();
        Long medicoFicha = 1L; // Supongamos que el médico tiene ID 1
        Long otroMedico = 2L; // ID de otro médico

        // Asigna el ID del otro médico a la ficha médica
        fichaMedica.setMedico(otroMedico);

        // Crea una instancia de FiltroMedico con el ID del médico original
        FiltroMedico filtro = new FiltroMedico(medicoFicha);

        // Verifica que el filtro no cumple con la ficha médica
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(false, resultado);
    }
}