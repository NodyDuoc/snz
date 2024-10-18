package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.CarritoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.CarritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    public List<CarritoEntity> getAll() {
        return carritoRepository.findAll();
    }

    public Optional<CarritoEntity> getById(Integer id) {
        return carritoRepository.findById(id);
    }

    public CarritoEntity create(CarritoEntity carrito) {
        return carritoRepository.save(carrito);
    }

    public CarritoEntity update(Integer id, CarritoEntity carrito) {
        carrito.setIdCarrito(id);
        return carritoRepository.save(carrito);
    }

    public void delete(Integer id) {
        carritoRepository.deleteById(id);
    }
}
