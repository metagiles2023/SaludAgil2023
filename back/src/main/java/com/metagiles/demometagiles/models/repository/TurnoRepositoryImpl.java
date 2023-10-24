package com.metagiles.demometagiles.models.repository;

import com.metagiles.demometagiles.models.entity.Turno;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TurnoRepositoryImpl implements TurnoRepository {

    @PersistenceContext
    private EntityManager em;
    @Override
    public List<Turno> getTurnosById(Long idPaciente) {
        String query = "SELECT t FROM Turno t WHERE t.paciente.id = :idPaciente";
        TypedQuery<Turno> result = em.createQuery(query,Turno.class);
        result.setParameter("idPaciente",idPaciente);

        List<Turno> turnos = result.getResultList();
        System.out.println("getTurnosById: " + turnos);
        return turnos;
    };
}
