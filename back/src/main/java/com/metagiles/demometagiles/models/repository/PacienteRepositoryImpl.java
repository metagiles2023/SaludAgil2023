package com.metagiles.demometagiles.models.repository;

import com.metagiles.demometagiles.models.entity.Turno;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Scanner;

@Repository


public class PacienteRepositoryImpl implements PacienteRepository {
    @PersistenceContext
    private EntityManager em;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Transactional
    @Override
    public int PedirDatos(Long idPaciente, String email, Long telefono){

        String update = "UPDATE usuario SET email = :email, telefono = :telefono WHERE u_id = :idPaciente";
        Query query = em.createNativeQuery(update);
        query.setParameter("email", email);
        query.setParameter("telefono", telefono);
        query.setParameter("idPaciente", idPaciente);
        int modificada = query.executeUpdate();

        if(modificada == 0){
            System.out.println("No se pudieron resultados las modificaciones");
        }
        return modificada;
    }
}
