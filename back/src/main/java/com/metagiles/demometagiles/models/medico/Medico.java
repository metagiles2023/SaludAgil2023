package com.metagiles.demometagiles.models.medico;

import com.metagiles.demometagiles.models.usuario.Usuario;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity(name = "Medico")
@Table(name = "medico")
@DiscriminatorValue("M")
public class Medico extends Usuario{
    @Column(
            name = "especialidad",
            nullable = false
    )
    private String especialidad;

    public Medico() {

    }

    public Medico(String nombre, String apellido, String dni, String rol, String especialidad) {
        super(nombre, apellido, dni, "medico");
        this.especialidad = especialidad;
    }
}
