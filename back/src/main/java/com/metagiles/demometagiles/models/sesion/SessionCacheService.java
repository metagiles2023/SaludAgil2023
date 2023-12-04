package com.metagiles.demometagiles.models.sesion;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;

import org.apache.catalina.SessionIdGenerator;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.Cache.ValueWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.metagiles.demometagiles.models.usuario.AuthUsuario;
import com.metagiles.demometagiles.models.usuario.Usuario;
import com.metagiles.demometagiles.models.usuario.UsuarioRepository;
import com.metagiles.demometagiles.utils.Utils;

@Service
public class SessionCacheService {
    private final CacheManager cacheManager;
    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;
    private String secretKey;
    private String cacheName = "infoSession";
    public SessionCacheService(CacheManager cacheManager, JwtUtil jwtUtil, UsuarioRepository usuarioRepository) {
        this.cacheManager = cacheManager;
        this.jwtUtil = jwtUtil;
        this.usuarioRepository = usuarioRepository;
    }

    /*
     * Retorna usuario con token o mensaje de error.
     * Pone en la cache el par <token, Session>
     * En la Session tambien esta el token: redundante pero mejor.
     */
    public ResponseEntity<?> createSession(String dni, String password) throws Exception {
        // Se verifican los datos del usuario y el token de seguridad.
        ArrayList<Usuario> usuarios = usuarioRepository.getBydni(dni);
        System.out.println("vino dni" + dni);
        Usuario usuario = null;
        //obtener el de mas alto rol.
        //Lo voy a hacer mal para hacerlo rapido
        //Lo correcto seria redefinir compareTo() para getRol()
        for (int i = 0; i < usuarios.size(); i++) {
            Usuario thisUsuario = usuarios.get(i);
            if (usuario == null || thisUsuario.getRol().equals("administrador")) {
                usuario = thisUsuario;
                break;
            }
            if (!usuario.getRol().equals("administrador") && thisUsuario.getRol().equals("medico")){
                usuario = thisUsuario;
                break;
            }
        }
        System.out.println("im logging in a " + usuario.getRol() + "with dni " + usuario.getDni());
        Cache cache = cacheManager.getCache(cacheName);
        AuthUsuario authUsuario = authenticateUsuario(password, usuario); // Mock de autenticacion
        Session session = new Session(authUsuario.getToken(), usuario);
        try {
            cache.put(authUsuario.getToken(), session);
            System.out.println("his token will be the following");
            System.out.println(authUsuario.getToken());
            System.out.println("Logged in " + usuario.getDni());
        } catch (Exception e) { 
            return Utils.genResponseError("Error almacenando token y sesion: " + e.getMessage());
        }
        // Quiero retornar el usuario, no solamente el token.
        return ResponseEntity.ok(Utils.jsonificar(session));
    }

    // Logout. Borra el token de la cache
    public ResponseEntity<?> deleteSession(String token) throws Exception {
        // Se verifican los datos del usuario y el token de seguridad.
        Cache cache = cacheManager.getCache(cacheName);
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
        Cache cache = cacheManager.getCache(cacheName);
        Cache.ValueWrapper vWrapper = cache.get(token);
        if (vWrapper == null) {
            System.out.println("vWrapper is null");
            return null;
        }
        
        Session session = (Session) vWrapper.get();
        Date now = new Date();
        Date twentyMinutesAgo = new Date(now.getTime() - 20 * 60 * 1000); // Subtract 20 minutes from current time
        if(session.getLastActivity().before(twentyMinutesAgo)) {
            cache.evictIfPresent(token);
            System.out.println("evicting if present, and return null");
            return null;
        }
        session.setLastActivity(new Date());
        return session;
    }
    
}
