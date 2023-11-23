package com.metagiles.demometagiles.models.turno;

import jakarta.persistence.*;
import com.metagiles.demometagiles.models.medico.Medico;
import com.metagiles.demometagiles.models.paciente.Paciente;
import java.util.Date;

@Entity
@Table(name = "turnos")
public class Turno implements Comparable<Turno> {

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

    public Turno() {
        
    }

    public Turno(Long id, Paciente paciente, Medico medico, Date date){
        this.id = id;
        this.ocupado = false;
        this.paciente = paciente;
        this.date = date;
    }
    
    public boolean isOcupado() {
        return ocupado;
    }

    public void setOcupado(boolean ocupado) {
        this.ocupado = ocupado;
    }

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
        String pacienteString = "null";
        if(this.paciente != null){
            pacienteString = this.paciente.toString();
        }

        return this.id + "-" + pacienteString  + "-" + this.medico + "-" + this.date;
    }

    @Override
    public int compareTo(Turno o) {
        return this.date.compareTo(o.getDate());
    }
}
