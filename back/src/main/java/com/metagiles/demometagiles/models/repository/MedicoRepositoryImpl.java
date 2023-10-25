package com.metagiles.demometagiles.models.repository;

import com.metagiles.demometagiles.models.entity.Medico;
import com.metagiles.demometagiles.models.entity.Turno;
import jakarta.persistence.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class MedicoRepositoryImpl implements MedicoRepository {

    @PersistenceContext
    EntityManager em;
    public List<Medico> getMedicoByEspecialidad(String especialidad){
        return null;
    }

}
