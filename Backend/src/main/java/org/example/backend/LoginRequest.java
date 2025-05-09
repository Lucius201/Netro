package org.example.backend;

public class LoginRequest {
    private String email;
    private String password;

    // Jackson needs a no‐arg constructor
    public LoginRequest() {
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
