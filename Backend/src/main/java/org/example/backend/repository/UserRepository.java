package org.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.backend.user.UserEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);


    @Query("select u.email from UserEntity u")
    List<String> listAllEmails();

}
