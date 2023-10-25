package com.metagiles.demometagiles.models.Filtro;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;

public class FiltroPaciente implements Filtro {
    private Long paciente;

    public FiltroPaciente (Long paciente){
        this.paciente = paciente;
    }
    
    @Override
    public boolean cumple(FichaMedica fichaMedica){
        Long pacienteDeFicha = fichaMedica.getPaciente();
        return pacienteDeFicha.equals(this.paciente);
    }

    

}