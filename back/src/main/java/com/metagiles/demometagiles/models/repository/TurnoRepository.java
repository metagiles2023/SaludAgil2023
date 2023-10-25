package com.metagiles.demometagiles.models.repository;

import com.metagiles.demometagiles.models.entity.Paciente;
import com.metagiles.demometagiles.models.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface TurnoRepository {
    public List<Turno> getTurnosById(Long idPaciente);
    public void deleteTurnosById(Long idPaciente,Long idTurno);

    public List<Turno>getTurnosDisponiblesMedicoByDia(Long idMedico, int dia);
}
