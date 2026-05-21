package com.example.task_managementplatform.project.entity;

import com.example.task_managementplatform.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "projects")

@Getter
@Setter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // nume proiect
    private String name;

    // descriere proiect
    private String description;

    // data creare
    private LocalDateTime createdAt;

    // ownerul proiectului - poate avea mai multe proiecte
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    // membrii proiectului - un proiect are multi useri - userii pot fi
    //in mai multe proiecte
    @ManyToMany
    @JoinTable(
            name = "project_members",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> members;

    // status proiect
    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    // soft delete - cand tstausul este archived

}