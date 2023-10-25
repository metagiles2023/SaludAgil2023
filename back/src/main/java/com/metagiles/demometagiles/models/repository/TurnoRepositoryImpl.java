package com.metagiles.demometagiles.models.repository;

import com.metagiles.demometagiles.models.entity.Medico;
import com.metagiles.demometagiles.models.entity.Turno;
import com.metagiles.demometagiles.models.entity.Usuario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class TurnoRepositoryImpl implements TurnoRepository {

    @PersistenceContext
    private EntityManager em;
    @Override
    public List<Turno> getTurnosById(Long idPaciente) {
        String query = "SELECT t FROM Turno t WHERE t.paciente.id = :idPaciente AND t.ocupado = true";
        TypedQuery<Turno> result = em.createQuery(query,Turno.class);
        result.setParameter("idPaciente",idPaciente);

        List<Turno> turnos = result.getResultList();
        System.out.println("getTurnosById: " + turnos);
        return turnos;
    };

    @Temporal(TemporalType.TIMESTAMP)
    @Transactional
    @Override
    public void deleteTurnosById(Long idPaciente,Long idTurno) {
        String query = "SELECT t.id FROM Turno t WHERE t.paciente.id = :idPaciente AND t.ocupado = true";
        TypedQuery<Long> result = em.createQuery(query,Long.class);
        result.setParameter("idPaciente",idPaciente);
        List<Long> idturnos = result.getResultList();
 
        for (Long id : idturnos) {
            if(id == idTurno){
                String query2 = "DELETE FROM turnos t WHERE t.paciente_u_id = :idPaciente AND t.id = :idTurno AND t.fecha > now() + interval '1 day'";
                Query result2 = em.createNativeQuery(query2);
                result2.setParameter("idPaciente",idPaciente);
                result2.setParameter("idTurno",idTurno);
                int deletedCount = result2.executeUpdate();
                if (deletedCount == 0){
                    System.out.println("No se puede borrar un turno que ocurrira en las proximas 24 horas");
                }
                break;
            }
        }
    };


    @Override
    public List<Turno> getTurnosDisponiblesMedicoByDia(Long idMedico, int dia) {
        String query = "SELECT t FROM Turno t WHERE t.medico.id = :idMedico AND t.ocupado = false AND DAY(t.date) = :dia";
        TypedQuery<Turno> result = em.createQuery(query,Turno.class);
        result.setParameter("idMedico",idMedico);
        result.setParameter("dia",dia);
        List<Turno> turnos = result.getResultList();


        return turnos;
    }
}
