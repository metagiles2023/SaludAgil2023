package com.metagiles.demometagiles.models.paciente;

// import java.util.ArrayList;
// import java.util.List;

import com.metagiles.demometagiles.models.usuario.Usuario;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity(name = "Paciente")
@DiscriminatorValue("P")
public class Paciente extends Usuario{
    // @Column(
    //         name = "obras_sociales",
    //         nullable = false
    // )
    // private List<String> obrasSociales;
    
    @Column(name = "obra_social", nullable = true) //true porque medicos no tienen
    private String obraSocial;

    //Necesario
    public Paciente() {
        
    }

    public Paciente(String nombre, String apellido, String dni, String rol) {
        super(nombre, apellido, dni, "paciente");
        //obrasSociales = new ArrayList<String>(null);
    }

    public String getObraSocial() {
        return obraSocial;
    }

    public void setObraSocial(String obraSocial) {
        this.obraSocial = obraSocial;
    }

    // public List<String> getObrasSociales() {
    //     return obrasSociales;
    // }

    // public void add(String obraSocial) {
    //     this.obrasSociales.add(obraSocial);
    // }

    

    
}
