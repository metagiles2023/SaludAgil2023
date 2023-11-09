package com.metagiles.demometagiles.models.filtro;

import com.metagiles.demometagiles.models.Filtro.FiltroRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.sql.Date;

@DisplayName(">>> FiltroRequest <<<")
public class FiltroRequestTest {

    @Test
    @DisplayName("Verifica los valores iniciales de un objeto FiltroRequest")
    public void testValoresIniciales() {
        // Crea una instancia de FiltroRequest
        FiltroRequest filtroRequest = new FiltroRequest();

        // Verifica que los valores iniciales sean nulos
        assertEquals(null, filtroRequest.getFechaDesde());
        assertEquals(null, filtroRequest.getFechaHasta());
        assertEquals(null, filtroRequest.getFiltraGrave());
        assertEquals(null, filtroRequest.getFiltraEmergencia());
        assertEquals(null, filtroRequest.getPaciente());
        assertEquals(null, filtroRequest.getMedico());
    }

    @Test
    @DisplayName("Verifica la configuración de un objeto FiltroRequest")
    public void testConfiguracionFiltroRequest() {
        // Crea una instancia de FiltroRequest
        FiltroRequest filtroRequest = new FiltroRequest();

        // Configura los valores del filtro
        filtroRequest.setFechaDesde(new Date(0));
        filtroRequest.setFechaHasta(new Date(0));
        filtroRequest.setFiltraGrave(true);
        filtroRequest.setFiltraEmergencia(false);
        filtroRequest.setPaciente(1L);
        filtroRequest.setMedico(2L);

        // Verifica que los valores configurados sean los mismos
        assertEquals(new Date(0), filtroRequest.getFechaDesde());
        assertEquals(new Date(0), filtroRequest.getFechaHasta());
        assertEquals(true, filtroRequest.getFiltraGrave());
        assertEquals(false, filtroRequest.getFiltraEmergencia());
        assertEquals(1L, filtroRequest.getPaciente());
        assertEquals(2L, filtroRequest.getMedico());
    }
}
