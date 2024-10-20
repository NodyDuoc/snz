package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.KardexResponse;
import com.snzDigital.SNZDigital.persistence.entity.KardexEntity;
import com.snzDigital.SNZDigital.service.KardexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/kardex")
public class KardexController {

    @Autowired
    private KardexService kardexService;

    @GetMapping("/getall")
    public ResponseEntity<List<KardexEntity>> getAllKardex() {
        List<KardexEntity> kardexList = kardexService.getAllKardex();
        return ResponseEntity.ok(kardexList);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<KardexResponse> getKardexById(@PathVariable Integer id) {
        Optional<KardexEntity> kardex = kardexService.getKardexById(id);
        return kardex.map(k -> ResponseEntity.ok(new KardexResponse(k.getKardexId(), "Kardex encontrado", true)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new KardexResponse(null, "Kardex no encontrado", false)));
    }

    @PostMapping("/create")
    public ResponseEntity<KardexResponse> createKardex(@RequestBody KardexEntity kardex) {
        KardexEntity createdKardex = kardexService.createKardex(kardex);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new KardexResponse(createdKardex.getKardexId(), "Kardex creado con éxito", true));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<KardexResponse> updateKardex(@PathVariable Integer id, @RequestBody KardexEntity kardex) {
        KardexEntity updatedKardex = kardexService.updateKardex(id, kardex);
        return ResponseEntity.ok(new KardexResponse(updatedKardex.getKardexId(), "Kardex actualizado con éxito", true));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<KardexResponse> deleteKardex(@PathVariable Integer id) {
        kardexService.deleteKardex(id);
        return ResponseEntity.ok(new KardexResponse(id, "Kardex eliminado con éxito", true));
    }
}
