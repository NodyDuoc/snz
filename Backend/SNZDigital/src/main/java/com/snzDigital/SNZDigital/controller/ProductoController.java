package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.ProductoResponse;
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
    public ResponseEntity<ProductoResponse> getAllProductos() {
        List<ProductoEntity> productos = productoService.getAllProductos();
        return ResponseEntity.ok(new ProductoResponse("Productos obtenidos con éxito", HttpStatus.OK.value(), productos));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductoResponse> getProductoById(@PathVariable Long id) {
        Optional<ProductoEntity> producto = productoService.getProductoById(id);
        return producto.map(p -> ResponseEntity.ok(new ProductoResponse("Producto encontrado", HttpStatus.OK.value(), p)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ProductoResponse("Producto no encontrado", HttpStatus.NOT_FOUND.value(), null)));
    }

    @PostMapping("/create")
    public ResponseEntity<ProductoResponse> createProducto(@RequestBody ProductoEntity producto) {
        ProductoEntity createdProducto = productoService.createProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ProductoResponse("Producto creado con éxito", HttpStatus.CREATED.value(), createdProducto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductoResponse> updateProducto(@PathVariable Long id, @RequestBody ProductoEntity producto) {
        ProductoEntity updatedProducto = productoService.updateProducto(id, producto);
        return ResponseEntity.ok(new ProductoResponse("Producto actualizado con éxito", HttpStatus.OK.value(), updatedProducto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ProductoResponse> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.ok(new ProductoResponse("Producto eliminado con éxito", HttpStatus.NO_CONTENT.value(), null));
    }
}
