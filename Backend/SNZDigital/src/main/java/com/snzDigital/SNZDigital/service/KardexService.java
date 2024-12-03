package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.controller.dto.ProductoInventarioResponse;
import com.snzDigital.SNZDigital.persistence.entity.KardexEntity;
import com.snzDigital.SNZDigital.persistence.repositories.KardexRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class KardexService {

    @Autowired
    private KardexRepository kardexRepository;

    @Autowired
    private ProductoService productoService;

    public List<KardexEntity> getAllKardex() {
        return kardexRepository.findAll();
    }

    public Optional<KardexEntity> getKardexById(Integer id) {
        return kardexRepository.findById(id);
    }

    public KardexEntity createKardex(KardexEntity kardex) {

        // Guardar el registro en Kardex

        // Obtener el producto relacionado por su ID
        Integer productoId = kardex.getProductoProductId();
        ProductoInventarioResponse productoInventario = productoService.getProductoInventarioById(Long.valueOf(productoId));

        // Calcular los valores
        BigDecimal total = kardex.getEntrada().subtract(kardex.getSalida());
        BigDecimal inventarioDisponible = BigDecimal.valueOf(productoInventario.getInventarioDisponible()).add(total); // Sumar valores
        BigDecimal inventario = inventarioDisponible.add(BigDecimal.valueOf(productoInventario.getReserva())); // Inventario = inventarioDisponible + reserva
        // Actualizar el inventario del producto
        productoService.updateInventarioById(Long.valueOf(productoId), inventario.intValueExact(), inventarioDisponible.intValueExact(), productoInventario.getReserva());
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
