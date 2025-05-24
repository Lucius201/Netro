package org.example.backend.config;

import org.example.backend.jwt.JwtAuthenticationFilter;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors
                        .configurationSource(req -> {
                            var cfg = new CorsConfiguration();
                            cfg.setAllowedOrigins(List.of("http://localhost:5173"));
                            cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                            cfg.setAllowedHeaders(List.of("*"));
                            cfg.setAllowCredentials(true);
                            return cfg;
                        }))
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)

                // hier wird unser JWT-Filter vor UsernamePassword… eingeschleust
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                .authorizeHttpRequests(auth -> auth
                        // Frontend-Routes und Static-Assets öffentlich
                        .requestMatchers(
                                HttpMethod.POST, "/",
                                "/login", "/register")
                        .permitAll()
                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()

                        // alle API-Routen erfordern Authentifizierung
                        .requestMatchers("/api/**").authenticated()

                        // alles andere ebenfalls geschützt
                        .anyRequest().authenticated());

        return http.build();
    }
}
