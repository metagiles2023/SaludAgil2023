package com.metagiles.demometagiles.models.filtro;
import com.metagiles.demometagiles.models.Filtro.FiltroFechaDesde;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.assertEquals;
import java.sql.Date;

@DisplayName(">>> FiltroFechaDesde <<<")
public class FiltroFechaDesdeTest {

    @Test
    @DisplayName("Verifica si el filtro cumple con una fecha posterior o igual")
    public void testCumpleWithDateAfterOrEqual() {
        // Crea instancias de FichaMedica y un filtro con una fecha posterior o igual
        FichaMedica fichaMedica = new FichaMedica();
        Date fechaFichaMedica = new Date(0); // Fecha actual
        fichaMedica.setDate(fechaFichaMedica);

        Date fechaFiltro = new Date(fechaFichaMedica.getTime() - 1000); // Fecha anterior o igual

        // Crea una instancia de FiltroFechaDesde con la fecha anterior o igual
        FiltroFechaDesde filtro = new FiltroFechaDesde(fechaFiltro);

        // Verifica que el filtro cumple con la ficha médica
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(true, resultado);
    }

    @Test
    @DisplayName("Verifica si el filtro no cumple con una fecha anterior")
    public void testCumpleWithDateBefore() {
        // Crea instancias de FichaMedica y un filtro con una fecha posterior
        FichaMedica fichaMedica = new FichaMedica();
        Date fechaFichaMedica = new Date(0); // Fecha actual
        fichaMedica.setDate(fechaFichaMedica);

        Date fechaFiltro = new Date(fechaFichaMedica.getTime() + 1000); // Fecha posterior

        // Crea una instancia de FiltroFechaDesde con la fecha posterior
        FiltroFechaDesde filtro = new FiltroFechaDesde(fechaFiltro);

        // Verifica que el filtro no cumple con la ficha médica
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(false, resultado);
    }
}