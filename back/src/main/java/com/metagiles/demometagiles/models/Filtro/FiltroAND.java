package com.metagiles.demometagiles.models.Filtro;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;


public class FiltroAND implements Filtro{
    private Filtro filtro1;
    private Filtro filtro2;

    public FiltroAND(Filtro filtro1, Filtro filtro2){
        this.filtro1 = filtro1;
        this.filtro2 = filtro2;
    }

    public boolean cumple(FichaMedica fichaMedica){
        return filtro1.cumple(fichaMedica) && filtro2.cumple(fichaMedica);
    }
    
}