package com.metagiles.demometagiles.models.sesion;

import java.util.Date;

import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.metagiles.demometagiles.models.usuario.AuthUsuario;
import com.metagiles.demometagiles.models.usuario.Usuario;
import com.metagiles.demometagiles.models.usuario.UsuarioService;
import com.metagiles.demometagiles.utils.Utils;

@Service
public class SessionCacheService {
    private final CacheManager cacheManager;
    private final JwtUtil jwtUtil;
    private final UsuarioService usuarioService;
    private String secretKey;

    public SessionCacheService(CacheManager cacheManager, JwtUtil jwtUtil, UsuarioService usuarioService) {
        this.cacheManager = cacheManager;
        this.jwtUtil = jwtUtil;
        this.usuarioService = usuarioService;
    }

    /*
     * Retorna usuario con token o mensaje de error.
     * Pone en la cache el par <token, Session>
     * En la Session tambien esta el token: redundante pero mejor.
     */
    public ResponseEntity<?> createSession(String dni, String password) throws Exception {
        // Se verifican los datos del usuario y el token de seguridad.
        Usuario usuario = usuarioService.getUsuario(dni);
        Cache cache = cacheManager.getCache("infoSession");
        AuthUsuario authUsuario = authenticateUsuario(password, usuario); // Mock de autenticacion
        Session session = new Session(authUsuario.getToken(), usuario);
        try {
            cache.put(authUsuario.getToken(), session);
        } catch (Exception e) { 
            return Utils.genResponseError("Error almacenando token y sesion: " + e.getMessage());
        }
        // Quiero retornar el usuario, no solamente el token.
        return ResponseEntity.ok(Utils.jsonificar(session));
    }

    // Logout. Borra el token de la cache
    public ResponseEntity<?> deleteSession(String token) throws Exception {
        // Se verifican los datos del usuario y el token de seguridad.
        Cache cache = cacheManager.getCache("infoSession");
        cache.evictIfPresent(token);
        return ResponseEntity.ok(Utils.jsonificar("deleted", token));
    }

    public AuthUsuario authenticateUsuario(String password, Usuario usuario) {
        //Aca se puede validar password, token, etc.
        AuthUsuario authUser = new AuthUsuario();
        authUser.setToken(jwtUtil.generateToken(String.valueOf(usuario.getIdUsuario())));
        authUser.setUsuario(usuario);
        return authUser;
    }

    public Session getSession(String token) {
        Cache cache = cacheManager.getCache("infoSession");
        Cache.ValueWrapper vWrapper = cache.get(token);
        if (vWrapper == null) return null;

        Session session = (Session) vWrapper.get();
        session.setLastActivity(new Date());
        return session;
    }
}
