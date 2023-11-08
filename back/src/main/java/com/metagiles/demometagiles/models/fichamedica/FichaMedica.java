package com.metagiles.demometagiles.models.fichamedica;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity(name = "FichaMedica")
@Table(name = "ficha_medica")
public class FichaMedica {
    @Id
    @Column(name = "fm_id", updatable = false)
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

    //@ManyToOne
    @JoinColumn(name = "medico_id", nullable = false)
    private Long medicoId;

    //@ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Long pacienteId;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "America/Argentina/Buenos_Aires")
    @Column(name = "date", nullable = false)
    private Date fecha;

    @Column(name = "diagnostico", nullable = false)
    private String diagnostico;

    @Column(name = "es_grave", nullable = false)
    private boolean esGrave;

    @Column(name = "uso_emergencia", nullable = false)
    private boolean usoEmergencia;


    //Getters y setters
    public Long getIdFichaMedica() {
        return idFichaMedica;
    }

    public Long getMedico() {
        return medicoId;
    }

    public void setMedico(Long medicoId) {
        this.medicoId = medicoId;
    }

    public Long getPaciente() {
        return pacienteId;
    }

    public void setPaciente(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public Date getDate() {
        return fecha;
    }

    public void setDate(Date fecha) {
        this.fecha = fecha;
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