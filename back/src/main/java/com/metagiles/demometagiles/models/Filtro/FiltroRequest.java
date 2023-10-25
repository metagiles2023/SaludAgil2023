package com.metagiles.demometagiles.models.Filtro;

import java.util.Date;

public class FiltroRequest {
    private Date fechaDesde = null;
    private Date fechaHasta = null;
    private Boolean filtraGrave = null;
    private Boolean filtraEmergencia = null;
    private Long paciente = null;
    private Long medico = null;

    //Constructor
    public FiltroRequest() {

    }

    //Getters y Setters
    public Long getPaciente() {
        return paciente;
    }

    public void setPaciente(Long paciente) {
        this.paciente = paciente;
    }

    public Long getMedico() {
        return medico;
    }

    public void setMedico(Long medico) {
        this.medico = medico;
    }

    public Date getFechaDesde() {
        return fechaDesde;
    }

    public void setFechaDesde(Date fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    public Date getFechaHasta() {
        return fechaHasta;
    }

    public void setFechaHasta(Date fechaHasta) {
        this.fechaHasta = fechaHasta;
    }

    public Boolean getFiltraGrave() {
        return filtraGrave;
    }
    public void setFiltraGrave(Boolean filtraGrave) {
        this.filtraGrave = filtraGrave;
    }

    public Boolean getFiltraEmergencia() {
        return filtraEmergencia;
    }

    public void setFiltraEmergencia(Boolean filtraEmergencia) {
        this.filtraEmergencia = filtraEmergencia;
    }

    
}
