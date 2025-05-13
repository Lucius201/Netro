package org.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class LoginHandler {

    @Autowired
    private JwtUtils jwt;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        System.out.println("[LoginHandler] got email=" + req.getEmail()
                + " password=" + req.getPassword());

        if ("foo@bar.com".equals(req.getEmail())
                && "secret".equals(req.getPassword())) {
            String token = jwt.generate(req.getEmail());
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid credentials"));
    }
}
