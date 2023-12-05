package com.metagiles.demometagiles.models.administrador;


import com.metagiles.demometagiles.models.usuario.Usuario;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity(name = "Administrador")
@DiscriminatorValue("A")
public class Administrador extends Usuario {
    public Administrador() {

    }
    
}