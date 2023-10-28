package com.metagiles.demometagiles.models.repository;

import com.metagiles.demometagiles.models.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;



public interface TurnoRepository extends JpaRepository<Turno,Long> {
    //public Turno getById(Long id);
    //public void deleteTurnosById(Long idPaciente,Long idTurno);

    @Query("SELECT t FROM Turno t WHERE t.paciente.idUsuario = :idUsuario AND t.id = :idTurno")
    public Turno getTurnoByIdByIdUsuario(Long idTurno,Long idUsuario);

    @Query("SELECT t FROM Turno t WHERE t.paciente.idUsuario = :idPaciente AND t.ocupado = true")
    public List<Turno> getTurnosByIdPaciente(Long idPaciente);

    @Query("SELECT t FROM Turno t WHERE t.medico.idUsuario = :idMedico AND t.ocupado = false AND DAY(t.date) = :dia AND MONTH(t.date) = :mes")
    public List<Turno>getTurnosDisponiblesMedicoByDiaByMes(Long idMedico, int dia,int mes);


}
