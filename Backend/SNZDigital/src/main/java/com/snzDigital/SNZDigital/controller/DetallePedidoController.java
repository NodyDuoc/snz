package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.DetallePedidoResponse;
import com.snzDigital.SNZDigital.persistence.entity.DetallePedidoEntity;
import com.snzDigital.SNZDigital.service.DetallePedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalle-pedidos")
public class DetallePedidoController {

    @Autowired
    private DetallePedidoService detallePedidoService;

    @GetMapping("/getall")
    public ResponseEntity<List<DetallePedidoResponse>> getAll() {
        List<DetallePedidoResponse> response = detallePedidoService.getAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DetallePedidoResponse> getById(@PathVariable Integer id) {
        DetallePedidoResponse response = detallePedidoService.getById(id);
        return response != null ? new ResponseEntity<>(response, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/create")
    public ResponseEntity<DetallePedidoResponse> create(@RequestBody DetallePedidoEntity detallePedido) {
        DetallePedidoResponse response = detallePedidoService.create(detallePedido);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DetallePedidoResponse> update(@PathVariable Integer id, @RequestBody DetallePedidoEntity detallePedido) {
        DetallePedidoResponse response = detallePedidoService.update(id, detallePedido);
        return response != null ? new ResponseEntity<>(response, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        detallePedidoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
