package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.ValoracionEntity;
import com.snzDigital.SNZDigital.persistence.repositories.ValoracionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ValoracionService {

    @Autowired
    private ValoracionRepository valoracionRepository;

    // Obtener todas las valoraciones
    public List<ValoracionEntity> getAllValoraciones() {
        return valoracionRepository.findAll();
    }

    // Obtener una valoración por ID
    public Optional<ValoracionEntity> getValoracionById(Integer id) {
        return valoracionRepository.findById(id);
    }

    // Crear una nueva valoración
    public ValoracionEntity createValoracion(ValoracionEntity valoracion) {
        return valoracionRepository.save(valoracion);
    }

    // Actualizar una valoración existente
    public ValoracionEntity updateValoracion(Integer id, ValoracionEntity valoracion) {
        valoracion.setValid(id);
        return valoracionRepository.save(valoracion);
    }

    // Eliminar una valoración por ID
    public void deleteValoracion(Integer id) {
        valoracionRepository.deleteById(id);
    }
}
