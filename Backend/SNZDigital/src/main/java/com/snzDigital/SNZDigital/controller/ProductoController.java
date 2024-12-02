package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.ProductoResponse;
import com.snzDigital.SNZDigital.controller.dto.ProductoUpdateDTO;
import com.snzDigital.SNZDigital.persistence.entity.ProductoEntity;
import com.snzDigital.SNZDigital.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/getall")
    public ResponseEntity<ProductoResponse> getAllProductosActivos() {
        List<ProductoEntity> productos = productoService.getAllProductosActivos();
        return ResponseEntity.ok(new ProductoResponse("Productos obtenidos con éxito", HttpStatus.OK.value(), productos));
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<ProductoResponse> getProductoById(@PathVariable Long id) {
        Optional<ProductoEntity> producto = productoService.getProductoById(id);
        return producto.map(p -> ResponseEntity.ok(new ProductoResponse("Producto encontrado", HttpStatus.OK.value(), p)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ProductoResponse("Producto no encontrado", HttpStatus.NOT_FOUND.value(), null)));
    }

    @GetMapping("/categoria/{categoriaCatId}")
    public List<ProductoEntity> getProductosByCategoria(@PathVariable Long categoriaCatId) {
        return productoService.getProductosByCategoria(categoriaCatId);
    }

    @GetMapping("/categoria/paginado/{categoriaCatId}")
    public ProductoResponse getProductosByCategoria(
            @PathVariable Long categoriaCatId,
            @RequestParam(defaultValue = "0") int page, // Página por defecto 0
            @RequestParam(defaultValue = "6") int size) { // Tamaño por defecto 6
        return productoService.getProductosByCategoria(categoriaCatId, page, size);
    }

    @PostMapping("/create")
    public ResponseEntity<ProductoResponse> createProducto(
            @RequestParam("productName") String productName,
            @RequestParam("descripcion") String descripcion,
            @RequestParam(value = "status", required = false) Integer status,
            @RequestParam("precio") Double precio,
            @RequestParam(value = "categoriaCatId", required = false) Long categoriaCatId,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen,
            @RequestParam("marca") String marca) {

        // Establecer el valor predeterminado de 'status' a 1 (activo/true) si es nulo
        if (status == null) {
            status = 1; // Visible por defecto
        }

        // Llamar al servicio para crear el producto
        ProductoResponse productoResponse = productoService.createProducto(
                productName, descripcion, status, precio, categoriaCatId, imagen, marca);

        // Retornar la respuesta
        return new ResponseEntity<>(productoResponse, HttpStatus.CREATED);
    }




    @PutMapping("/update/{id}")
    public ResponseEntity<ProductoResponse> updateProducto(
            @PathVariable Long id,
            @RequestParam("productName") String productName,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen,
            @RequestParam("marca") String marca,
            @RequestParam(value = "status", required = false) Integer status) {

        // Asignar valor predeterminado si 'status' es null



        ProductoUpdateDTO productoDTO = new ProductoUpdateDTO();
        productoDTO.setProductName(productName);
        productoDTO.setDescripcion(descripcion);
        productoDTO.setPrecio(precio);
        productoDTO.setMarca(marca);
        productoDTO.setStatus(status != null ? status : 0); // Por defecto, 0 si es null


        if (imagen != null && !imagen.isEmpty()) {
            try {
                productoDTO.setImagen(imagen.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error al procesar la imagen", e);
            }
        }

        ProductoEntity updatedProducto = productoService.updateProducto(id, productoDTO);
        return ResponseEntity.ok(new ProductoResponse("Producto actualizado con éxito", HttpStatus.OK.value(), updatedProducto));
    }




    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ProductoResponse> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.ok(new ProductoResponse("Producto eliminado con éxito", HttpStatus.NO_CONTENT.value(), null));
    }
}
