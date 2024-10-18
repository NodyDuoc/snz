package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.DetalleCarritoResponse;
import com.snzDigital.SNZDigital.persistence.entity.DetalleCarritoEntity;
import com.snzDigital.SNZDigital.service.DetalleCarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/detallecarritos")
public class DetalleCarritoController {

    @Autowired
    private DetalleCarritoService detalleCarritoService;

    @GetMapping("/getall")
    public ResponseEntity<List<DetalleCarritoEntity>> getAllDetallesCarrito() {
        List<DetalleCarritoEntity> detalles = detalleCarritoService.getAllDetallesCarrito();
        return ResponseEntity.ok(detalles);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DetalleCarritoResponse> getDetalleCarritoById(@PathVariable Integer id) {
        Optional<DetalleCarritoEntity> detalle = detalleCarritoService.getDetalleCarritoById(id);
        return detalle.map(d -> ResponseEntity.ok(new DetalleCarritoResponse(d.getIdDetalleCarrito(), "Detalle encontrado", true)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new DetalleCarritoResponse(null, "Detalle no encontrado", false)));
    }

    @PostMapping("/create")
    public ResponseEntity<DetalleCarritoResponse> createDetalleCarrito(@RequestBody DetalleCarritoEntity detalleCarrito) {
        DetalleCarritoEntity createdDetalle = detalleCarritoService.createDetalleCarrito(detalleCarrito);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new DetalleCarritoResponse(createdDetalle.getIdDetalleCarrito(), "Detalle creado con éxito", true));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DetalleCarritoResponse> updateDetalleCarrito(@PathVariable Integer id, @RequestBody DetalleCarritoEntity detalleCarrito) {
        DetalleCarritoEntity updatedDetalle = detalleCarritoService.updateDetalleCarrito(id, detalleCarrito);
        return ResponseEntity.ok(new DetalleCarritoResponse(updatedDetalle.getIdDetalleCarrito(), "Detalle actualizado con éxito", true));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DetalleCarritoResponse> deleteDetalleCarrito(@PathVariable Integer id) {
        detalleCarritoService.deleteDetalleCarrito(id);
        return ResponseEntity.ok(new DetalleCarritoResponse(id, "Detalle eliminado con éxito", true));
    }
}
