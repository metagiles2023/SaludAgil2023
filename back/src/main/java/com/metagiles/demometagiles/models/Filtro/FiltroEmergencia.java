package com.metagiles.demometagiles.models.Filtro;

import com.metagiles.demometagiles.models.fichamedica.FichaMedica;

public class FiltroEmergencia implements Filtro {
    private Boolean filtraTrue = null;

    public FiltroEmergencia(boolean filtraTrue) {
        this.filtraTrue = filtraTrue;
    }

    public boolean cumple(FichaMedica fichaMedica) {
        if (filtraTrue) {
            return fichaMedica.isUsoEmergencia();
        }
        else {
            return !fichaMedica.isUsoEmergencia();
        }
    }
}
