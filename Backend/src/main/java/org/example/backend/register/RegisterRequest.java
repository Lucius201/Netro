package org.example.backend.register;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
}
