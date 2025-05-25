package org.example.backend.jwt;

import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final JwtUtils jwtUtils;

    public JwtService(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    public boolean isTokenValid(String token) {
        return jwtUtils.isTokenValid(token);
    }

    public String extractEmail(String token) {
        return jwtUtils.extractEmail(token); // Oder extractUserId(token), je nachdem wie du es nennst
    }
}
