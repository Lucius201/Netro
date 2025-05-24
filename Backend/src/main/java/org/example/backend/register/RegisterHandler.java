package org.example.backend.register;

import org.example.backend.jwt.JwtUtils;
import org.example.backend.model.UserEntity;
import org.example.backend.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class RegisterHandler {

    private final JwtUtils jwt;

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public RegisterHandler(JwtUtils jwt, UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.jwt = jwt;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        System.out.println("Register endpoint accessed: " + request.getEmail());
        if (userRepository.existsByEmail(request.getEmail())) {
            System.out.println("Email already taken: " + request.getEmail());
            return ResponseEntity.badRequest().body("Email is already taken.");
        }
        try {
            // Hash the password
            String hashedPassword = passwordEncoder.encode(request.getPassword());
            // Log password (for debugging purposes—REMOVE IN PRODUCTION)
            System.out.println("Password hashed successfully.");

            // Create and save the user
            UserEntity user = new UserEntity();
            user.setEmail(request.getEmail());
            user.setPassword(hashedPassword);
            userRepository.save(user);
            System.out.println("New user saved: " + request.getEmail());

            // Generate the JWT token
            String token = jwt.generate(user.getEmail());

            ResponseCookie cookie = ResponseCookie.from("JWT", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(Duration.ofHours(2))
                    .sameSite("Lax")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(Map.of("status", "ok"));
        } catch (Exception e) {
            System.out.println("Exception occurred during registration: " + e.getMessage());
            throw e; // Rethrow the exception to see errors in logs
        }
    }
}