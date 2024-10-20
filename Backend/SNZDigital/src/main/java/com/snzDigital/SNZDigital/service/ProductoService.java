package com.snzDigital.SNZDigital.service;


import com.snzDigital.SNZDigital.controller.dto.ProductoResponse;
import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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


    public ProductoResponse createProducto(String productName, String descripcion, Double precio, Long categoriaCatId, MultipartFile imagen) {
        ProductoEntity producto = new ProductoEntity();
        producto.setProductName(productName);
        producto.setDescripcion(descripcion);
        producto.setPrecio(precio);
        producto.setCategoriaCatId(categoriaCatId);

        // Convertir MultipartFile a byte[]
        if (imagen != null && !imagen.isEmpty()) {
            try {
                byte[] imagenBytes = imagen.getBytes();
                producto.setImagen(imagenBytes);
            } catch (IOException e) {
                return new ProductoResponse("Error al procesar la imagen", 500, null);
            }
        }

        // Guardar el producto en la base de datos
        ProductoEntity savedProducto = productoRepository.save(producto);

        return new ProductoResponse("Producto creado exitosamente", 201, savedProducto);
    }

    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }

    // Agregamos el método para actualizar un producto
    public ProductoEntity updateProducto(Long id, ProductoEntity producto) {
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado con ID: " + id);
        }
        producto.setProductId(id); // Aseguramos que el ID se setea correctamente
        return productoRepository.save(producto);
    }
}