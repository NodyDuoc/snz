package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.EtiquetaEntity;
import com.snzDigital.SNZDigital.persistence.repositories.EtiquetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtiquetaService {

    @Autowired
    private EtiquetaRepository etiquetaRepository;

    public List<EtiquetaEntity> getAllEtiquetas() {
        return etiquetaRepository.findAll();
    }

    public Optional<EtiquetaEntity> getEtiquetaById(Integer id) {
        return etiquetaRepository.findById(id);
    }

    public EtiquetaEntity createEtiqueta(EtiquetaEntity etiqueta) {
        return etiquetaRepository.save(etiqueta);
    }

    public EtiquetaEntity updateEtiqueta(Integer id, EtiquetaEntity etiqueta) {
        etiqueta.setEtiquetaId(id);
        return etiquetaRepository.save(etiqueta);
    }

    public void deleteEtiqueta(Integer id) {
        etiquetaRepository.deleteById(id);
    }
}
