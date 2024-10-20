package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.MovimientoKarResponse;
import com.snzDigital.SNZDigital.persistence.entity.MovimientoKarEntity;
import com.snzDigital.SNZDigital.service.MovimientoKarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movimientos")
public class MovimientoKarController {

    @Autowired
    private MovimientoKarService movimientoKarService;

    @GetMapping("/getall")
    public ResponseEntity<List<MovimientoKarEntity>> getAllMovimientos() {
        List<MovimientoKarEntity> movimientos = movimientoKarService.getAllMovimientos();
        return ResponseEntity.ok(movimientos);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<MovimientoKarResponse> getMovimientoById(@PathVariable Integer id) {
        Optional<MovimientoKarEntity> movimiento = movimientoKarService.getMovimientoById(id);
        return movimiento.map(m -> ResponseEntity.ok(new MovimientoKarResponse(m.getMovId(), "Movimiento encontrado", true)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new MovimientoKarResponse(null, "Movimiento no encontrado", false)));
    }

    @PostMapping("/create")
    public ResponseEntity<MovimientoKarResponse> createMovimiento(@RequestBody MovimientoKarEntity movimientoKar) {
        MovimientoKarEntity createdMovimiento = movimientoKarService.createMovimiento(movimientoKar);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new MovimientoKarResponse(createdMovimiento.getMovId(), "Movimiento creado con éxito", true));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MovimientoKarResponse> updateMovimiento(@PathVariable Integer id, @RequestBody MovimientoKarEntity movimientoKar) {
        MovimientoKarEntity updatedMovimiento = movimientoKarService.updateMovimiento(id, movimientoKar);
        return ResponseEntity.ok(new MovimientoKarResponse(updatedMovimiento.getMovId(), "Movimiento actualizado con éxito", true));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MovimientoKarResponse> deleteMovimiento(@PathVariable Integer id) {
        movimientoKarService.deleteMovimiento(id);
        return ResponseEntity.ok(new MovimientoKarResponse(id, "Movimiento eliminado con éxito", true));
    }
}
