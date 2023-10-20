package com.metagiles.demometagiles.models.usuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;


@Entity(name = "Usuario")
@Table(name = "usuario")
public class Usuario {
    @Id
    @Column(
            name = "u_id",
            updatable = false
    )
    @SequenceGenerator(
            name = "usuario_sequence",
            sequenceName = "usuario_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "usuario_sequence"
    )
    private Long idUsuario;

    @Column(
            name = "u_nombre",
            nullable = false
    )
    private String nombre;

    @Column(
            name = "u_apellido",
            nullable = false
    )
    private String apellido;

    @Column(
            name = "u_dni",
            nullable = false
    )
    private String dni;

    @Column(
            name = "u_rol",
            nullable = false
    )
    private String rol;

    //Necesario
    public Usuario() {

    }

    public Usuario(String nombre, String apellido, String dni, String rol) {
        System.out.println("Se crea una instancia de Clase1");
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.rol = rol;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    
}