package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.persistence.entity.EtiquetaProductoEntity;
import com.snzDigital.SNZDigital.persistence.entity.EtiquetaEntity;
import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.EtiquetaProductoRepository;
import com.snzDigital.SNZDigital.persistence.repositories.EtiquetaRepository;
import com.snzDigital.SNZDigital.persistence.repositories.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Optional;

@Service
public class EtiquetaProductoService {

    @Autowired
    private final EtiquetaProductoRepository etiquetaProductoRepository;
    private final EtiquetaRepository etiquetaRepository;
    private final ProductoRepository productoRepository;

    public EtiquetaProductoService(EtiquetaProductoRepository etiquetaProductoRepository, EtiquetaRepository etiquetaRepository, ProductoRepository productoRepository) {
        this.etiquetaProductoRepository = etiquetaProductoRepository;
        this.etiquetaRepository = etiquetaRepository;
        this.productoRepository = productoRepository;
    }

    public List<EtiquetaEntity> getEtiquetasByProductId(Integer productId) {
        // Obtener las relaciones de etiqueta-producto por productId
        List<EtiquetaProductoEntity> etiquetaProductoEntities = etiquetaProductoRepository.findByProductId(productId);

        // Convertir cada etiquetaId en una entidad Etiqueta
        return etiquetaProductoEntities.stream()
                .map(etiquetaProducto -> etiquetaRepository.findById(etiquetaProducto.getEtiquetaId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    public List<ProductoEntity> getProductosDetalleByEtiquetaId(Integer etiquetaId) {
        // Obtener todas las relaciones etiqueta-producto por etiquetaId
        List<EtiquetaProductoEntity> etiquetaProductoEntities = etiquetaProductoRepository.findByEtiquetaId(etiquetaId);

        // Convertir cada productId en una entidad Producto y obtener sus detalles completos
        return etiquetaProductoEntities.stream()
                .map(etiquetaProducto -> productoRepository.findById(Long.valueOf(etiquetaProducto.getProductId())))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

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
    public boolean existeEtiquetaProducto(Integer productId, Integer etiquetaId) {
        return etiquetaProductoRepository.findByProductIdAndEtiquetaId(productId, etiquetaId).isPresent();
    }

    @Transactional
    public void deleteByProductIdAndEtiquetaId(Integer productId, Integer etiquetaId) {
        etiquetaProductoRepository.deleteByProductIdAndEtiquetaId(productId, etiquetaId);
    }

    public List<EtiquetaProductoEntity> getEtiquetaProductosByProductId(Integer productId) {
        return etiquetaProductoRepository.findByProductId(productId);
    }

    public List<EtiquetaProductoEntity> getProductosByEtiquetaId(Integer etiquetaId) {
        return etiquetaProductoRepository.findByEtiquetaId(etiquetaId);
    }


}
