package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.ImagenProductoResponse;
import com.snzDigital.SNZDigital.persistence.entity.ImagenProductoEntity;
import com.snzDigital.SNZDigital.service.ImagenProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/imagenes-productos")
public class ImagenProductoController {

    @Autowired
    private ImagenProductoService imagenProductoService;

    @GetMapping("/getall")
    public ResponseEntity<List<ImagenProductoEntity>> getAllImagenes() {
        List<ImagenProductoEntity> imagenes = imagenProductoService.getAllImagenes();
        return ResponseEntity.ok(imagenes);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ImagenProductoResponse> getImagenById(@PathVariable Long id) {
        Optional<ImagenProductoEntity> imagen = imagenProductoService.getImagenById(id);
        if (imagen.isPresent()) {
            return ResponseEntity.ok(new ImagenProductoResponse("Imagen encontrada", HttpStatus.OK.value(), imagen.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ImagenProductoResponse("Imagen no encontrada", HttpStatus.NOT_FOUND.value(), null));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ImagenProductoResponse> createImagen(@RequestBody ImagenProductoEntity imagenProducto) {
        ImagenProductoEntity createdImagen = imagenProductoService.createImagenProducto(imagenProducto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ImagenProductoResponse("Imagen creada con éxito", HttpStatus.CREATED.value(), createdImagen));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ImagenProductoResponse> updateImagen(@PathVariable Long id, @RequestBody ImagenProductoEntity imagenProducto) {
        ImagenProductoEntity updatedImagen = imagenProductoService.updateImagenProducto(id, imagenProducto);
        return ResponseEntity.ok(new ImagenProductoResponse("Imagen actualizada con éxito", HttpStatus.OK.value(), updatedImagen));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ImagenProductoResponse> deleteImagen(@PathVariable Long id) {
        imagenProductoService.deleteImagenProducto(id);
        return ResponseEntity.ok(new ImagenProductoResponse("Imagen eliminada con éxito", HttpStatus.NO_CONTENT.value(), null));
    }
}
