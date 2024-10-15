package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.DireccionEntity;
import com.snzDigital.SNZDigital.persistence.repositories.DireccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DireccionService {

    @Autowired
    private DireccionRepository direccionRepository;

    // Obtener todas las direcciones
    public List<DireccionEntity> getAllDirecciones() {
        return direccionRepository.findAll();
    }

    // Obtener una dirección por ID
    public Optional<DireccionEntity> getDireccionById(Long id) {
        return direccionRepository.findById(id);
    }

    // Crear una nueva dirección
    public DireccionEntity createDireccion(DireccionEntity direccion) {
        return direccionRepository.save(direccion);
    }

    // Actualizar una dirección existente
    public DireccionEntity updateDireccion(Long id, DireccionEntity direccion) {
        direccion.setDirId(id);
        return direccionRepository.save(direccion);
    }

    // Eliminar una dirección por ID
    public void deleteDireccion(Long id) {
        direccionRepository.deleteById(id);
    }
}
