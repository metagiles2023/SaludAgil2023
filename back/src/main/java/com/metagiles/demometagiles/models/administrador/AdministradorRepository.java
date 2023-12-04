package com.metagiles.demometagiles.models.administrador;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministradorRepository extends JpaRepository<Administrador, Long>{
    public boolean existsBydni(String dni);
}
//