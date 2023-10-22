package com.metagiles.demometagiles.models.medico;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
    public boolean existsBydni(String dni);
    public Medico getBydni(String dni);
}
//