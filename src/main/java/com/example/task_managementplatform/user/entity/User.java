package com.example.task_managementplatform.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // email unic pentru utilizator
    @Column(nullable = false, unique = true)
    private String email;

    // parola utilizatorului
    @Column(nullable = false)
    private String password;

    // numele complet
    @Column(nullable = false)
    private String fullName;

    // rolul utilizatorului
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // user activ sau dezactivat
    @Column(nullable = false)
    private boolean active = true;

}