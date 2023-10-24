package com.metagiles.demometagiles.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity(name = "Medico")
@DiscriminatorValue("M")
@Table(name = "medico")
public class Medico extends Usuario{
    @Column(name = "especialidad", nullable = true) //true porque pacientes no tienen
    private String especialidad;

    public Medico() {

    }

    public Medico(String nombre, String apellido, String dni, String rol, String especialidad) {
        super(nombre, apellido, dni, "medico");
        this.especialidad = especialidad;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    @Override
    public String toString(){
        return super.toString();
    }
}