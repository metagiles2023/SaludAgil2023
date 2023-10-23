package com.metagiles.demometagiles.models.Filtro;
import com.metagiles.demometagiles.models.fichamedica.FichaMedica;
import com.metagiles.demometagiles.models.paciente.Paciente;

public class FiltroPaciente implements Filtro {
    private Paciente paciente;

    public FiltroPaciente (Paciente paciente){
        this.paciente = paciente;
    }
    
    @Override
    public boolean cumple(FichaMedica fichaMedica){
        return fichaMedica.getPaciente().equals(this.paciente);
    }

    

}