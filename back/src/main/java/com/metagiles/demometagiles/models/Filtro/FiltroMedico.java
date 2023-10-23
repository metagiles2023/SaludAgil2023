package com.metagiles.demometagiles.models.Filtro;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;
import com.metagiles.demometagiles.models.medico.Medico;



public class FiltroMedico implements Filtro {
    private Medico medico;

    public FiltroMedico (Medico medico){
        this.medico = medico;
    }
    
    public boolean cumple(FichaMedica fichaMedica){
        return fichaMedica.getMedico().equals(this.medico);
    }
}