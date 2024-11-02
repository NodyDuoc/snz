package com.snzDigital.SNZDigital.persistence.repositories;

import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<ProductoEntity, Long> {
    // Método para obtener productos por categoría
    List<ProductoEntity> findByCategoriaCatId(Long categoriaCatId);

    // Método para obtener productos por categoría con paginación
    Page<ProductoEntity> findByCategoriaCatId(Long categoriaCatId, Pageable pageable);

}