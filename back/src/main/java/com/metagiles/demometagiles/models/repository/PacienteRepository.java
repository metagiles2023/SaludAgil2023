package com.metagiles.demometagiles.models.repository;

import com.metagiles.demometagiles.models.entity.Paciente;
import com.metagiles.demometagiles.models.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente,Long>{

    //public int PedirDatos(Long idPaciente, String email, Long telefono);
}
