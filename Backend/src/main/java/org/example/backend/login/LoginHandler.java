package org.example.backend.login;

import org.example.backend.jwt.JwtUtils;
import org.example.backend.repository.UserRepository;
import org.example.backend.user.UserEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class LoginHandler {

    private final JwtUtils jwt;

    private final UserRepository userRepo;

    private final BCryptPasswordEncoder encoder;

    public LoginHandler(JwtUtils jwt, UserRepository userRepo, BCryptPasswordEncoder encoder) {
        this.jwt = jwt;
        this.userRepo = userRepo;
        this.encoder = encoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Optional<UserEntity> existingUser = userRepo.findByEmail(req.getEmail());
        System.out.println(existingUser.isPresent());
        System.out.println(existingUser);
        // System.out.println(req.getEmail());
        System.out.println(req.getPassword());

        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "User not found"));
        }

        UserEntity user = existingUser.get();

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid password"));
        }

        String token = jwt.generate(user.getEmail());

        // HttpOnly-Cookie bauen
        ResponseCookie cookie = ResponseCookie.from("JWT", token)
                .httpOnly(true)
                .secure(false) // in Prod auf true setzen
                .path("/")
                .maxAge(Duration.ofHours(2))
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("status", "ok"));
    }
}