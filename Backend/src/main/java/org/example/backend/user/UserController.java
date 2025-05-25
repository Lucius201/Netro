package org.example.backend.user;

import lombok.RequiredArgsConstructor;
import org.example.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// org.example.backend.web.UserController
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    public List<String> getAllEmails() {
        return userRepository.listAllEmails();
    }        // or inject the repo directly

    /**
     * Front-end already calls POST /users.
     * Keep it POST, or switch to GET – Spring-Security treats both the same here.
     */
    @GetMapping("/users")            // or @GetMapping if you prefer REST purity
    public List<String> listEmails() {
        // JwtAuthenticationFilter has already populated SecurityContext:
        // we are here only if the JWT cookie was valid.
        return getAllEmails();
    }
}
