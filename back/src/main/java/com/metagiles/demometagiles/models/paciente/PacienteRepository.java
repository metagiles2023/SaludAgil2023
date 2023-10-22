package com.metagiles.demometagiles.models.paciente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long>{
    public boolean existsBydni(String dni);
    public Paciente getBydni(String dni);
}
//