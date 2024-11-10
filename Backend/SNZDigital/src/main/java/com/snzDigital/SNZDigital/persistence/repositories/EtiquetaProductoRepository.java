package com.snzDigital.SNZDigital.persistence.repositories;

import com.snzDigital.SNZDigital.persistence.entity.EtiquetaProductoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface EtiquetaProductoRepository extends JpaRepository<EtiquetaProductoEntity, Integer> {
    Optional<EtiquetaProductoEntity> findByProductIdAndEtiquetaId(Integer productId, Integer etiquetaId);

    void deleteByProductIdAndEtiquetaId(Integer productId, Integer etiquetaId);
}


