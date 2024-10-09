package com.snzDigital.SNZDigital.persistence.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @SequenceGenerator(name = "user_seq", sequenceName = "USER_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @Column(name = "id_user")
    private Long id;

    @NotBlank
    @Size(max=20)
    @Column(name = "p_nombre")
    private String firstName;

    @NotBlank
    @Size(max=20)
    @Column(name = "m_nombre")
    private String secondName;  // Corregido: "SecondName" a "secondName"

    @NotBlank
    @Size(max=20)
    @Column(name = "ap_paterno")
    private String firstLastName;

    @NotBlank
    @Size(max=20)
    @Column(name = "ap_materno")
    private String secondLastName;


    @Email
    @NotBlank
    @Size(max=80)
    private String email;

    private String password;

    @Column(name = "activo")
    private boolean isActivated;

    @NotBlank
    @Size(max=12)
    @Column(name = "telefono")
    private String phone;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "role_id", nullable = false)
    private RoleEntity role;


}

