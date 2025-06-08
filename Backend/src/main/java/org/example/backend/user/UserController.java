package org.example.backend.user;

import lombok.RequiredArgsConstructor;
import org.example.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;

    public List<String> getAllEmails() {
        return userRepository.listAllEmails();
    }

    @GetMapping("/useremails")
    public List<String> listEmails() {

        return getAllEmails();
    }

    @GetMapping("/userlist")
    public List<UserDTO> getUserList() {
        List<String> emails = userRepository.listAllEmails();
        List<String> firstNames = userRepository.listAllFirstNames();
        List<String> lastNames = userRepository.listAllLastNames();

        List<UserDTO> result = new ArrayList<>();
        for (int i = 0; i < emails.size(); i++) {
            result.add(new UserDTO(emails.get(i), firstNames.get(i), lastNames.get(i)));
        }
        return result;
    }

    @PostMapping("/user")
    public UserDTO getUserByEmail(@RequestBody EmailRequest request) {
        String email = request.getEmail();

        String firstName = userRepository.findFirstNameByEmail(email);
        String lastName = userRepository.findLastNameByEmail(email);

        return new UserDTO(email, firstName, lastName);
    }
}
