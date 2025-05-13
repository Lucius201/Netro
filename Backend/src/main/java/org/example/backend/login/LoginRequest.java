package org.example.backend;

@lombok.Getter
@lombok.AllArgsConstructor
@lombok.EqualsAndHashCode
public class LoginRequest {
    private String email;
    private String password;
}
