package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.persistence.entity.DireccionEntity;
import com.snzDigital.SNZDigital.service.DireccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/direcciones")
public class DireccionController {

    @Autowired
    private DireccionService direccionService;

    // Obtener todas las direcciones
    @GetMapping("/getall")
    public List<DireccionEntity> getAllDirecciones() {
        return direccionService.getAllDirecciones();
    }

    // Obtener una dirección por ID
    @GetMapping("/get/{id}")
    public ResponseEntity<DireccionEntity> getDireccionById(@PathVariable Long id) {
        Optional<DireccionEntity> direccion = direccionService.getDireccionById(id);
        return direccion.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Crear una nueva dirección
    @PostMapping("/create")
    public ResponseEntity<DireccionEntity> createDireccion(@RequestBody DireccionEntity direccion) {
        DireccionEntity createdDireccion = direccionService.createDireccion(direccion);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDireccion);
    }

    // Actualizar una dirección existente
    @PutMapping("/update/{id}")
    public ResponseEntity<DireccionEntity> updateDireccion(@PathVariable Long id, @RequestBody DireccionEntity direccion) {
        DireccionEntity updatedDireccion = direccionService.updateDireccion(id, direccion);
        return ResponseEntity.ok(updatedDireccion);
    }

    // Eliminar una dirección por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDireccion(@PathVariable Long id) {
        direccionService.deleteDireccion(id);
        return ResponseEntity.noContent().build();
    }
}
