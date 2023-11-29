package com.metagiles.demometagiles.models.sesion;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.metagiles.demometagiles.utils.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    // methods for creating, parsing, and validating tokens
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String generateToken(String idUsuario, Date expirationDate) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(idUsuario)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public String generateToken(String idUsuario) {
        Date now = new Date();
        Date expirationDate = Utils.generateDate();
        return Jwts.builder()
                .setSubject(idUsuario)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    private Claims extractClaims(String token) {
        return Jwts.parser().parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
