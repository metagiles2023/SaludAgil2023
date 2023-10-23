package com.metagiles.demometagiles.models.Filtro;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;



public interface Filtro{
    public abstract boolean cumple(FichaMedica fichaMedica);
}