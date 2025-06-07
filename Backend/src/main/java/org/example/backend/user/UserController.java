package org.example.backend.user;

import lombok.RequiredArgsConstructor;
import org.example.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

// org.example.backend.web.UserController
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    public List<String> getAllEmails() {
        return userRepository.listAllEmails();
    }        // or inject the repo directly
//    public List<String> getAllUsers() {
//        return userRepository.listAllUsernames();
//    }
    /**
     * Front-end already calls POST /users.
     * Keep it POST, or switch to GET – Spring-Security treats both the same here.
     */
    @GetMapping("/useremails")            // or @GetMapping if you prefer REST purity
    public List<String> listEmails() {
        // JwtAuthenticationFilter has already populated SecurityContext:
        // we are here only if the JWT cookie was valid.
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


//    @PostMapping("/userfirstnames")
//    public List<String> listUsers(@RequestBody Map<String, String> request) {
//        String email = request.get("email");
//
//        int index = usersEmails.indexOf(email);
//        if (index != -1 && index < usersFirstNames.size()) {
//            usersFirstNames.remove(index);
//            usersEmails.remove(index); // Optional: keep lists in sync
//        }
//
//        return usersFirstNames;
//    }
}
