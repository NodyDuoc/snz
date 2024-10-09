package com.snzDigital.SNZDigital.persistence.repositories;


import com.snzDigital.SNZDigital.persistence.entity.RoleEntity;
import com.snzDigital.SNZDigital.persistence.entity.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByRoleEnum(RoleEnum roleEnum);
}