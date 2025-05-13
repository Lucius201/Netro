// src/main/java/org/example/backend/config/SecurityConfig.java
package org.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // disable CSRF so your POST /login isn’t blocked
                .csrf(AbstractHttpConfigurer::disable)

                // turn off the default Basic‐Auth login prompt
                .httpBasic(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth
                        // let anyone POST to /login
                        .requestMatchers("/login").permitAll()
                        // and still allow all /api/** for testing
                        .requestMatchers("/api/**").permitAll()
                        // everything else requires a valid JWT (once you re‐enable it)
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
