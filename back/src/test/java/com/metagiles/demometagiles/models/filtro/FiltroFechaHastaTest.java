package com.metagiles.demometagiles.models.filtro;
import com.metagiles.demometagiles.models.Filtro.FiltroFechaHasta;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.assertEquals;
import java.sql.Date;

@DisplayName(">>> FiltroFechaHasta <<<")
public class FiltroFechaHastaTest {

    @Test
    @DisplayName("Verifica si el filtro cumple con una fecha anterior o igual")
    public void testCumpleWithDateBeforeOrEqual() {
        // Crea instancias de FichaMedica y un filtro con una fecha anterior o igual
        FichaMedica fichaMedica = new FichaMedica();
        Date fechaFichaMedica = new Date(0); // Fecha actual
        fichaMedica.setDate(fechaFichaMedica);

        Date fechaFiltro = new Date(fechaFichaMedica.getTime() + 1000); // Fecha posterior o igual

        // Crea una instancia de FiltroFechaHasta con la fecha posterior o igual
        FiltroFechaHasta filtro = new FiltroFechaHasta(fechaFiltro);

        // Verifica que el filtro cumple con la ficha médica
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(true, resultado);
    }

    @Test
    @DisplayName("Verifica si el filtro no cumple con una fecha posterior")
    public void testCumpleWithDateAfter() {
        // Crea instancias de FichaMedica y un filtro con una fecha anterior
        FichaMedica fichaMedica = new FichaMedica();
        Date fechaFichaMedica = new Date(0); // Fecha actual
        fichaMedica.setDate(fechaFichaMedica);

        Date fechaFiltro = new Date(fechaFichaMedica.getTime() - 1000); // Fecha anterior

        // Crea una instancia de FiltroFechaHasta con la fecha anterior
        FiltroFechaHasta filtro = new FiltroFechaHasta(fechaFiltro);

        // Verifica que el filtro no cumple con la ficha médica
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(false, resultado);
    }
}
