package com.snzDigital.SNZDigital.persistence.repositories;

import com.snzDigital.SNZDigital.persistence.entity.CategoriaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<CategoriaEntity, Integer> {
    // Puedes añadir métodos de consulta personalizados aquí si es necesario.
}
