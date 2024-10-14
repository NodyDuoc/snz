package com.snzDigital.SNZDigital.persistence.repositories;

import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<ProductoEntity, Long> {
}