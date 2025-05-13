package org.example.backend.register;

import org.example.backend.jwt.JwtUtils;
import org.example.backend.model.UserEntity;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class RegisterHandler {

    private final JwtUtils jwt;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public RegisterHandler(JwtUtils jwt) {
        this.jwt = jwt;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }

        String hashed = encoder.encode(req.getPassword());
        UserEntity user = new UserEntity(null, req.getEmail(), hashed);
        userRepo.save(user);

        String token = jwt.generate(user.getEmail());

        return ResponseEntity.ok(Map.of("token", token));
    }
}
