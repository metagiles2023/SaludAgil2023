package com.metagiles.demometagiles.models.Filtro;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;


public class FiltroMedico implements Filtro {
    private Long medico;

    public FiltroMedico (Long medico){
        this.medico = medico;
    }
    
    public boolean cumple(FichaMedica fichaMedica){
        Long medicoDeFicha = fichaMedica.getMedico();
        return medicoDeFicha.equals(this.medico);
    }
}