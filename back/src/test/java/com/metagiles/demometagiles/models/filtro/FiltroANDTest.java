package com.metagiles.demometagiles.models.filtro;
import com.metagiles.demometagiles.models.Filtro.Filtro;
import com.metagiles.demometagiles.models.Filtro.FiltroAND;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@DisplayName(">>> FiltroAND <<<")
public class FiltroANDTest {

    @Test
    @DisplayName("Verifica si el filtro AND cumple con ambos filtros verdaderos")
    public void testCumpleWithBothFiltersTrue() {
        // Crea instancias de FichaMedica y dos filtros que siempre devuelven true
        FichaMedica fichaMedica = new FichaMedica();
        Filtro filtroTrue1 = mock(Filtro.class);
        when(filtroTrue1.cumple(fichaMedica)).thenReturn(true);
        Filtro filtroTrue2 = mock(Filtro.class);
        when(filtroTrue2.cumple(fichaMedica)).thenReturn(true);

        // Crea una instancia de FiltroAND con los filtros verdaderos
        FiltroAND filtroAND = new FiltroAND(filtroTrue1, filtroTrue2);

        // Verifica que el filtro AND cumple con la ficha médica
        boolean resultado = filtroAND.cumple(fichaMedica);
        assertEquals(true, resultado);
    }

    @Test
    @DisplayName("Verifica si el filtro AND no cumple con un filtro falso")
    public void testCumpleWithOneFilterFalse() {
        // Crea instancias de FichaMedica, un filtro verdadero y un filtro falso
        FichaMedica fichaMedica = new FichaMedica();
        Filtro filtroTrue = mock(Filtro.class);
        when(filtroTrue.cumple(fichaMedica)).thenReturn(true);
        Filtro filtroFalse = mock(Filtro.class);
        when(filtroFalse.cumple(fichaMedica)).thenReturn(false);

        // Crea una instancia de FiltroAND con un filtro verdadero y un filtro falso
        FiltroAND filtroAND = new FiltroAND(filtroTrue, filtroFalse);

        // Verifica que el filtro AND no cumple con la ficha médica
        boolean resultado = filtroAND.cumple(fichaMedica);
        assertEquals(false, resultado);
    }
}
