package com.snzDigital.SNZDigital.service;

import com.snzDigital.SNZDigital.controller.dto.ProductoUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.snzDigital.SNZDigital.controller.dto.ProductoResponse;
import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import com.snzDigital.SNZDigital.persistence.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.snzDigital.SNZDigital.util.ResourceNotFoundException;
import java.util.Base64;
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

    // Método para obtener productos por categoría
    public List<ProductoEntity> getProductosByCategoria(Long categoriaCatId) {
        return productoRepository.findByCategoriaCatId(categoriaCatId);
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
    public ProductoEntity updateProducto(Long id, ProductoUpdateDTO productoDTO) {
        // Buscar el producto existente
        ProductoEntity productoExistente = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));

        // Actualizar solo los campos específicos
        productoExistente.setProductName(productoDTO.getProductName());
        productoExistente.setDescripcion(productoDTO.getDescripcion());
        productoExistente.setPrecio(productoDTO.getPrecio());

        if (productoDTO.getImagen() != null) {
            productoExistente.setImagen(productoDTO.getImagen());
        }

        // Guardar el producto actualizado
        return productoRepository.save(productoExistente);
    }

    public ProductoResponse getProductosByCategoria(Long categoriaCatId, int page, int size) {
        // Crear el PageRequest
        Pageable pageable = PageRequest.of(page, size);

        // Obtener productos paginados por categoría
        Page<ProductoEntity> productosPage = productoRepository.findByCategoriaCatId(categoriaCatId, pageable);
        // Convertir productos a ProductoResponse
        List<ProductoResponse> productosResponse = productosPage.getContent().stream()
                .map(producto -> new ProductoResponse(
                        producto.getProductId(),
                        producto.getProductName(),
                        producto.getDescripcion(),
                        producto.getImagen() != null ? Base64.getEncoder().encodeToString(producto.getImagen()) : "",
                        "Productos listados correctamente",
                        producto.getCategoriaCatId()
                ))
                .collect(Collectors.toList());

        // Construir el response final
        return new ProductoResponse("Productos listados correctamente", 200, productosResponse);
    }




}