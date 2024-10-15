package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.DireccionResponse;
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

    @GetMapping("/getall")
    public ResponseEntity<List<DireccionEntity>> getAllDirecciones() {
        List<DireccionEntity> direcciones = direccionService.getAllDirecciones();
        return ResponseEntity.ok(direcciones);
    }


    // Obtener una dirección por ID
    @GetMapping("/get/{id}")
    public ResponseEntity<DireccionResponse> getDireccionById(@PathVariable Long id) {
        Optional<DireccionEntity> direccion = direccionService.getDireccionById(id);
        return direccion.map(d -> ResponseEntity.ok(new DireccionResponse(d.getDirId(), "Dirección encontrada", true)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new DireccionResponse(null, "Dirección no encontrada", false)));
    }

    // Crear una nueva dirección
    @PostMapping("/create")
    public ResponseEntity<DireccionResponse> createDireccion(@RequestBody DireccionEntity direccion) {
        DireccionEntity createdDireccion = direccionService.createDireccion(direccion);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new DireccionResponse(createdDireccion.getDirId(), "Dirección creada con éxito", true));
    }

    // Actualizar una dirección existente
    @PutMapping("/update/{id}")
    public ResponseEntity<DireccionResponse> updateDireccion(@PathVariable Long id, @RequestBody DireccionEntity direccion) {
        DireccionEntity updatedDireccion = direccionService.updateDireccion(id, direccion);
        return ResponseEntity.ok(new DireccionResponse(updatedDireccion.getDirId(), "Dirección actualizada con éxito", true));
    }

    // Eliminar una dirección por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DireccionResponse> deleteDireccion(@PathVariable Long id) {
        direccionService.deleteDireccion(id);
        return ResponseEntity.ok(new DireccionResponse(id, "Dirección eliminada con éxito", true));
    }
}
