package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "ROL_USUARIO")

public class RoleEntity {
    @Id
    @Column(name = "ID_ROL_USUARIO")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "NOMBRE_ROL")
    @Enumerated(EnumType.STRING)
    private RoleEnum roleEnum;
}
