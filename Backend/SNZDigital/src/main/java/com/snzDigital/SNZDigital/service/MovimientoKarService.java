package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.MovimientoKarEntity;
import com.snzDigital.SNZDigital.persistence.repositories.MovimientoKarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovimientoKarService {

    @Autowired
    private MovimientoKarRepository movimientoKarRepository;

    public List<MovimientoKarEntity> getAllMovimientos() {
        return movimientoKarRepository.findAll();
    }

    public Optional<MovimientoKarEntity> getMovimientoById(Integer id) {
        return movimientoKarRepository.findById(id);
    }

    public MovimientoKarEntity createMovimiento(MovimientoKarEntity movimientoKar) {
        return movimientoKarRepository.save(movimientoKar);
    }

    public MovimientoKarEntity updateMovimiento(Integer id, MovimientoKarEntity movimientoKar) {
        movimientoKar.setMovId(id);
        return movimientoKarRepository.save(movimientoKar);
    }

    public void deleteMovimiento(Integer id) {
        movimientoKarRepository.deleteById(id);
    }
}
