package com.metagiles.demometagiles.models.repository;

import com.metagiles.demometagiles.models.entity.Medico;
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
public class MedicoRepositoryImpl implements MedicoRepository {
    public List<Medico> getMedicoByEspecialidad(String especialidad){
        return null;
    }
}
