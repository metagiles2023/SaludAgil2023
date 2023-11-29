package com.metagiles.demometagiles.models.usuario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    public boolean existsBydni(String dni);
    public Usuario getBydni(String dni);
}
//