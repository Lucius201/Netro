package org.example.backend;

import org.springframework.web.bind.annotation.*;

@RestController
public class LoginHandler {

    @PostMapping("/login")
    public void login(@RequestBody LoginRequest request) {
        System.out.println("Username: " + request.getUsername());
        System.out.println("Password: " + request.getPassword());
    }
}
