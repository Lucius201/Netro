package org.example.backend.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // Base64-encoded 256-bit secret in application.properties, e.g.
    // jwt.secret=Zm9vYmFyYmF6cXV4MTIzNDU2Nzg5MGFiY2RlZg==
    @Value("${jwt.secret}")
    private String secret;

    // Tokenlaufzeit: 1 Stunde
    private final long EXP = 60 * 60 * 1000;

    /**
     * Erzeugt ein JWT mit der E-Mail als Subject.
     */
    public String generate(String email) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        Date now = new Date();
        Date expiry = new Date(now.getTime() + EXP);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Parst und validiert das JWT. Wirft eine Exception bei ungültigem Token.
     */
    public Jws<Claims> parse(String token) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }

    /**
     * Liest die im Token als Subject hinterlegte E-Mail aus.
     */
    public String getEmailFromToken(String token) {
        return parse(token).getBody().getSubject();
    }

    /**
     * Validiert das Token, ohne die Claims zurückzugeben.
     * 
     * @return true, wenn Signatur und Ablaufdatum korrekt sind.
     */
    public boolean validate(String token) {
        try {
            parse(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            // hier könntet ihr noch Logging einfügen
            return false;
        }
    }

    public boolean isTokenValid(String token) {
        return validate(token);
    }

    public String extractEmail(String token) {
        return getEmailFromToken(token);
    }



}
