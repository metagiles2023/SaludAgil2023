package com.metagiles.demometagiles.models.filtro;
import com.metagiles.demometagiles.models.Filtro.FiltroGrave;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName(">>> FiltroGrave <<<")
public class FiltroGraveTest {

    @Test
    @DisplayName("Verifica si el filtro cumple cuando filtra por verdadero y ficha es grave")
    public void testCumpleTrueAndFichaGrave() {
        // Crea una instancia de FichaMedica con isEsGrave verdadero
        FichaMedica fichaMedica = new FichaMedica();
        fichaMedica.setEsGrave(true);

        // Crea una instancia de FiltroGrave que filtra por verdadero
        FiltroGrave filtro = new FiltroGrave(true);

        // Verifica que el filtro cumple con la ficha médica
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(true, resultado);
    }

    @Test
    @DisplayName("Verifica si el filtro cumple cuando filtra por falso y ficha no es grave")
    public void testCumpleFalseAndFichaNotGrave() {
        // Crea una instancia de FichaMedica con isEsGrave falso
        FichaMedica fichaMedica = new FichaMedica();
        fichaMedica.setEsGrave(false);

        // Crea una instancia de FiltroGrave que filtra por falso
        FiltroGrave filtro = new FiltroGrave(false);

        // Verifica que el filtro cumple con la ficha médica
        boolean resultado = filtro.cumple(fichaMedica);
        assertEquals(true, resultado);
    }
}
