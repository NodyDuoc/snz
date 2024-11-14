package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.EtiquetaResponse;
import com.snzDigital.SNZDigital.persistence.entity.EtiquetaEntity;
import com.snzDigital.SNZDigital.persistence.entity.ValoracionEntity;
import com.snzDigital.SNZDigital.service.EtiquetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/etiquetas")
public class EtiquetaController {

    @Autowired
    private EtiquetaService etiquetaService;

    // Obtener todas las etiquetas
    @GetMapping("/getall")
    public ResponseEntity<List<EtiquetaEntity>> getAllEtiquetas() {
        List<EtiquetaEntity> etiquetas = etiquetaService.getAllEtiquetas();
        return ResponseEntity.ok(etiquetas);
    }

    // Obtener una etiqueta por ID
    @GetMapping("/get/{id}")
    public ResponseEntity<EtiquetaEntity> getEtiquetaById(@PathVariable Integer id) {
        return etiquetaService.getEtiquetaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear una nueva etiqueta
    @PostMapping("/create")
    public ResponseEntity<EtiquetaResponse> createEtiqueta(@RequestBody EtiquetaEntity etiqueta) {
        EtiquetaEntity createdEtiqueta = etiquetaService.createEtiqueta(etiqueta);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new EtiquetaResponse(createdEtiqueta.getEtiquetaId(), "Etiqueta creada con éxito", true));
    }

    // Actualizar una etiqueta existente
    @PutMapping("/update/{id}")
    public ResponseEntity<EtiquetaResponse> updateEtiqueta(@PathVariable Integer id, @RequestBody EtiquetaEntity etiqueta) {
        EtiquetaEntity updatedEtiqueta = etiquetaService.updateEtiqueta(id, etiqueta);
        return ResponseEntity.ok(new EtiquetaResponse(updatedEtiqueta.getEtiquetaId(), "Etiqueta actualizada con éxito", true));
    }

    // Eliminar una etiqueta por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<EtiquetaResponse> deleteEtiqueta(@PathVariable Integer id) {
        etiquetaService.deleteEtiqueta(id);
        return ResponseEntity.ok(new EtiquetaResponse(id, "Etiqueta eliminada con éxito", true));
    }
}
