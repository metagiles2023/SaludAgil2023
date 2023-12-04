package com.metagiles.demometagiles.models.sesion;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SessionCacheController {
    private final SessionCacheService sessionCacheService;

    public SessionCacheController(SessionCacheService sessionCacheService) {
        this.sessionCacheService = sessionCacheService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> createSession(@RequestBody LoginRequest loginRequest) throws Exception {
        return sessionCacheService.createSession(loginRequest.getDni(), "password");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> deleteSession(@RequestHeader("Authorization") String token) throws Exception {
        return sessionCacheService.deleteSession(token);
    }

    // @PostMapping("/setInfoSession")
    // public ResponseEntity<?> setInfoSession(@RequestBody InfoSessionRequest infoSessionRequest) throws Exception {
    //     return dbConnectionCacheService.setInfoSession(infoSessionRequest);
    // }
}
