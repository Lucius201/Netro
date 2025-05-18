package org.example.backend.register;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@Data
public class RegisterRequest {
    private String email;
    private String password;
}
