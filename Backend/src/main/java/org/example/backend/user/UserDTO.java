package org.example.backend.user;

public class UserDTO {
    public String email;
    public String firstName;
    public String lastName;

    public UserDTO(String email, String firstName, String lastName) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
