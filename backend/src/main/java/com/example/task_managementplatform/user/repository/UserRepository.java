package com.example.task_managementplatform.user.repository;

import com.example.task_managementplatform.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/* Repository: face trecerea din Java in sql queries care se vor conecta la Postgresql */
public interface UserRepository extends JpaRepository<User, Long> {

    // cauta user dupa email
    Optional<User> findByEmail(String email);

}