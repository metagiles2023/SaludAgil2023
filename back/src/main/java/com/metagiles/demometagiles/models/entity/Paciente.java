package com.metagiles.demometagiles.models.entity;



import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;


@Entity(name = "Paciente")
@DiscriminatorValue("P")
@Table(name = "paciente")
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

    public void setObraSocial(String obraSocial) {
        this.obraSocial = obraSocial;
    }

    @Override
    public String toString(){
        return super.toString();
    }
}
