package org.example.backend.login;

import org.example.backend.jwt.JwtUtils;
import org.example.backend.model.UserEntity;
import org.example.backend.repository.UserRepository;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
        System.out.println(req.toString());

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

        return ResponseEntity.ok(Map.of("token", token));
    }
}