package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.KardexEntity;
import com.snzDigital.SNZDigital.persistence.repositories.KardexRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KardexService {

    @Autowired
    private KardexRepository kardexRepository;

    public List<KardexEntity> getAllKardex() {
        return kardexRepository.findAll();
    }

    public Optional<KardexEntity> getKardexById(Integer id) {
        return kardexRepository.findById(id);
    }

    public KardexEntity createKardex(KardexEntity kardex) {
        return kardexRepository.save(kardex);
    }

    public KardexEntity updateKardex(Integer id, KardexEntity kardex) {
        kardex.setKardexId(id);
        return kardexRepository.save(kardex);
    }

    public void deleteKardex(Integer id) {
        kardexRepository.deleteById(id);
    }
}
