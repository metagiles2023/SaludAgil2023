package com.metagiles.demometagiles.utils;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

public class UtilsTest
{

    @Test
    @DisplayName("Prueba a esDniValido() brindando DNI's validos")
    public void testEsDniValidoVALID() 
    {
        assertTrue(Utils.esDniValido("1234567"));
        assertTrue(Utils.esDniValido("1234568"));
    }

    @Test
    @DisplayName("Prueba a esDniValido() brindando DNI's invalidos")
    public void testEsDniValidoINVALID() 
    {
        assertFalse(Utils.esDniValido("12345"));  // DNI demasiado corto
        assertFalse(Utils.esDniValido("123456789"));  // DNI demasiado largo
        assertFalse(Utils.esDniValido("1234a567"));  // DNI contiene caracteres no numéricos
    }
}