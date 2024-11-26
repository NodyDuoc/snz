package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.DetalleCarritoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.DetalleCarritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetalleCarritoService {

    @Autowired
    private DetalleCarritoRepository detalleCarritoRepository;

    public List<DetalleCarritoEntity> getAllDetallesCarrito() {
        return detalleCarritoRepository.findAll();
    }

    public Optional<DetalleCarritoEntity> getDetalleCarritoById(Integer id) {
        return detalleCarritoRepository.findById(id);
    }

    public DetalleCarritoEntity createDetalleCarrito(DetalleCarritoEntity detalleCarrito) {
        return detalleCarritoRepository.save(detalleCarrito);
    }

    public DetalleCarritoEntity updateDetalleCarrito(Integer id, DetalleCarritoEntity detalleCarrito) {
        detalleCarrito.setIdDetalleCarrito(id);
        return detalleCarritoRepository.save(detalleCarrito);
    }

    public void deleteDetalleCarrito(Integer id) {
        detalleCarritoRepository.deleteById(id);
    }

    public List<DetalleCarritoEntity> getDetallesCarritoByUsuarioId(Integer id) {
        return detalleCarritoRepository.findByUsuarioIdUser(id);
    }

}
