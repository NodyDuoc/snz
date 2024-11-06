package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.EtiquetaProductoResponse;
import com.snzDigital.SNZDigital.persistence.entity.EtiquetaProductoEntity;
import com.snzDigital.SNZDigital.service.EtiquetaProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/etiqueta_producto")
public class EtiquetaProductoController {

    @Autowired
    private EtiquetaProductoService etiquetaProductoService;

    @GetMapping("/getall")
    public ResponseEntity<List<EtiquetaProductoEntity>> getAllEtiquetaProductos() {
        List<EtiquetaProductoEntity> etiquetaProductoList = etiquetaProductoService.getAllEtiquetaProductos();
        return ResponseEntity.ok(etiquetaProductoList);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<EtiquetaProductoResponse> getEtiquetaProductoById(@PathVariable Integer id) {
        Optional<EtiquetaProductoEntity> etiquetaProducto = etiquetaProductoService.getEtiquetaProductoById(id);
        return etiquetaProducto.map(ep -> ResponseEntity.ok(new EtiquetaProductoResponse(ep.getEtiquetaProductoId(), "EtiquetaProducto encontrado", true)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new EtiquetaProductoResponse(null, "EtiquetaProducto no encontrado", false)));
    }

    @PostMapping("/create")
    public ResponseEntity<EtiquetaProductoResponse> createEtiquetaProducto(@RequestBody EtiquetaProductoEntity etiquetaProducto) {
        EtiquetaProductoEntity createdEtiquetaProducto = etiquetaProductoService.createEtiquetaProducto(etiquetaProducto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new EtiquetaProductoResponse(createdEtiquetaProducto.getEtiquetaProductoId(), "EtiquetaProducto creado con éxito", true));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EtiquetaProductoResponse> updateEtiquetaProducto(@PathVariable Integer id, @RequestBody EtiquetaProductoEntity etiquetaProducto) {
        EtiquetaProductoEntity updatedEtiquetaProducto = etiquetaProductoService.updateEtiquetaProducto(id, etiquetaProducto);
        return ResponseEntity.ok(new EtiquetaProductoResponse(updatedEtiquetaProducto.getEtiquetaProductoId(), "EtiquetaProducto actualizado con éxito", true));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<EtiquetaProductoResponse> deleteEtiquetaProducto(@PathVariable Integer id) {
        etiquetaProductoService.deleteEtiquetaProducto(id);
        return ResponseEntity.ok(new EtiquetaProductoResponse(id, "EtiquetaProducto eliminado con éxito", true));
    }
}
