package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.persistence.entity.ValoracionEntity;
import com.snzDigital.SNZDigital.service.ValoracionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/valoraciones")
public class ValoracionController {

    @Autowired
    private ValoracionService valoracionService;

    // Obtener todas las valoraciones
    @GetMapping("/getall")
    public ResponseEntity<List<ValoracionEntity>> getAllValoraciones() {
        return ResponseEntity.ok(valoracionService.getAllValoraciones());
    }

    // Obtener valoración por ID
    @GetMapping("/get/{id}")
    public ResponseEntity<ValoracionEntity> getValoracionById(@PathVariable Integer id) {
        return valoracionService.getValoracionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear nueva valoración
    @PostMapping("/create")
    public ResponseEntity<ValoracionEntity> createValoracion(@RequestBody ValoracionEntity valoracion) {
        return ResponseEntity.ok(valoracionService.createValoracion(valoracion));
    }

    // Actualizar valoración existente
    @PutMapping("/update/{id}")
    public ResponseEntity<ValoracionEntity> updateValoracion(@PathVariable Integer id, @RequestBody ValoracionEntity valoracion) {
        return ResponseEntity.ok(valoracionService.updateValoracion(id, valoracion));
    }

    // Eliminar valoración por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteValoracion(@PathVariable Integer id) {
        valoracionService.deleteValoracion(id);
        return ResponseEntity.noContent().build();
    }
    // Obtener valoraciones por ID de producto
    @GetMapping("/producto/{productoId}")
    public ResponseEntity<List<ValoracionEntity>> getValoracionesByProductoId(@PathVariable Long productoId) {
        List<ValoracionEntity> valoraciones = valoracionService.getValoracionesByProductoId(productoId);
        return ResponseEntity.ok(valoraciones);
    }
}
