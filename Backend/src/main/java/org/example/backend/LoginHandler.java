package org.example.backend;

import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class LoginHandler {

    @PostMapping("/login")
    public void login(@RequestBody LoginRequest request) {
        System.out.println("Email: " + request.getEmail());
        System.out.println("Password: " + request.getPassword());
    }
}
