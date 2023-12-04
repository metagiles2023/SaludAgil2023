package com.metagiles.demometagiles.models.administrador;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.metagiles.demometagiles.models.sesion.Session;
import com.metagiles.demometagiles.models.sesion.SessionCacheService;
import com.metagiles.demometagiles.utils.Utils;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AdministradorService {
    private final AdministradorRepository administradorRepository;
    private final SessionCacheService sessionCacheService;

    public List<Administrador> findAllAdministradores(String token){
        if (token == "noToken") { // Solo para dev
            return administradorRepository.findAll();
        }
        Session session = sessionCacheService.getSession(token);
        if (session == null) {
            System.out.println("findAllAdministradores: token invalido");
            return new ArrayList<>();
        }
        System.out.println("findAllAdministradores: obteniendo administradores");
        return administradorRepository.findAll();
    }

    

    public ResponseEntity<?> crearAdministrador(Administrador administradorRequest) {
        if (administradorRepository.existsBydni(administradorRequest.getDni())) {
            return Utils.genResponseError("Administrador ya existe.");
        }
        Administrador administrador = new Administrador();
        administrador.setApellido(administradorRequest.getApellido());
        administrador.setNombre(administradorRequest.getNombre());
        if (!Utils.esDniValido(administradorRequest.getDni()))
            return Utils.genResponseError("DNI input invalido: " + administradorRequest.getDni());
        
        administrador.setDni(administradorRequest.getDni());
        administrador.setEmail(administradorRequest.getEmail());
        administrador.setRol("administrador");
        Administrador savedAdministrador = administradorRepository.save(administrador);
        return ResponseEntity.ok(Utils.jsonificar("id", savedAdministrador.getIdUsuario()));
    }
}
