package org.example.backend.jwt;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import io.jsonwebtoken.JwtException;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtFilter implements Filter {

    private final JwtUtils jwt;

    public JwtFilter(JwtUtils jwt) {
        this.jwt = jwt;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest r = (HttpServletRequest) req;
        HttpServletResponse s = (HttpServletResponse) res;
        System.out.println("[JwtFilter] servletPath=" + r.getServletPath()
                + "  requestURI=" + r.getRequestURI()
                + "  method=" + r.getMethod());

        // Use servletPath so we match exactly "/login"
        if ("/login".equals(r.getServletPath()) || "OPTIONS".equals(r.getMethod())) {
            chain.doFilter(req, res);
            return;
        }

        String header = r.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                jwt.parse(token); // throws on invalid/expired
                chain.doFilter(req, res);
                return;
            } catch (JwtException e) {
                // invalid → fall through to 401
            }
        } else {
            System.out.println("Missing or invalid Authorization header");
        }

        s.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
