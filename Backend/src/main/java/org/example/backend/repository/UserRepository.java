package org.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.backend.user.UserEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);
//    Optional<UserEntity> findByFirstName(String firstName);
//    Optional<UserEntity> findByLastName(String lastName);



    @Query("select u.email from UserEntity u")
    List<String> listAllEmails();
    @Query("select u.firstName from UserEntity u")
    List<String> listAllFirstNames();
    @Query("select u.lastName from UserEntity u")
    List<String> listAllLastNames();
}
