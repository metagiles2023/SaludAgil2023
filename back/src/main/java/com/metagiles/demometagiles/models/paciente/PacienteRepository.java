package com.metagiles.demometagiles.models.paciente;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long>{
    public boolean existsBydni(String dni);
    public Paciente getBydni(String dni);
    public Optional<Paciente> findById(Long idUsuario); //getById da problemas
}
//