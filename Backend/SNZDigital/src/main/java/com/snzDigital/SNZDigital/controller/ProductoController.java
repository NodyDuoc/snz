package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import com.snzDigital.SNZDigital.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/getall")
    public List<ProductoEntity> getAllProductos() {
        return productoService.getAllProductos();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductoEntity> getProductoById(@PathVariable Long id) {
        Optional<ProductoEntity> producto = productoService.getProductoById(id);
        return producto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/create")
    public ResponseEntity<ProductoEntity> createProducto(@RequestBody ProductoEntity producto) {
        ProductoEntity createdProducto = productoService.createProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProducto);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductoEntity> updateProducto(@PathVariable Long id, @RequestBody ProductoEntity producto) {
        ProductoEntity updatedProducto = productoService.updateProducto(id, producto);
        return ResponseEntity.ok(updatedProducto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }
}
