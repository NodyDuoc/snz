package com.snzDigital.SNZDigital.persistence.repositories;

import com.snzDigital.SNZDigital.persistence.entity.GuiaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuiaRepository extends JpaRepository<GuiaEntity, Integer> {
}
