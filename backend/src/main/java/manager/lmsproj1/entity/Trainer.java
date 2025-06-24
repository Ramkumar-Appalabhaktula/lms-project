package manager.lmsproj1.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "trainers", uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
@Getter
@Setter
public class Trainer {

    @Id
    @Column(name = "trainer_id", nullable = false)
    private String trainerId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "role")
    private String role;

    @Column(name = "course")
    private String course;

    @Column(name = "subject")
    private String subject;

    @Column(name = "status")
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Manager manager;
}