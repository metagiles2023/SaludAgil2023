package com.metagiles.demometagiles.models.filtro;

import com.metagiles.demometagiles.models.Filtro.FiltroEmergencia;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName(">>> FiltroEmergencia <<<")
public class FiltroEmergenciaTest {

    @Test
    @DisplayName("Verifica si el filtro cumple con uso de emergencia verdadero")
    public void testCumpleWithUsoEmergenciaTrue() {
        // Crea una instancia de FichaMedica con uso de emergencia verdadero
        FichaMedica fichaMedica = new FichaMedica();
        fichaMedica.setUsoEmergencia(true);

        // Crea una instancia de FiltroEmergencia con filtraTrue igual a true
        FiltroEmergencia filtro = new FiltroEmergencia(true);

        // Verifica que el filtro cumple con la ficha médica con uso de emergencia verdadero
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(true, resultado);
    }

    @Test
    @DisplayName("Verifica si el filtro cumple con uso de emergencia falso")
    public void testCumpleWithUsoEmergenciaFalse() {
        // Crea una instancia de FichaMedica con uso de emergencia falso
        FichaMedica fichaMedica = new FichaMedica();
        fichaMedica.setUsoEmergencia(false);

        // Crea una instancia de FiltroEmergencia con filtraTrue igual a true
        FiltroEmergencia filtro = new FiltroEmergencia(true);

        // Verifica que el filtro no cumple con la ficha médica con uso de emergencia falso
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(false, resultado);
    }

    @Test
    @DisplayName("Verifica si el filtro cumple con filtraTrue igual a falso")
    public void testCumpleWithFiltraTrueFalse() {
        // Crea una instancia de FichaMedica con uso de emergencia verdadero
        FichaMedica fichaMedica = new FichaMedica();
        fichaMedica.setUsoEmergencia(true);

        // Crea una instancia de FiltroEmergencia con filtraTrue igual a falso
        FiltroEmergencia filtro = new FiltroEmergencia(false);

        // Verifica que el filtro no cumple con la ficha médica con uso de emergencia verdadero
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(false, resultado);
    }

    @Test
    @DisplayName("Verifica si el filtro cumple con uso de emergencia falso y filtraTrue igual a falso")
    public void testCumpleWithUsoEmergenciaFalseAndFiltraTrueFalse() {
        // Crea una instancia de FichaMedica con uso de emergencia falso
        FichaMedica fichaMedica = new FichaMedica();
        fichaMedica.setUsoEmergencia(false);

        // Crea una instancia de FiltroEmergencia con filtraTrue igual a falso
        FiltroEmergencia filtro = new FiltroEmergencia(false);

        // Verifica que el filtro cumple con la ficha médica con uso de emergencia falso
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(true, resultado);
    }
}