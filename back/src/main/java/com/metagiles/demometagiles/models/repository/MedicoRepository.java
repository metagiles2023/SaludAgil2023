package com.metagiles.demometagiles.models.repository;

import com.metagiles.demometagiles.models.entity.Medico;
import com.metagiles.demometagiles.models.entity.Paciente;
import com.metagiles.demometagiles.models.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface MedicoRepository{
    public List<Medico> getMedicoByEspecialidad(String especialidad);

}