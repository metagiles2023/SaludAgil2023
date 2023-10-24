package com.metagiles.demometagiles.models.entity;

import com.metagiles.demometagiles.models.repository.PacienteRepository;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "turnos")
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "ocupado", nullable = false)
    private boolean ocupado;
    @ManyToOne
    private Paciente paciente;
    @ManyToOne
    private Medico medico;
    @Column(name = "fecha", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Medico getMedico() {
        return medico;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString(){
        return this.id + "-" +this.paciente.toString() + "-" +   this.medico.toString() + "-" + this.date;
    }

}
