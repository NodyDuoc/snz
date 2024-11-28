package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.GuiaResponse;
import com.snzDigital.SNZDigital.persistence.entity.GuiaEntity;
import com.snzDigital.SNZDigital.service.GuiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/guias")
public class GuiaController {

    @Autowired
    private GuiaService guiaService;

    // Obtener todas las guías
    @GetMapping("/getall")
    public ResponseEntity<List<GuiaEntity>> getAllGuias() {
        List<GuiaEntity> guias = guiaService.getAllGuias();
        return ResponseEntity.ok(guias);
    }

    // Obtener una guía por ID
    @GetMapping("/get/{id}")
    public ResponseEntity<GuiaEntity> getGuiaById(@PathVariable Integer id) {
        return guiaService.getGuiaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear una nueva guía
    @PostMapping("/create")
    public ResponseEntity<GuiaResponse> createGuia(@RequestBody GuiaEntity guia) {
        GuiaEntity createdGuia = guiaService.createGuia(guia);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new GuiaResponse(createdGuia.getGuiaId(), "Guía creada con éxito", true));
    }

    // Actualizar una guía existente
    @PutMapping("/update/{id}")
    public ResponseEntity<GuiaResponse> updateGuia(@PathVariable Integer id, @RequestBody GuiaEntity guia) {
        GuiaEntity updatedGuia = guiaService.updateGuia(id, guia);
        return ResponseEntity.ok(new GuiaResponse(updatedGuia.getGuiaId(), "Guía actualizada con éxito", true));
    }

    // Eliminar una guía por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GuiaResponse> deleteGuia(@PathVariable Integer id) {
        guiaService.deleteGuia(id);
        return ResponseEntity.ok(new GuiaResponse(id, "Guía eliminada con éxito", true));
    }
}
