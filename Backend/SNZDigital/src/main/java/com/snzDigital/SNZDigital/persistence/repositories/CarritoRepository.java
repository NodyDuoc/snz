package com.snzDigital.SNZDigital.persistence.repositories;

import com.snzDigital.SNZDigital.persistence.entity.CarritoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarritoRepository extends JpaRepository<CarritoEntity, Integer> {
    // Aquí puedes agregar métodos específicos si es necesario
}
