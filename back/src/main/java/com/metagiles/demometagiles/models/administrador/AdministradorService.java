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
        Session session = sessionCacheService.getSession(token);
        if (session == null) {
            System.out.println("findAllAdministradores: token invalido");
            return new ArrayList<>();
        }
        System.out.println("findAllAdministradores: obteniendo administradores");
        return administradorRepository.findAll();
    }

    

    public ResponseEntity<?> crearAdministrador(Administrador administradorRequest, String token) {
        if (!administradorRepository.existsBydni(administradorRequest.getDni())) {
            return Utils.genResponseError("Administrador ya existe.");
        }
        return ResponseEntity.ok(Utils.jsonificar("ok"));
    }
}
