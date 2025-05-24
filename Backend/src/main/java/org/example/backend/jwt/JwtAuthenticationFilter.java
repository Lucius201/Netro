package org.example.backend.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    public JwtAuthenticationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException,
            IOException {
        // 1) JWT aus Cookie holen
        String token = null;
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if ("JWT".equals(c.getName())) {
                    token = c.getValue();
                }
            }
        }

        // 2) Token validieren und Authentication setzen
        if (token != null && jwtUtils.validate(token)) {
            String email = jwtUtils.getEmailFromToken(token);
            var auth = new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    List.of() // oder eure GrantedAuthorities
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // 3) Filter-Chain fortsetzen
        filterChain.doFilter(request, response);
    }
}
