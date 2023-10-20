package com.metagiles.demometagiles.models.fichamedica;

import java.sql.Date;

import com.metagiles.demometagiles.models.medico.Medico;
import com.metagiles.demometagiles.models.paciente.Paciente;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity(name = "FichaMedica")
@Table(name = "ficha_medica")
public class FichaMedica {
    @Id
    @Column(
            name = "fm_id",
            updatable = false
    )
    @SequenceGenerator(
            name = "ficha_medica_sequence",
            sequenceName = "ficha_medica_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "ficha_medica_sequence"
    )
    private Long idFichaMedica;

    @Column(
            name = "medico",
            nullable = false
    )
    private Medico medico;

    @Column(
            name = "paciente",
            nullable = false
    )
    private Paciente paciente;

    @Column(
            name = "date",
            nullable = false
    )
    private Date date;

    @Column(
            name = "diagnostico",
            nullable = false
    )
    private String diagnostico;

    @Column(
            name = "es_grave",
            nullable = false
    )
    private boolean esGrave;

    @Column(
            name = "uso_emergencia",
            nullable = false
    )
    private boolean usoEmergencia;


    //Getters y setters
    public Long getIdFichaMedica() {
        return idFichaMedica;
    }

    public Medico getMedico() {
        return medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public boolean isEsGrave() {
        return esGrave;
    }

    public void setEsGrave(boolean esGrave) {
        this.esGrave = esGrave;
    }

    public boolean isUsoEmergencia() {
        return usoEmergencia;
    }

    public void setUsoEmergencia(boolean usoEmergencia) {
        this.usoEmergencia = usoEmergencia;
    }
}