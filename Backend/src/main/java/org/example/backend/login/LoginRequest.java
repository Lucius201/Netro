package org.example.backend.login;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@Data
public class LoginRequest {
    private String email;
    private String password;
}
