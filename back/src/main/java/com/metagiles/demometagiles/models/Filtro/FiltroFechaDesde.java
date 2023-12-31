package com.metagiles.demometagiles.models.Filtro;
import java.sql.Date;

import com.metagiles.demometagiles.models.fichamedica.FichaMedica;



public class FiltroFechaDesde implements Filtro {
     private Date date;

    public FiltroFechaDesde(Date date){
        this.date = date;
    }

    public boolean cumple(FichaMedica fichaMedica){
        int resultado = fichaMedica.getDate().compareTo(this.date);
        if (resultado > 0 || resultado == 0) { //la fecha de la ficha médica es posterior a la variable local del filtro
            return true;
        } else { //la fecha de la ficha médica es anterior a la variable local del filtro 
            return false;
        } 
    }
}