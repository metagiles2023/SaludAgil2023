package com.metagiles.demometagiles.models.Filtro;

import com.metagiles.demometagiles.models.fichamedica.FichaMedica;

public class FiltroGrave implements Filtro {
    private Boolean filtraTrue = null;

    public FiltroGrave(boolean filtraTrue) {
        this.filtraTrue = filtraTrue;
    }

    public boolean cumple(FichaMedica fichaMedica) {
        if (filtraTrue) {
            System.out.println("Filtro por true. El valor de ficha.isEsGrave es " + fichaMedica.isEsGrave());
            return fichaMedica.isEsGrave();
        }
        else {
            System.out.println("Filtro por false. El valor de ficha.isEsGrave es " + fichaMedica.isEsGrave());
            return !fichaMedica.isEsGrave();
        }
    }
}
