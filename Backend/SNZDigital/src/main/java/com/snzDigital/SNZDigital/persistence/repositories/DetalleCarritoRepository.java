package com.snzDigital.SNZDigital.persistence.repositories;

import com.snzDigital.SNZDigital.persistence.entity.DetalleCarritoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleCarritoRepository extends JpaRepository<DetalleCarritoEntity, Integer> {
    List<DetalleCarritoEntity> findByUsuarioIdUser(Integer usuarioIdUser);
}
