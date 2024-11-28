package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.GuiaEntity;
import com.snzDigital.SNZDigital.persistence.repositories.GuiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuiaService {

    @Autowired
    private GuiaRepository guiaRepository;

    public List<GuiaEntity> getAllGuias() {
        return guiaRepository.findAll();
    }

    public Optional<GuiaEntity> getGuiaById(Integer id) {
        return guiaRepository.findById(id);
    }

    public GuiaEntity createGuia(GuiaEntity guia) {
        return guiaRepository.save(guia);
    }

    public GuiaEntity updateGuia(Integer id, GuiaEntity guia) {
        guia.setGuiaId(id);
        return guiaRepository.save(guia);
    }

    public void deleteGuia(Integer id) {
        guiaRepository.deleteById(id);
    }
}
