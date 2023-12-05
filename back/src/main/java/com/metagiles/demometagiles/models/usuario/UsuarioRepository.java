package com.metagiles.demometagiles.models.usuario;

import java.lang.reflect.Array;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    public boolean existsBydni(String dni);
    public ArrayList<Usuario> getBydni(String dni);
}
//