package com.example.task_managementplatform.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.task_managementplatform.project.entity.Project;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

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

    //conectare cu tabela de la Proiect: ++ modificari in repo Proiect
    @JsonIgnore //mappedBy - nu mai creeaza tabela noua
    @ManyToMany(mappedBy = "members")
    private List<Project> projects;

}