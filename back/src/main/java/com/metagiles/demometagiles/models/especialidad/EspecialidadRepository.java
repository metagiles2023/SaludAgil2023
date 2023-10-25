package com.metagiles.demometagiles.models.especialidad;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EspecialidadRepository extends JpaRepository<Especialidad,Long>{
    public boolean existsBynombre(String nombre);
}
