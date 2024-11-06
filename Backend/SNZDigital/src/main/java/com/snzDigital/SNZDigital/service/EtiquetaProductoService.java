package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.EtiquetaProductoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.EtiquetaProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtiquetaProductoService {

    @Autowired
    private EtiquetaProductoRepository etiquetaProductoRepository;

    public List<EtiquetaProductoEntity> getAllEtiquetaProductos() {
        return etiquetaProductoRepository.findAll();
    }

    public Optional<EtiquetaProductoEntity> getEtiquetaProductoById(Integer id) {
        return etiquetaProductoRepository.findById(id);
    }

    public EtiquetaProductoEntity createEtiquetaProducto(EtiquetaProductoEntity etiquetaProducto) {
        return etiquetaProductoRepository.save(etiquetaProducto);
    }

    public EtiquetaProductoEntity updateEtiquetaProducto(Integer id, EtiquetaProductoEntity etiquetaProducto) {
        etiquetaProducto.setEtiquetaProductoId(id);
        return etiquetaProductoRepository.save(etiquetaProducto);
    }

    public void deleteEtiquetaProducto(Integer id) {
        etiquetaProductoRepository.deleteById(id);
    }
}
