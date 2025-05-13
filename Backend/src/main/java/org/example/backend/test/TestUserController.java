// src/main/java/org/example/backend/controller/UserTestController.java
package org.example.backend.test;

import org.example.backend.model.UserEntity;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestUserController {

    private final UserRepository userRepository;

    @Autowired
    public TestUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * A simple GET endpoint to insert a user.
     * e.g. GET http://localhost:8080/api/createTestUser
     */
    @GetMapping("/createTestUser")
    public String createTestUser() {
        // (1) create a new UserEntity with hard‐coded values
        UserEntity u = new UserEntity();
        u.setEmail("test@example.com");
        u.setPassword("secret");

        // (2) save to DB
        UserEntity saved = userRepository.save(u);

        // (3) return a confirmation
        return "Created user with ID = " + saved.getId();
    }


}
