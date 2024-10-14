package com.snzDigital.SNZDigital.service;


import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<ProductoEntity> getAllProductos() {
        return productoRepository.findAll();
    }

    public Optional<ProductoEntity> getProductoById(Long id) {
        return productoRepository.findById(id);
    }

    public ProductoEntity createProducto(ProductoEntity producto) {
        return productoRepository.save(producto);
    }

    public ProductoEntity updateProducto(Long id, ProductoEntity producto) {
        producto.setProductId(id);
        return productoRepository.save(producto);
    }

    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }
}