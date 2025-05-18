package org.example.backend.jwt;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtFilter implements Filter {

    private final JwtUtils jwt;

    public JwtFilter(JwtUtils jwt) {
        this.jwt = jwt;
    }

    //    @Override
//    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
//            throws IOException, ServletException {
//        HttpServletRequest r = (HttpServletRequest) req;
//        HttpServletResponse s = (HttpServletResponse) res;
//        System.out.println("[JwtFilter] servletPath=" + r.getServletPath()
//                + "  requestURI=" + r.getRequestURI()
//                + "  method=" + r.getMethod());
//
//        if ("/login".equals(r.getServletPath())
//                || "/register".equals(r.getServletPath())
//                || "OPTIONS".equals(r.getMethod())) {
//            System.out.println("JwtFilter bypassing: " + r.getServletPath());
//            chain.doFilter(req, res);
//            return;
//        }
//
//
//        String header = r.getHeader("Authorization");
//        if (header != null && header.startsWith("Bearer ")) {
//            String token = header.substring(7);
//            try {
//                jwt.parse(token); // throws on invalid/expired
//                chain.doFilter(req, res);
//                return;
//            } catch (JwtException e) {
//                // invalid → fall through to 401
//            }
//        } else {
//            System.out.println("Missing or invalid Authorization header");
//        }
//
//        s.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//    }
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest r = (HttpServletRequest) req;
        HttpServletResponse s = (HttpServletResponse) res;
        System.out.println("[JwtFilter] Incoming request to servletPath=" + r.getServletPath()
                + " requestURI=" + r.getRequestURI()
                + " method=" + r.getMethod());

        if ("/login".equals(r.getServletPath())
                || "/register".equals(r.getServletPath())
                || "OPTIONS".equals(r.getMethod())) {
            System.out.println("[JwtFilter] Bypassing authentication for path: " + r.getServletPath());
            chain.doFilter(req, res);
            return;
        }

        System.out.println("[JwtFilter] Checking Authorization header for path: " + r.getServletPath());
        String header = r.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                jwt.parse(token); // Parse and validate the token
                System.out.println("[JwtFilter] Token valid, proceeding with request.");
                chain.doFilter(req, res);
                return;
            } catch (JwtException e) {
                System.err.println("[JwtFilter] Invalid/expired token: " + e.getMessage());
            }
        } else {
            System.out.println("[JwtFilter] Missing or invalid Authorization header.");
        }

        s.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        System.out.println("[JwtFilter] Request blocked with 401 Unauthorized!");
    }
}
